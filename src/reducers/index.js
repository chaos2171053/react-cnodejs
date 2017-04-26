import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import login from './login'
import message from './message'
import profile from './profile'
import homePage from './homePage'
const rootReducer = combineReducers({
   login,message,profile,homePage
});

export default rootReducer;