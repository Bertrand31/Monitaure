import { connect } from 'react-redux';

import { GETer } from '../serverIO/ajaxMethods';
import * as API from '../serverIO/dataHandling';

import { create as popinCreate } from '../Popins/Actions';
import * as SWActions from '../ServiceWorker/Actions';

import { subscribe as subscribeToPush } from '../ServiceWorker/pushAPI';

import AppComponent from './Component';

navigator.vibrate = navigator.vibrate || navigator.webkitVibrate ||
                    navigator.mozVibrate || navigator.msVibrate;

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn,
    isOffline: state.isOffline,
});

const mapDispatchToProps = dispatch => ({
    activateSW: () => navigator.serviceWorker.register('/sw.js', { scope: '/' }),

    subscribeToPush,

    watchConnectivityState: () => {
        dispatch(SWActions.setConnectivityState(navigator.onLine ? 'online' : 'offline'));
        window.addEventListener('load', () => {
            const updateOnlineStatus = (e) => {
                if (navigator.vibrate) navigator.vibrate(100);

                if (e.type === 'offline') {
                    dispatch(popinCreate('info', 'Now working offline'));
                    dispatch(SWActions.setConnectivityState('offline'));
                } else {
                    dispatch(popinCreate('info', 'We are back online!'));
                    dispatch(SWActions.setConnectivityState('online'));
                }
            };

            window.addEventListener('online', updateOnlineStatus);
            window.addEventListener('offline', updateOnlineStatus);
        });
    },
    getCSRFToken: () => API.csrfToken(GETer, (err, { _csrf }) =>
        sessionStorage.setItem('csrfToken', _csrf)
    ),
});

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppComponent);

export default AppContainer;
