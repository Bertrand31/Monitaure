import { connect } from 'react-redux';
import { open } from '../Popover/Actions';
import Homepage from './Component';

const mapStateToProps = (state) => ({ openPopover: state.openPopover });

const mapDispatchToProps = (dispatch) => ({
    open: (variant) => {
        dispatch(open(variant));
    },
});

const HomepageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Homepage);

export default HomepageContainer;
