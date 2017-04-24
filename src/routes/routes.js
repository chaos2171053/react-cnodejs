import React, { Component } from 'react';
import { Route } from 'react-router'
import { Switch } from 'react-router-dom'
import App from '../containers/App';
const routes = (
        <Route path='/' component={App}>
        </Route>
);
export default routes;