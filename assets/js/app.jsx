import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './Redux/Store';

import Sidebar from './Sidebar/Container';
import Dashboard from './Dashboard/Container';
import SignupForm from './User/Signup/Container';
import Popins from './Popins/Container';

const App = () => (
    <div className="react-container">
        <Popins />
        <Sidebar />
        <Dashboard />
    </div>
);

const Signup = () => (
    <div className="main-container sign-in">
        <SignupForm />
        <Popins />
    </div>
);

document.addEventListener('DOMContentLoaded', () => {
    // TODO: REMOVE UGLY FIX (replace with React Router)
    if (document.getElementsByClassName('signup').length > 0) {
        ReactDOM.render(
            <Provider store={store}>
                <Signup />
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
