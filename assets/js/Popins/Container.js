import { connect } from 'react-redux';
import { destroy } from './Actions';
import PopinsList from './Component.js';

const mapStateToProps = (state) => ({ popins: state.popins });

const mapDispatchToProps = (dispatch) => ({
    destroy: (id) => {
        dispatch(destroy(id));
    },
});

const PopinsListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PopinsList);

export default PopinsListContainer;
