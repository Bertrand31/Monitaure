import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './Redux/Store';

import Homepage from './Homepage/Container';
import Sidebar from './Sidebar/Container';
import Dashboard from './Dashboard/Container';
import SignupForm from './User/Signup/Container';
import Popins from './Popins/Container';

const Home = () => (
    <div className="react-container">
        <Popins />
        <Homepage />
    </div>
);

const App = () => (
    <div className="react-container">
        <Popins />
        <Sidebar />
        <Dashboard />
    </div>
);

const Signup = () => (
    <div className="main-container sign-in">
        <main className="main">
            <h1 className="logo">
                <img src="/images/logo.svg" width="264" height="39" alt="Monitaure - Monitoring for the masses" />
            </h1>
            <SignupForm />
        </main>
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
    } else if (document.getElementsByClassName('homepage').length > 0) {
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
