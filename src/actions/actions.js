import fetch from 'isomorphic-fetch'
import {
    LOGIN_SUCCESS,LOGOUT,LOGIN_FAILED,
} from '../constants/actionTypes'

//Login
export const fetchAccess = accessToken => {
    return dispatch => {
        fetch('https://cnodejs.org/api/v1/accesstoken',{
            method:'POST',
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body:`accesstoken=${accessToken}`
        })
        .then(response => response.json())
        .then(json =>{
            if(json.success){
                
                dispatch(loginSucceed(json.loginname,json.id,accessToken))
            }else{
                dispatch(loginFailed(json.error_msg));
            }
        })
    }
}


const loginSucceed = (loginName,loginId,accessToken)=>({
    type:LOGIN_SUCCESS,
    loginName,
    loginId,
    accessToken
})

const loginFailed = failedMessage => ({
    type:LOGIN_FAILED,
    failedMessage
})

export const logout = () => ({
  type:LOGOUT
})