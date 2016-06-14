define(['react', '../actions/ChecksActions'],
    function(React, ChecksActions) {
        class TopButton extends React.Component {
            render() {
                return (
                    <section className="c-pane-top">
                        <button className="c-pane-top__button button" onClick={this._onCreateClick.bind(this)}>
                            Add a check
                        </button>
                    </section>
                );
            }

            _onCreateClick() {
                ChecksActions.createWorkingCheck();
            }
        }

        return TopButton;
    }
);
