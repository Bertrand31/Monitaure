require(['react', 'react-dom', './components/Popins.react', './actions/PopinsActions', './components/ChecksTable.react'],
    function(React, ReactDOM, Popins, PopinsActions, ChecksTable) {

        setTimeout(() => {
            PopinsActions.create('alert', 'Test popin');
        }, 2000);
        setTimeout(() => {
            PopinsActions.create('alert', 'Test popin 2');
        }, 4000);

        ReactDOM.render(
            <Popins />,
            document.getElementById('popins-container')
        );

        ReactDOM.render(
            <ChecksTable />,
            document.getElementById('checks-table-wrapper')
        );
    }
);
