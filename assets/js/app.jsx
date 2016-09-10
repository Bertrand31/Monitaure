import 'babel-polyfill';
import 'isomorphic-fetch';
import 'fastclick';

import React from 'react';
import ReactDOM from 'react-dom';

import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider, connect } from 'react-redux';
import store from './Redux/Store';

import Homepage from './Homepage/Component';
import Dashboard from './Dashboard/Component';

import Popover from './Homepage/Popover/Component';
import LoginForm from './Homepage/Popover/LoginForm/Container';
import SignupForm from './Homepage/Popover/SignupForm/Container';
import Popins from './Popins/Container';

const Root = ({ isLoggedIn, children }) => {
    if (isLoggedIn) {
        // Resetting to HP when refrshing the app
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js', { scope: '/' });
        }
        return (
            <div className="react-container">
                <Popins />
                <Dashboard />
            </div>
        );
    }

    return (
        <div className="react-container">
            <Popins />
            <Popover form={children} />
            <Homepage />
        </div>
    );
};

const mapStateToProps = state => ({ isLoggedIn: state.user.isLoggedIn });
const App = connect(mapStateToProps)(Root);

const history = syncHistoryWithStore(browserHistory, store);

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(

        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={App}>
                    <Route path="login" component={LoginForm} />
                    <Route path="signup" component={SignupForm} />
                </Route>
            </Router>
        </Provider>,

        document.getElementById('root')
    );
});
