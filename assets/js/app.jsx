// import 'babel-polyfill';
import 'isomorphic-fetch';
import 'fastclick';

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { browserHistory, Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider, connect } from 'react-redux';
import store from './Redux/Store';

import { GETer } from './serverIO/ajaxMethods';
import * as API from './serverIO/dataHandling';

import * as UserActions from './User/Actions';

import Homepage from './Homepage/Component';
import Dashboard from './Dashboard/Component';

import Popover from './Homepage/Popover/Component';
import LoginForm from './Homepage/Popover/LoginForm/Container';
import SignupForm from './Homepage/Popover/SignupForm/Container';
import Popins from './Popins/Container';

import '../styles/base.scss';

class Root extends React.Component {
    componentWillMount() {
        this.props.getCSRFToken();
        this.props.checkAuth();
    }
    render() {
        if (this.props.isLoggedIn) {
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
                <Popover form={this.props.children} />
                <Homepage />
            </div>
        );
    }
}

Root.propTypes = {
    getCSRFToken: PropTypes.func.isRequired,
    checkAuth: PropTypes.func.isRequired,
    children: PropTypes.element,
    isLoggedIn: PropTypes.bool,
};

const mapStateToProps = state => ({ isLoggedIn: state.user.isLoggedIn });

const mapDispatchToProps = dispatch => ({
    checkAuth: () => API.isLoggedIn(GETer, (err, { isLoggedIn }) =>
        dispatch(UserActions.changeAuthenticationState(isLoggedIn))
    ),
    getCSRFToken: () => API.csrfToken(GETer, (err, { _csrf }) =>
        sessionStorage.setItem('csrfToken', _csrf)
    ),
});

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Root);

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
