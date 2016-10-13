import React, { Component, PropTypes } from 'react';

import Popins from '../Popins/Container';

class AppComponent extends Component {
    componentWillMount() {
        this.props.getCSRFToken();
        this.props.watchConnectivityState();
    }
    render() {
        if (this.props.isLoggedIn && 'serviceWorker' in navigator) {
            this.props.subscribeToPush();
            this.props.activateSW();
        }

        return (
            <div className={`react-container ${this.props.isOffline ? 'is-offline' : ''}`}>
                <Popins />
                {this.props.children}
            </div>
        );
    }
}

AppComponent.propTypes = {
    getCSRFToken: PropTypes.func.isRequired,
    watchConnectivityState: PropTypes.func.isRequired,
    activateSW: PropTypes.func.isRequired,
    subscribeToPush: PropTypes.func.isRequired,
    children: PropTypes.element,
    isLoggedIn: PropTypes.bool.isRequired,
    isOffline: PropTypes.bool.isRequired,
};

export default AppComponent;
