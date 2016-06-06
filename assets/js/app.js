require(['react', 'react-dom', './components/Popins.react', './components/ChecksTable.react'],
    function(React, ReactDOM, Popins, ChecksTable) {

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
