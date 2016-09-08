import 'babel-polyfill';
import 'isomorphic-fetch';
import 'fastclick';

import React from 'react';
import ReactDOM from 'react-dom';

import { browserHistory, Router, Route, IndexRoute, Link, withRouter } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import store from './Redux/Store';

import Homepage from './Homepage/Container';
import Dashboard from './Dashboard/Component';

import Popover from './Homepage/Popover/Container';
import Popins from './Popins/Container';

const Home = () => (
    <div className="react-container">
        <Popins />
        <Popover />
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
                <Route path='/' component={Home} />
                <Route path='/app' component={App}>
                    <IndexRoute component={Dashboard} />
                </Route>
                <App />
            </Router>
        </Provider>,

        document.getElementById('root')
    );
});
