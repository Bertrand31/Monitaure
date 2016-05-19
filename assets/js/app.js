require(['react', 'react-dom', './components/Popins.react', './actions/PopinsActions', './components/ChecksTable.react', './components/OverlayForm.react'],
    function(React, ReactDOM, Popins, PopinsActions, ChecksTable, OverlayForm) {

        // setTimeout(() => {
            // PopinsActions.create('alert', 'Test popin');
        // }, 2000);

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
