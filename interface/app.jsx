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

import Homepage from './Pages/Homepage';
import Tour from './Pages/Tour';
import AccountConfirmation from './Pages/AccountConfirmation/Container';

import Dashboard from './Dashboard/Container';
import MainPanel from './Dashboard/MainPanel/Component';
import ReportsPanel from './Dashboard/ReportsPanel/Component';
import LogPanel from './Dashboard/LogPanel/Component';

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
    API.getUserData(GETer, (err, user) => {
        if (err || !user) return callback();

        if (typeof heap !== 'undefined') heap.identify(user.username);

        store.dispatch(UserActions.login(user));
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
                        <Route path="reports" component={ReportsPanel} />
                        <Route path="log" component={LogPanel} />
                    </Route>
                    <Route path="account/confirm/:confirmationToken" component={AccountConfirmation} />
                </Route>
            </Router>
        </Provider>,
        document.getElementById('root')
    );
});
