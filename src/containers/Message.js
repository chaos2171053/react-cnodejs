import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions/actions'
import Header from '../components/common/Header/Header'
import Content from '../components/Message/Content/Content'
import LinkToLogin from '../components/common/LinkToLogin/LinkToLogin'

const mapStateToProps = (state) => {
    const { login, message, article } = state.rootReducer;
    return { login, message, article }

}

const mapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(Actions, dispatch) }
}

@connect(mapStateToProps, mapDispatchToProps)
class Message extends Component {
    componentDidMount() {
        const { login, message } = this.props
        const {fetchMessage} = this.props.actions
        if (login.accessToken && message.hasReadMessage.length === 0) {
            fetchMessage(login.accessToken)
        }
    }
    render() {
        const { message, article, login } = this.props;
        const { fetchArticle,markAllMessages} = this.props.actions
        return (
            <div>
                <div>
                    <Header title='消息' />
                    <div style={{ marginTop: 64 }}>
                        {login.succeed && <Content {...message} {...({markAllMessages, fetchArticle, article, login }) } />}
                        {!login.succeed && <LinkToLogin />}
                    </div>
                </div>
            </div>
        )
    }
}

export default Message