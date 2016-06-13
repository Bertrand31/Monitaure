require(
    ['react', 'react-dom',
    './components/SignupForm.react',
    './components/Popins.react',
    './components/Navigation.react',
    './components/User.react',
    './components/Dashboard.react'],
    function(React, ReactDOM, SignupForm, Popins, Navigation, User, Dashboard) {

        // TODO: UGLY FIX
        if (document.getElementById('signup-form')) {
            ReactDOM.render(
                <SignupForm />,
                document.getElementById('signup-form')
            );
        } else {
            ReactDOM.render(
                <Popins />,
                document.getElementById('popins-container')
            );

            ReactDOM.render(
                <Navigation />,
                document.getElementById('sidebar__nav')
            );

            ReactDOM.render(
                <User />,
                document.getElementById('profile')
            );

            ReactDOM.render(
                <Dashboard />,
                document.getElementById('pane-container')
            );

        }
    }
);
