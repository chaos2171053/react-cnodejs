import 'core-js/fn/object/assign';
import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { ConnectedRouter, routerReducer, routerMiddleware, } from 'react-router-redux'
import createHistory from 'history/createHashHistory'
import injectTapEventPlugin from 'react-tap-event-plugin';
import rootReducer from './reducers/index'
import './styles/index.css';
import { Switch } from 'react-router-dom'
import { Route } from 'react-router'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import { App, HomePage,PublishTopic,Login,Profile,Message,Article} from './containers/index'

injectTapEventPlugin();

const history = createHistory()
const middleware = routerMiddleware(history)

let store
if (!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)) {
    store = createStore(
        combineReducers({
            rootReducer,
            router: routerReducer
        }),
        applyMiddleware(middleware, thunk, createLogger())
    )
} else {
    store = createStore(
        combineReducers({
            rootReducer,
            router: routerReducer
        }),
        compose(applyMiddleware(middleware, thunk, createLogger()), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    )
}



// ReactDOM.render(
//     <Provider store={store}>
//         <ConnectedRouter history={history}>
//             <Switch>
//                 <Route exact path="/" component={App}/>
//             </Switch>
//         </ConnectedRouter>
//     </Provider>,
//     document.getElementById('app'));

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path='/publishTopic' component={PublishTopic}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/profile' component={Profile}/>
                    <Route exact path='/message' component={Message}/>
                    <Route path='/topic/:id' component={Article}/>
                </Switch>
            </App>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app'));



