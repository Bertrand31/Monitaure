import { connect } from 'react-redux';

import GlobalStatsComponent from './Component';

const mapStateToProps = state => ({
    checks: state.checks,
    isACheckOpen: state.openCheckID !== null,
});

const GlobalStatsContainer = connect(mapStateToProps)(GlobalStatsComponent);

export default GlobalStatsContainer;
