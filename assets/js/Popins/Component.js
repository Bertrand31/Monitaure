import React, { PropTypes } from 'react';

class Popin extends React.Component {
    // TODO: turn into pure function by moving this to the controller?
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
                >
                </div>
            </div>
        );
    }
}

Popin.propTypes = {
    data: PropTypes.object.isRequired,
    destroy: PropTypes.func.isRequired,
};

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
