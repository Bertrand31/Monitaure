define(['react', '../actions/PopinsActions', '../stores/PopinsStore'], function(React, PopinsActions, PopinsStore) {

    function getPopinsState() {
        return {
            allPopins: PopinsStore.getAll()
        };
    }

    const Popin = React.createClass({
        componentDidMount: function() {
            setTimeout(() => {
                PopinsActions.destroy(this.props.data.id);
            }, 3000);
        },
        render: function() {
            return (
                <div data-type={this.props.data.type} className="pop-in">
                    <p className="content">{this.props.data.text}</p>
                    <div className="close-popin" onClick={this._onDestroyClick}></div>
                </div>
            );
        },
        _onDestroyClick: function() {
            PopinsActions.destroy(this.props.data.id);
        }
    });

    const Popins = React.createClass({
        getInitialState: function() {
            return getPopinsState();
        },
        componentDidMount: function() {
            PopinsStore.addChangeListener(this._onChange);
        },
        componentWillUnmount: function() {
            PopinsStore.removeChangeListener(this._onChange);
        },

        render: function() {
            if (Object.keys(this.state.allPopins).length < 1) {
                return null;
            }

            const allPopins = this.state.allPopins;
            const popins = [];

            for(let key in allPopins) {
                if (allPopins.hasOwnProperty(key)) {
                    popins.push(<Popin data={allPopins[key]} key={allPopins[key].id} />);
                }
            }

            return(
                <div>{popins}</div>
            );
        },

        _onChange: function() {
            this.setState(getPopinsState());
        }
    });

    return Popins;
});
