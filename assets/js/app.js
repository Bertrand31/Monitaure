require(
    ['react', 'react-dom',
    './components/Popins.react',
    './components/Navigation.react',
    './components/User.react',
    './components/TopButton.react',
    './components/GlobalStats.react',
    './components/CheckStats.react',
    './components/ChecksTable.react'],
    function(React, ReactDOM, Popins, Navigation, User, TopButton, GlobalStats, CheckStats, ChecksTable) {

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
            <TopButton />,
            document.getElementById('top-button')
        );

        ReactDOM.render(
            <CheckStats />,
            document.getElementById('chart-container')
        );

        ReactDOM.render(
            <GlobalStats />,
            document.getElementById('global-data')
        );

        ReactDOM.render(
            <ChecksTable />,
            document.getElementById('checks-table-wrapper')
        );
    }
);
