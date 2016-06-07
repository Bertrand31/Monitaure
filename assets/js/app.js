require(['react', 'react-dom', './components/Popins.react', './components/TopButton.react', './components/ChecksTable.react'],
    function(React, ReactDOM, Popins, TopButton, ChecksTable) {

        ReactDOM.render(
            <Popins />,
            document.getElementById('popins-container')
        );

        ReactDOM.render(
            <TopButton />,
            document.getElementById('top-button')
        );

        ReactDOM.render(
            <ChecksTable />,
            document.getElementById('checks-table-wrapper')
        );
    }
);
