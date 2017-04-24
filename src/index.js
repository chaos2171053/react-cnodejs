import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { ConnectedRouter, routerReducer, routerMiddleware, } from 'react-router-redux'
import createHistory from 'history/createHashHistory'
import injectTapEventPlugin from 'react-tap-event-plugin';
import rootReducer from './reducers/index'
import './styles/index.css';
// import routes from './routes/routes';
import { Switch } from 'react-router-dom'
import { Route } from 'react-router'
import App from './containers/App'
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
        applyMiddleware(middleware)
    )
} else {
    store = createStore(
        combineReducers({
            rootReducer,
            router: routerReducer
        }),
        compose(applyMiddleware(middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    )
}



ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" component={App}/>
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app'));


