require(
    ['react', 'react-dom',
    './components/SignupForm.react',
    './components/Popins.react',
    './components/Sidebar.react',
    './components/Dashboard.react'],
    function(React, ReactDOM, SignupForm, Popins, Sidebar, Dashboard) {

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
    }
);
