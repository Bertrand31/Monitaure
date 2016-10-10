import { connect } from 'react-redux';

import CheckStatsComponent from './Component';

const mapStateToProps = state => ({
    openCheckID: state.openCheckID,
    checks: state.checks
});

const CheckStatsContainer = connect(mapStateToProps)(CheckStatsComponent);

export default CheckStatsContainer;
