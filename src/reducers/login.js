import {
    LOGIN_SUCCESS, LOGOUT, LOGIN_FAILED,
} from '../constants/actionTypes'

const login = (state = { succed: false }, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                succed: true,
                loginName: action.loginName,
                loginId: action.loginId,
                accessToken: action.accessToken
            }
        case LOGIN_FAILED:
            return {
                ...state,
                succeed: false,
                failedMessage: action.failedMessage
            }
        case LOGOUT:
            return {
                succeed: flase
            }
        default:
            return state

    }
}

export default login