import React, { Component } from 'react'
import Pull from '../components/common/react-pullrefresh'
import { fetchTopics } from '../actions/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions/actions'
import {Snackbar} from '../components/index.js'

const mapStateToProps = (state) => {
    const { homePage, login, profile, } = state.rootReducer
    const { selectedTab, tabData } = homePage
    const { isFetching, page, scrollT, topics } = tabData[selectedTab] || { isFetching: false, page: 0, scrollT: 0, topics: [] }
    return { isFetching, page, scrollT, topics, selectedTab, tabData, login, profile, }
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
            isFreshing: false,
            openSnackbar: false,
        }
    }

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
        return (
            <div className={this.state.fadeIn ? 'fade-in' : ''}>
                <Pull zIndex={10000} size={60} max={200} color='#E91E63' onRefresh={this.onRefresh} />
                 <Snackbar isOpened={this.state.openSnackbar} message='刷新成功'/>
            </div>
        )
    }
}
export default HomePage