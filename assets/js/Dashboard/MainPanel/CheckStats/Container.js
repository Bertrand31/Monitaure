import { connect } from 'react-redux';

import CheckStatsComponent from './Component';

const mapStateToProps = state => ({ openCheck: state.openCheck });

const CheckStatsContainer = connect(mapStateToProps)(CheckStatsComponent);

export default CheckStatsContainer;
