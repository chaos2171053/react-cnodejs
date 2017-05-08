import React, { Component } from 'react'
import Pull from '../components/common/react-pullrefresh'
import { fetchTopics } from '../actions/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions/actions'
import Snackbar from '../components/common/Snackbar'
import Header from '../components/Homepage/Header/Header'
import Lists from '../components/Homepage/Lists/Lists'
import CircleLoading from '../components/common/CircleLoading'
import getSize from '../utils/getSize'
import FloatingActionButton from '../components/Homepage/FloatingActionButton/FloatingActionButton'
import Drawer from '../components/Homepage/Drawer/Drawer'

const mapStateToProps = (state) => {
    const { homePage, login, profile, message, article } = state.rootReducer
    const { selectedTab, tabData } = homePage
    const unreadMessageCount = message.hasNotReadMessage.length
    const { isFetching, page, scrollT, topics } = tabData[selectedTab] || { isFetching: false, page: 0, scrollT: 0, topics: [] }
    // console.log(homePage)
    return { isFetching, page, scrollT, topics, selectedTab, tabData, login, profile, article, unreadMessageCount }
}

const mapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(Actions, dispatch) }
}

@connect(mapStateToProps, mapDispatchToProps)

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fadeIn: true,
            openDrawer: false,
            openSnackbar: false,
            isFreshing: false,
            fixedTop: 0,
            scrollT: 0
        }
    }
    tabs = [
        {
            title: '全部',
            filter: 'all',
        },
        {
            title: '精华',
            filter: 'good',
        },
        {
            title: '分享',
            filter: 'share',
        },
        {
            title: '问答',
            filter: 'ask',
        },
        {
            title: '招聘',
            filter: 'job',
        }
    ]

    onRefresh = (next) => {
        if (!this.state.isFreshing) {
            this.setState({ isFreshing: true })
            this.fresh()
            setTimeout(_ => {
                next()
                this.openSnackbar()
                this.setState({
                    isFreshing: false
                })
            }, 3000)
        }
    }

    fresh = () => {
        const { fetchTopics, fetchMessage } = this.props.actions;
        const { selectedTab, login } = this.props;
        fetchTopics(selectedTab, 1)
        fetchMessage(login.accessToken)
    }

    openSnackbar = () => {
        this.setState({
            openSnackbar: true
        })
        setTimeout(() => {
            this.setState({
                openSnackbar: false
            })
        }, 2500)
    }

    handleClick = tab => {
        let { scrollT } = getSize()
        const { tabData, selectedTab } = this.props;
        const { recordScrollT, selectTab } = this.props.actions
        recordScrollT(selectedTab, scrollT)
        selectTab(tab)

        const ua = navigator.userAgent
        if (!tabData[tab] && ua.indexOf('Mobile') === -1) {
            if (scrollT >= 64) {
                recordScrollT(tab, 64)
                this.setState({
                    scrollT: 64
                })
            } else {
                recordScrollT(tab, scrollT)
                this.setState({
                    scrollT: scrollT
                })
            }
        }

    }

    loadMore = () => {
        const { selectedTab, page, isFetching } = this.props
        const { fetchTopics } = this.props.actions
        let ipage = page
        if (!isFetching) {// 防止滚动过快，服务端没来得及响应造成多次请求
            fetchTopics(selectedTab, ++ipage)
        }

    }
    toggleDrawer = () => {
        this.setState({
            openDrawer: !this.state.openDrawer
        })
    }
    //在DidMount生命周期获取文章列表，这样可以先渲染不需要网络请求的组件
    componentDidMount() {
        const { selectedTab, page, scrollT} = this.props;
        const {fetchTopics} = this.props.actions
        if (page === 0) {
            fetchTopics(selectedTab);
        }
        if (scrollT) {
            window.scrollTo(0, scrollT);
        }
        let lastScrollY = this.lastScrollY
        window.onscroll = () => {
            let { windowH, contentH, scrollT } = getSize()
            if (windowH + scrollT + 100 > contentH) {
                this.loadMore()
            }


            // 由于下面的操作比较费cpu,所以进行判断是否为手机端
            const ua = navigator.userAgent;
            if (ua.indexOf('Mobile') === -1) {
                if (!lastScrollY || !scrollT) {
                    lastScrollY = scrollT
                }
                let diff = scrollT - lastScrollY
                if (diff >= 0) {
                    if (scrollT > 64 && this.state.fixedTop !== 64) {
                        this.setState({
                            fixedTop: 64
                        })
                    }
                    if (scrollT <= 64) {
                        this.setState({
                            fixedTop: scrollT
                        })
                    }
                } else {
                    this.setState({
                        scrollT: 0
                    })
                    if (scrollT > 64 && this.state.fixedTop !== 0) {
                        this.setState({
                            fixedTop: 0
                        })
                    }
                }
                lastScrollY = scrollT
            }
        }
        // console.log('componentDidMount',getSize().scrollT)
    }
    componentDidUpdate() {
        let { windowH, contentH, scrollT } = getSize();
        const { topics } = this.props
        if (scrollT === 0 && this.state.scrollT > 0) {
            window.scrollTo(0, this.state.scrollT)
        }

        // 判断内容加载后，内容的高度是否填满屏幕，若网页太高，加载一次内容的高度不能填满整个网页，则继续请求数据
        if (topics.length > 0 && windowH + 200 > contentH) {
            this.loadMore();
        }

    }
    componentWillReceiveProps(newProps) {
        const { topics, isFetching, selectedTab, scrollT, } = newProps;
        const { fetchTopics } = this.props.actions
        // 去除刷新时记住的滚动条位置
        if (topics.length === 0 && this.props.scrollT === 0) {
            window.scrollTo(0, 0)
        }
        if (!isFetching && topics.length === 0) {
            fetchTopics(selectedTab);
        }
        if (selectedTab !== this.props.selectedTab) {
            if (scrollT) {
                window.scrollTo(0, scrollT)
            }
        }
    }

    componentWillUnmount() {
        let { scrollT } = getSize()
        const { selectedTab } = this.props;
        const { recordScrollT } = this.props.actions
        recordScrollT(selectedTab, scrollT);
        // 必须解绑事件，否则当组件再次被加载时，该事件会监听两个组件
        window.onscroll = null;
    }


    render() {
        const { selectedTab, isFetching, page, topics, article, currentRouter, login, profile, unreadMessageCount, tabData } = this.props;
        const { fetchArticle, logout } = this.props.actions
        // const {pathname} = this.props.location
        // console.log(this.props)
        return (
            <div className={this.state.fadeIn ? 'fade-in' : ''}>
                <Pull zIndex={10000} size={60} max={200} color='#E91E63' onRefresh={this.onRefresh} />
                <Header filter={selectedTab} onClick={this.handleClick} toggleDrawer={this.toggleDrawer}
                    fixedTop={this.state.fixedTop} unreadMessageCount={unreadMessageCount} tabs={this.tabs}>
                    {this.tabs.map((tab, index) =>
                        <div key={index}>
                            {((isFetching && page === 0) || (tab.filter !== selectedTab && !tabData[tab.filter])) && <CircleLoading />}
                            {tab.filter === selectedTab && <div style={{ opacity: (!isFetching || page >= 1) ? 1 : 0 }}>
                                <Lists topics={topics} fetchArticle={fetchArticle} article={article} isFetching={isFetching} />
                            </div>}
                        </div>
                    )}
                </Header>
                {!isFetching && <FloatingActionButton />}
                <Drawer toggleDrawer={this.toggleDrawer} openDrawer={this.state.openDrawer}
                    {...({ login, profile, logout }) } />
                <Snackbar isOpened={this.state.openSnackbar} message='刷新成功' />
            </div>
        )
    }
}
export default HomePage