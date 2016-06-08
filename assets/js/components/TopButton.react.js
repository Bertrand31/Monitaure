define(['react', '../actions/ChecksActions'],
    function(React, ChecksActions) {
        const TopButton = React.createClass({
            render() {
                return (
                    <button className="button" onClick={this._onCreateClick}>Add a check</button>
                );
            },
            _onCreateClick() {
                ChecksActions.createWorkingCheck();
            }
        });

        return TopButton;
    }
);
