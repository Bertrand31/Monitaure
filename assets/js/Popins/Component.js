import React from 'react';

class Popin extends React.Component {
    constructor(props) {
        super(props);
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
                <div className="c-popin__close" onClick={() => this.props.destroy(this.props.data.id)}></div>
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

export default PopinsList;
