import React, { Component } from 'react'
import Header from '../components/common/Header/Header'
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
import Form from '../components/PublishTopic/Form/Form'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => {
    const { login,publishTopic } = state.rootReducer
    return { login, publishTopic}
}

const mapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(Actions, dispatch) }
}

@connect(mapStateToProps, mapDispatchToProps)
class PublishTopic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            isFetching: false,
            titleErr: false,
            contentErr: false
        }
    }
    componentWillReceiveProps(newProps) {
        const { publishTopic} = newProps;
        const {fetchArticle} = newProps.actions
        if (!this.props.publishTopic.topicId || this.props.publishTopic.topicId !== publishTopic.topicId) {
            this.setState({ isFetching: false })
            fetchArticle(publishTopic.topicId)
        }
    }
    showDialog() {
        this.setState({
            isOpen: true,
            isFetching: true
        })
    }
    close = () => {
        this.setState({
            isOpen: false
        })
    }

    ifTitleErr(boolean) {
        this.setState({
            titleErr: boolean
        })
    }
    ifContentErr(boolean) {
        this.setState({
            contentErr: boolean
        })
    }
    render() {
        const { login,publishTopic } = this.props
        const { fetchPublishTopic } = this.props.actions
        return (
            <div>
                <Header title='发布新话题' />
                <div style={{ marginTop: 100 }}>
                    {login.succeed && <Form
                        ifTitleErr={::this.ifTitleErr}
                        ifContentErr = {::this.ifContentErr}
                        showDialog = {::this.showDialog}
                        login = {login}
                    fetchPublishTopic = {fetchPublishTopic}
                    titleErr = {this.state.titleErr}
                    contentErr ={this.state.contentErr}
                    />}
                </div>
            </div>

        )
    }
}

export default PublishTopic