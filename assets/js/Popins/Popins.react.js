import React from 'react';
import PopinsActions from './Actions';

class PopinView extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        setTimeout(() => {
            PopinsActions.destroy(this.props.data.id);
        }, 3000);
    }

    render() {
        const popinClasses = `c-popin c-popin--${this.props.data.type}`;
        return (
            <div className={popinClasses}>
                <p className="c-popin__body">{this.props.data.text}</p>
                <div className="c-popin__close" onClick={this._onDestroyClick.bind(this)}></div>
            </div>
        );
    }

    _onDestroyClick() {
        this.props.destroy(this.props.data.id);
    }
}

function getPopinsState() {
    return {
        allPopins: PopinsStore.getAll()
    };
}

class PopinsController extends React.Component {
    constructor() {
        super();
        this.state = getPopinsState();
    }
    componentDidMount() {
        PopinsStore.addChangeListener(this._onChange.bind(this));
    }
    componentWillUnmount() {
        PopinsStore.removeChangeListener(this._onChange.bind(this));
    }

    render() {
        if (Object.keys(this.state.allPopins).length < 1) {
            return null;
        }

        const allPopins = this.state.allPopins;
        const popins = [];

        for (const key in allPopins) {
            if (allPopins.hasOwnProperty(key)) {
                popins.push(<PopinView data={allPopins[key]} key={allPopins[key].id} destroy={PopinsActions.destroy} />);
            }
        }

        return (
            <div>{popins}</div>
        );
    }

    _onChange() {
        this.setState(getPopinsState());
    }
}

export default PopinsController;
