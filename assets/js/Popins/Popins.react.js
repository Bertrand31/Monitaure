import React from 'react';
import { connect } from 'react-redux';
import { destroy } from './Actions';

class PopinView extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        setTimeout(() => {
            destroy(this.props.data.id);
        }, 3000);
    }

    render() {
        const popinClasses = `c-popin c-popin--${this.props.data.variant}`;
        return (
            <div className={popinClasses}>
                <p className="c-popin__body">{this.props.data.text}</p>
                <div className="c-popin__close" onClick={this.pros.destroy(this.props.data.id)}></div>
            </div>
        );
    }
}

class PopinsController extends React.Component {
    constructor() {
        super(props);
    }
    render() {
        if (Object.keys(this.props.popins).length < 1) {
            return null;
        }

        const popins = this.props.popins;
        const popinsArray = [];

        for (const key in popins) {
            if (popins.hasOwnProperty(key)) {
                popinsArray.push(<PopinView data={popins[key]} key={popins[key].id} destroy={(id) => dispatch(destroy(id))} />);
            }
        }

        return (
            <div>{popinsArray}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        popins: state.popins
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        destroy: (id) => {
            dispatch(destroy(id))
        }
    };
};

PopinsController = connect(
    mapStateToProps,
    mapDispatchToProps
)(PopinsController);

export default PopinsController;
