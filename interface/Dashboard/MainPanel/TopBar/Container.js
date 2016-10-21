import { connect } from 'react-redux';

import { createWorkingCheck } from '../ChecksTable/Actions';
import TopBarComponent from './Component';

const mapDispatchToProps = dispatch => ({
    createWorkingCheck() {
        return dispatch(createWorkingCheck());
    },
});

const TopBarContainer = connect(null, mapDispatchToProps)(TopBarComponent);

export default TopBarContainer;
