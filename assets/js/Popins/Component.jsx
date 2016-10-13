import React, { Component, PropTypes } from 'react';

import '../../styles/Popins/index.scss';

class Popin extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        destroy: PropTypes.func.isRequired,
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.destroy(this.props.data.id);
        }, 3000);
    }

    render() {
        return (
            <div className={`c-popin c-popin--${this.props.data.variant}`}>
                <p className="c-popin__body">{this.props.data.text}</p>
                <div
                    className="c-popin__close"
                    onClick={() => this.props.destroy(this.props.data.id)}
                />
            </div>
        );
    }
}

const PopinsList = ({ popins = {}, destroy }) => (
    <div className="c-popins-container">
        {Object.keys(popins).map(id =>
            <Popin data={popins[id]} destroy={destroy} key={id} />
        )}
    </div>
);

PopinsList.propTypes = {
    popins: PropTypes.object,
    destroy: PropTypes.func.isRequired,
};

export default PopinsList;
