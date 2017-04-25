import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import login from './login'
import message from './message'
import profile from './profile'
const rootReducer = combineReducers({
   login,message,profile
});

export default rootReducer;