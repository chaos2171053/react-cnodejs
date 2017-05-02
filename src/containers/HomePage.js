import React, { Component } from 'react'
import Pull from '../components/common/react-pullrefresh'
import { fetchTopics } from '../actions/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions/actions'
import Snackbar from '../components/common/Snackbar'
import Header from '../components/Homepage/Header/Header'
import Lists from '../components/Homepage/Lists/Lists'

const mapStateToProps = (state) => {
    const { homePage, login, profile, message,article} = state.rootReducer
    const { selectedTab, tabData } = homePage
    const unreadMessageCount = message.hasNotReadMessage.length
    const { isFetching, page, scrollT, topics } = tabData[selectedTab] || { isFetching: false, page: 0, scrollT: 0, topics: [] }
    return { isFetching, page, scrollT, topics, selectedTab, tabData, login, profile,article,unreadMessageCount }
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
                }, 3000)
            })
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
    render() {
         const {selectedTab,isFetching,page,topics,dispatch,article,currentRouter,login,profile,unreadMessageCount,tabData} = this.props;
         const {fetchArticle} = this.props.actions
        //  debugger
        return (
            <div className={this.state.fadeIn ? 'fade-in' : ''}>
                <Pull zIndex={10000} size={60} max={200} color='#E91E63' onRefresh={this.onRefresh} />
                <Snackbar isOpened={this.state.openSnackbar} message='刷新成功' />
                <Header filter={selectedTab} onClick={this.handleClick} toggleDrawer={this.toggleDrawer}
                    fixedTop={this.state.fixedTop} unreadMessageCount={unreadMessageCount} tabs={this.tabs}>
                    {this.tabs.map((tab, index) =>
                        <div key={index}>
                            {((isFetching && page === 0) || (tab.filter !== selectedTab && !tabData[tab.filter])) && <CircleLoading />}
                            {tab.filter === selectedTab && <div style={{ opacity: (!isFetching || page >= 1) ? 1 : 0 }}>
                                <Lists topics={topics} fetchArticle={fetchArticle} dispatch={dispatch} article={article} isFetching={isFetching} />
                            </div>}
                        </div>
                    )}
                </Header>
            </div>
        )
    }
}
export default HomePage