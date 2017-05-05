import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import login from './login'
import message from './message'
import profile from './profile'
import homePage from './homePage'
import article from './article'
import publishTopic from './publishTopic'
const rootReducer = combineReducers({
   login,message,profile,homePage,article,publishTopic
});

export default rootReducer;