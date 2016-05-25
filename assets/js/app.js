require(['react', 'react-dom', './components/Popins.react', './components/ChecksTable.react', './components/OverlayForm.react'],
    function(React, ReactDOM, Popins, ChecksTable, OverlayForm) {

        ReactDOM.render(
            <Popins />,
            document.getElementById('popins-container')
        );

        ReactDOM.render(
            <ChecksTable />,
            document.getElementById('checks-table-wrapper')
        );

        ReactDOM.render(
            <OverlayForm />,
            document.getElementById('fullscreen-wrapper')
        );
    }
);
