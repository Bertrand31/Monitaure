import 'babel-polyfill';
import 'isomorphic-fetch';
import 'fastclick';

import React from 'react';
import ReactDOM from 'react-dom';

import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import store from './Redux/Store';

import Homepage from './Homepage/Component';
import Dashboard from './Dashboard/Component';

import Popover from './Homepage/Popover/Component';
import LoginForm from './Homepage/Popover/LoginForm/Container';
import SignupForm from './Homepage/Popover/SignupForm/Container';
import Popins from './Popins/Container';

const Home = ({ children }) => (
    <div className="react-container">
        <Popins />
        <Popover form={children} />
        <Homepage />
    </div>
);

const App = ({ children }) => (
    <div className="react-container">
        <Popins />
        {children}
    </div>
);

const history = syncHistoryWithStore(browserHistory, store);

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(

        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={Home}>
                    <Route path="login" component={LoginForm} />
                    <Route path="signup" component={SignupForm} />
                </Route>
                <Route path="/app" component={App}>
                    <IndexRoute component={Dashboard} />
                </Route>
                <App />
            </Router>
        </Provider>,

        document.getElementById('root')
    );
});

// Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' });
}

