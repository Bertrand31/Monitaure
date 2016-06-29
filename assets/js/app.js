import React from 'react';
import ReactDOM from 'react-dom';

import SignupForm from './components/SignupForm.react';
import Popins from './components/Popins.react';
import Sidebar from './components/Sidebar.react';
import Dashboard from './components/Dashboard.react';

ReactDOM.render(
    <Popins />,
    document.getElementById('popins-container')
);

// TODO: UGLY FIX
if (document.getElementById('signup-form')) {
    ReactDOM.render(
        <SignupForm />,
        document.getElementById('signup-form')
    );
} else {
    ReactDOM.render(
        <Sidebar />,
        document.getElementById('sidebar')
    );

    ReactDOM.render(
        <Dashboard />,
        document.getElementById('pane-container')
    );

}
