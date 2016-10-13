import { connect } from 'react-redux';

import { close } from './Actions';

import PopoverComponent from './Component';

const mapStateToProps = state => ({ openPopover: state.openPopover });

const mapDispatchToProps = dispatch => ({
    closePopover: () => dispatch(close()),
});

const PopoverContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PopoverComponent);

export default PopoverContainer;

