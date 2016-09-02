import { connect } from 'react-redux';
import { open, close } from './Actions';
import Homepage from './Component';

const mapStateToProps = (state) => ({ openPopover: state.openPopover });
// const mapStateToProps = (state) => { console.log(state.openPopover); return { openPopover: state.openPopover }};

const mapDispatchToProps = (dispatch) => ({
    open: (variant) => {
        dispatch(open(variant));
    },
    close: () => {
        dispatch(close());
    },
});

const HomepageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Homepage);

export default HomepageContainer;
