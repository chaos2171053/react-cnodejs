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
                <div>666</div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app'));

