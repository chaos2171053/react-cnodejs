// import { LOG_IN, SIGN_OUT, RENDER_SIGNIN, RENDER_SIGNUP,ROUTER_LOACTION_CHANGE} from '../constants/AppStatusActionsTypes'


const initialState = localStorage.statusState ? JSON.parse(localStorage.statusState) : {
    isLogin: false,
    isRenderSignin: false,
    isRenderSignup: true,
    username:'',
    questionnarire:{
        questionnarireTitle:' ',
        deadline:'',
        status:'',
        questions:[]
    }
}

// console.log("获取：" + localStorage.statusState)
const status = (state = initialState, action) => {
    // console.log(action)
// debugger
    switch (action.type) {
        default:
            return state
    }
}

export default status