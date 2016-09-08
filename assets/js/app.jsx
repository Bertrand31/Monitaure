import 'babel-polyfill';
import 'isomorphic-fetch';
import 'fastclick';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Redux/Store';

import Homepage from './Homepage/Container';
import Dashboard from './Dashboard/Component';

import Popover from './Popover/Container';
import Popins from './Popins/Container';

const Home = () => (
    <div className="react-container">
        <Popins />
        <Popover />
        <Homepage />
    </div>
);

const App = () => (
    <div className="react-container">
        <Popins />
        <Dashboard />
    </div>
);

document.addEventListener('DOMContentLoaded', () => {
    // TODO: REMOVE UGLY FIX (replace with React Router)
    if (document.getElementsByClassName('homepage').length > 0) {
        ReactDOM.render(
            <Provider store={store}>
                <Home />
            </Provider>,
            document.getElementById('root')
        );
    } else {
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.getElementById('root')
        );
    }
});
