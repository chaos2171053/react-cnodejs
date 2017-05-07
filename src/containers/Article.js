import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions/actions'
import Header from '../components/common/Header/Header'
import CircleLoading from '../components/common/CircleLoading'
import Content from '../components/Article/Content/Content'
import Reply from '../components/Article/Reply/Reply'
import getSize from '../utils/getSize'

const mapStateToProps = state => {
    const { login, profile } = state.rootReducer
    const { currentTopicId, switchSupportInfo, isCommented } = state.rootReducer.article;
    const { collectedTopics } = profile
    const isFetching = state.rootReducer.article[currentTopicId] ? state.rootReducer.article[currentTopicId].isFetching : false;
    const scrollT = state.rootReducer.article[currentTopicId] ? state.rootReducer.article[currentTopicId].scrollT : '0';
    const article = state.rootReducer.article[currentTopicId] && state.rootReducer.article[currentTopicId].article ? state.rootReducer.article[currentTopicId].article : {};
    return { isFetching, scrollT, article, currentTopicId, login, switchSupportInfo, collectedTopics, profile, isCommented }
}
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})
@connect(mapStateToProps, mapDispatchToProps)

class Article extends Component {
    constructor() {
        super();
        this.state = {
            fadeIn: true
        }
    }
    componentWillMount() {
        const { scrollT, dispatch, article, isFetching } = this.props
        const { fetchArticle } = this.props.actions
        if (scrollT) {
            window.scrollTo(0, scrollT)
        }
        if (!article.author && !isFetching) {
            const topicId = window.location.href.split('topic/')[1].split('?_')[0]
            fetchArticle(topicId)
        }
    }
    componentWillReceiveProps(newProps) {
        const { scrollT } = newProps;
        window.scrollTo(0, scrollT)
    }

    componentWillUnmount() {
        this.setState({
            fadeIn: false
        })
        let { scrollT } = getSize()
        const { currentTopicId, dispatch, profile, login } = this.props;
        const { recordArticleScrollT } = this.props.actions
        recordArticleScrollT(currentTopicId, scrollT);
        if (!window.sessionStorage.masterProfile && login.loginName === profile.loginname) {
            window.sessionStorage.masterProfile = JSON.stringify(profile)
        }
    }

    render() {
        let { isFetching, article, currentTopicId, login, switchSupportInfo, isCommented, collectedTopics, profile } = this.props;
        const { switchCollected, fetchProfile,switchSupport,fetchComment,recordArticleScrollT} = this.props.actions
        return (
            <div className={this.state.fadeIn ? 'fade-in' : ''}>
                <Header isFetching={isFetching} title='详情' showBack={true} />
                {Object.keys(article).length === 0 && <CircleLoading />}
                {Object.keys(article).length !== 0 &&
                    <div>
                        <Content {...({ switchCollected, article, fetchProfile, login, collectedTopics, profile }) } />
                        <Reply replies={article.replies}
                            {...({ fetchComment,switchSupport,recordArticleScrollT,login, switchSupportInfo, fetchProfile,currentTopicId, profile, isCommented }) } />
                    </div>
                }
            </div>
        )
    }
}

export default Article