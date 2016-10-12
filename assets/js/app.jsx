import 'babel-polyfill';
import 'react-fastclick';

import React from 'react';
import { render } from 'react-dom';

import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import store from './Redux/Store';

import { close as closeMenu } from './Menu/Actions';

import App from './App/Container';

import Homepage from './Pages/Homepage.jsx';
import Tour from './Pages/Tour.jsx';

import Dashboard from './Dashboard/Container';
import MainPanel from './Dashboard/MainPanel/Component';
import LogPanel from './Dashboard/LogPanel/Component';

import '../styles/Base/index.scss';

const history = syncHistoryWithStore(browserHistory, store);

const requireAuth = (nextState, replace) => {
    if (!store.getState().user.isLoggedIn) {
        replace('/');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    render(
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={App} onChange={() => store.dispatch(closeMenu())}>
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
