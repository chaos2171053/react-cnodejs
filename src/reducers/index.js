import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import login from './login'


const rootReducer = combineReducers({
   login
});

export default rootReducer;