import 'react-fastclick';

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { browserHistory, Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider, connect } from 'react-redux';
import store from './Redux/Store';

import { GETer } from './serverIO/ajaxMethods';
import * as API from './serverIO/dataHandling';

import { create as popinCreate } from './Popins/Actions';
import * as UserActions from './User/Actions';
import * as SWActions from './ServiceWorker/Actions';

import Homepage from './Homepage/Component';
import Dashboard from './Dashboard/Component';

import Popover from './Homepage/Popover/Component';
import LoginForm from './Homepage/Popover/LoginForm/Container';
import SignupForm from './Homepage/Popover/SignupForm/Container';
import Popins from './Popins/Container';

import { subscribe } from './ServiceWorker/pushAPI';

import '../styles/Base/index.scss';

navigator.vibrate = navigator.vibrate || navigator.webkitVibrate ||
                    navigator.mozVibrate || navigator.msVibrate;
const vibrateIsSupported = !!navigator.vibrate;

class Root extends React.Component {
    componentWillMount() {
        this.props.getCSRFToken();
        this.props.checkAuth();
        this.props.watchConnectivityState();
    }
    render() {
        if (this.props.isLoggedIn) {
            if ('serviceWorker' in navigator) {
                this.props.activateSW();
            }

            return (
                <div className={`react-container ${this.props.isOffline ? 'is-offline' : ''}`}>
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
    watchConnectivityState: PropTypes.func.isRequired,
    activateSW: PropTypes.func.isRequired,
    children: PropTypes.element,
    isLoggedIn: PropTypes.bool.isRequired,
    isOffline: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({ isLoggedIn: state.user.isLoggedIn, isOffline: state.isOffline });

const mapDispatchToProps = dispatch => ({
    checkAuth: () => API.isLoggedIn(GETer, (err, { isLoggedIn }) =>
        dispatch(UserActions.changeAuthenticationState(isLoggedIn))
    ),
    activateSW: () => {
        navigator.serviceWorker.register('/sw.js', { scope: '/' });
        subscribe();
    },
    watchConnectivityState: () => {
        dispatch(SWActions.setConnectivityState(navigator.onLine ? 'online' : 'offline'));
        window.addEventListener('load', () => {
            const updateOnlineStatus = e => {
                if (vibrateIsSupported) navigator.vibrate(100);
                if (e.type === 'offline') {
                    dispatch(popinCreate('info', 'Now working offline'));
                    dispatch(SWActions.setConnectivityState('offline'));
                } else {
                    dispatch(popinCreate('info', 'We are back online!'));
                    dispatch(SWActions.setConnectivityState('online'));
                }
            };

            window.addEventListener('online',  updateOnlineStatus);
            window.addEventListener('offline', updateOnlineStatus);
        });
    },
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
