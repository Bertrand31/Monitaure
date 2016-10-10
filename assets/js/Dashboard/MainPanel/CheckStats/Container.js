import { connect } from 'react-redux';

import CheckStatsComponent from './Component';

const mapStateToProps = state => ({
    openCheck: state.openCheckID ? state.checks[state.openCheckID] : null,
});

const CheckStatsContainer = connect(mapStateToProps)(CheckStatsComponent);

export default CheckStatsContainer;
