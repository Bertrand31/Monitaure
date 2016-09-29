import { connect } from 'react-redux';

import GlobalStatsComponent from './Component';

const mapStateToProps = state => ({
    checks: state.checks,
    isACheckOpen: Object.keys(state.openCheck).length > 0,
});

const GlobalStatsContainer = connect(mapStateToProps)(GlobalStatsComponent);

export default GlobalStatsContainer;
