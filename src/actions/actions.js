import fetch from 'isomorphic-fetch'
import {
    LOGIN_SUCCESS, LOGOUT, LOGIN_FAILED,
    FETCH_MESSAGE, MARK_ALL_MESSAGES, REQUEST_PROFILE, GET_COLLECTED_TOPICS,
    RECEIVE_PROFILE, REQUEST_TOPICS, RECEIVE_TOPICS, REQUEST_ARTICLE, RECEIVE_ARTICLE,
    CHANGE_CURRENT_TOPICID, SWITCH_SUPPORT, FETCH_COMMENT,RECORD_SCROLLT,
    SELECT_TAB,PUBLISH_TOPIC
} from '../constants/actionTypes'

//Login
export const fetchAccess = accessToken => {

    return dispatch => {
        fetch('https://cnodejs.org/api/v1/accesstoken', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `accesstoken=${accessToken}`
        })
            .then(response => response.json())
            .then(json => {
                if (json.success) {
                    dispatch(loginSucceed(json.loginname, json.id, accessToken))
                } else {
                    dispatch(loginFailed(json.error_msg));
                }
            })
    }
}


const loginSucceed = (loginName, loginId, accessToken) => ({
    type: LOGIN_SUCCESS,
    loginName,
    loginId,
    accessToken
})

const loginFailed = failedMessage => ({
    type: LOGIN_FAILED,
    failedMessage
})

export const logout = () => ({
    type: LOGOUT
})

//message
export const fetchMessage = (accessToken) => {
    return dispatch => {
        fetch(`https://cnodejs.org/api/v1/messages?accesstoken=${accessToken}`)
            .then(response => response.json())
            .then(json => dispatch({
                type: FETCH_MESSAGE,
                hasReadMessage: json.data.has_read_messages,
                hasNotReadMessage: json.data.hasnot_read_messages
            }))
    }
}

export const markAllMessages = (accessToken) => {
    return dispatch => {
        fetch(`https://cnodejs.org/api/v1/message/mark_all`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `accesstoken=${accessToken}`
        })
            .then(response => response.json())
            .then(json => dispatch({
                type: MARK_ALL_MESSAGES,
                isMarked: json.success
            }))
    }
}

//profile
const requestProfile = loginName => ({
    type: REQUEST_PROFILE,
    loginName
})
const receiveProfile = (loginName, profile) => ({
    type: RECEIVE_PROFILE,
    loginName,
    profile
})
const getCollectedTopics = (loginName) => {
    return dispatch => {
        fetch(`https://cnodejs.org/api/v1/topic_collect/${loginName}`)
            .then(response => response.json())
            .then(json => dispatch({
                type: GET_COLLECTED_TOPICS,
                success: json.success,
                data: json.data
            }))
    }
}
export const fetchProfile = (loginName) => {
    return dispatch => {
        dispatch(requestProfile(loginName))
        dispatch(getCollectedTopics(loginName))
        fetch(`https://cnodejs.org/api/v1/user/${loginName}`)
            .then(response => response.json())
            .then(json => {
                dispatch(receiveProfile(loginName, json.data))})
    }
}

// HomePage
const requestTopics = tab => ({
    type: REQUEST_TOPICS,
    tab,
})
export const selectTab =tab => ({
    type:SELECT_TAB,
    tab
})
export const recordScrollT = (tab,scrollT) => (
    {
        type:RECORD_SCROLLT,
        tab,
        scrollT
    }
)

const receiveTopics = (tab, topics, page, limit) => ({
    type: RECEIVE_TOPICS,
    tab,
    topics,
    page,
    limit
})
export const fetchTopics = (tab, page = 1, limit = 20) => {
    return dispatch => {
        dispatch(requestTopics(tab))
        fetch(`https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}&limit=${limit}`)
            .then(response => response.json())
            .then(json => {
                // console.log(json.data)
                dispatch(receiveTopics(tab, json.data, page, limit))
            })
    }
}

// Article
const requestArticle = topicId => ({
    type: REQUEST_ARTICLE,
    topicId
})

const receiveArticle = (topicId, article) => ({
    type: RECEIVE_ARTICLE,
    topicId,
    article
})

const changeCurrentTopicId = topicId => ({
    type: CHANGE_CURRENT_TOPICID,
    topicId
})

export const fetchArticle = (topicId, request = true) => {
    return dispatch => {
        if (request) {
            dispatch(requestArticle(topicId))
            fetch(`https://cnodejs.org/api/v1/topic/${topicId}`)
                .then(response => response.json())
                .then(json => dispatch(receiveArticle(topicId, data)))
        } else {
            dispatch(changeCurrentTopicId(topicId))
        }
    }
}

export const recordArticleScrollT = (topicId, scrollT) => ({
    type: RECORD_ARICILCE_SCROLLT,
    topciId,
    scrollT
})


export const switchSupport = (accessToken, replyId, index) => {
    return dispatch => {
        fetch(`https://cnodejs.org/api/v1/reply/${replyId}/ups`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `accesstoken=${accessToken}`
        })
            .then(response => response.json())
            .then(json => dispatch({
                type: SWITCH_SUPPORT,
                replyId,
                index,
                success: json.success,
                action: json.action
            }))
    }
}

export const fetchComment = (accessToken, topicId, content, replyId) => {
    return dispatch => {
        const postConent = replyId ? `accesstoken=${accessToken}&content=${content}&replyId=${replyId}` : `accesstoken=${accessToken}&content=${content}`
        fetch(`https://cnodejs.org/api/v1/topic/${topicId}/replies`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: postConent
        })
            .then(response => response.json())
            .then(json => dispatch({
                type: FETCH_COMMENT,
                success: json.success,
                replyId: json.reply_id
            }))
    }
}

// publishTopic

export const fetchPublishTopic = (accessToken,tab,title,content) => {
    return dispatch =>{
        const postContent = `accesstoken=${accessToken}&tab=${tab}&content=${content}&title=${title}`
        fetch(`https://cnodejs.org/api/v1/topics`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: postConent
        })
        .then(response => response.json())
        .then(json => dispatch({
            type:PUBLISH_TOPIC,
            success:json.success,
            topicId:json.topic_id
        }))
    }
}