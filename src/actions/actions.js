import fetch from 'isomorphic-fetch'
import {
    LOGIN_SUCCESS, LOGOUT, LOGIN_FAILED,
    FETCH_MESSAGE, MARK_ALL_MESSAGES, REQUEST_PROFILE, GET_COLLECTED_TOPICS,
    RECEIVE_PROFILE,REQUEST_TOPICS,RECEIVE_TOPICS
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
            .then(json => dispatch(receiveProfile(loginName, json.data)))
    }
}

// HomePage
const requestTopics = tab =>({
    type:REQUEST_TOPICS,
    tab
})

const receiveTopics = (tab,topics,page,limit) =>({
    types:RECEIVE_TOPICS,
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
            .then(json => dispatch(receiveTopics(tab, json.data, page, limit)))
    }
}