import 'babel-polyfill';
import 'react-fastclick';

import React from 'react';
import { render } from 'react-dom';

import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import store from './Redux/Store';

import { GETer } from './serverIO/ajaxMethods';
import * as API from './serverIO/dataHandling';

import * as UserActions from './User/Actions';
import { close as closeMenu } from './Menu/Actions';
import { close as closePopover } from './Pages/Popover/Actions';

import App from './App/Container';

import Homepage from './Pages/Homepage.jsx';
import Tour from './Pages/Tour.jsx';

import Dashboard from './Dashboard/Container';
import MainPanel from './Dashboard/MainPanel/Component';
import LogPanel from './Dashboard/LogPanel/Component';

import '../styles/Base/index.scss';

const history = syncHistoryWithStore(browserHistory, store);

const handleRouteChange = () => {
    store.dispatch(closeMenu());
    store.dispatch(closePopover());
};

const checkAuth = (nextState, replace, callback) => {
    // If the server fails to answer within 2 seconds, we render
    // the app anyway, using the state from localStorage
    const requestTimeout = setTimeout(() => {
        callback();
    }, 2000);
    API.isLoggedIn(GETer, (err, res) => {
        if (err || !res) return callback();

        store.dispatch(res.isLoggedIn ? UserActions.login() : UserActions.logout());
        clearTimeout(requestTimeout);
        return callback();
    });
};

const requireAuth = (nextState, replace) => {
    if (!store.getState().user.isLoggedIn) {
        replace('/');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    render(
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={App} onEnter={checkAuth} onChange={handleRouteChange}>
                    <IndexRoute component={Homepage} />
                    <Route path="tour" component={Tour} />
                    <Route path="app" component={Dashboard} onEnter={requireAuth}>
                        <IndexRoute component={MainPanel} />
                        <Route path="log" component={LogPanel} />
                    </Route>
                </Route>
            </Router>
        </Provider>,
        document.getElementById('root')
    );
});
