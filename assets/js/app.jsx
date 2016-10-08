import 'react-fastclick';

import React from 'react';
import { render } from 'react-dom';

import { browserHistory, Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider, connect } from 'react-redux';
import store from './Redux/Store';

import { close as closeMenu } from './Menu/Actions';

import App from './App/Container';
import LoginForm from './Homepage/Popover/LoginForm/Container';
import SignupForm from './Homepage/Popover/SignupForm/Container';

import '../styles/Base/index.scss';

const history = syncHistoryWithStore(browserHistory, store);

document.addEventListener('DOMContentLoaded', () => {
    render(
        <Provider store={store}>
            <Router history={history}>
                <Route onChange={() => store.dispatch(closeMenu())} path="/" component={App}>
                    <Route path="login" component={LoginForm} />
                    <Route path="signup" component={SignupForm} />
                </Route>
            </Router>
        </Provider>,
        document.getElementById('root')
    );
});
