import 'react-fastclick';

import React from 'react';
import { render } from 'react-dom';

import { browserHistory, Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider, connect } from 'react-redux';
import store from './Redux/Store';

import App from './App/Container';
import LoginForm from './Homepage/Popover/LoginForm/Container';
import SignupForm from './Homepage/Popover/SignupForm/Container';

import '../styles/Base/index.scss';

const history = syncHistoryWithStore(browserHistory, store);

browserHistory.listen(location => console.log(location));

document.addEventListener('DOMContentLoaded', () => {
    render(
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
