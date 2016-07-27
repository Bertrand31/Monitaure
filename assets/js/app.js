import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './Redux/Store';

// import Sidebar from './Sidebar/Sidebar.react';
// import Dashboard from './Dashboard/Dashboard.react';
import SignupForm from './Signup/Container';
import Popins from './Popins/Container';


class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <Popins />
            </div>
        );
    }
}
// class App extends React.Component {
//     constructor() {
//         super();
//     }
//     render() {
//         return (
//             <div>
//                 <Popins />
//                 // <Sidebar />
//                 // <Dashboard />
//             </div>
//         );
//     }
// }

class Signup extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="main-container sign-in">
                <SignupForm />
                <Popins />
            </div>
        );
    }
}

// TODO: REMOVE UGLY FIX (replace with React Router)
if (document.getElementsByClassName('signup')) {
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
