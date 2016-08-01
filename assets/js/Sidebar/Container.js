import { connect } from 'react-redux';

import Sidebar from './Component.js';

const mapStateToProps = (state) => ({ user: state.user });

const SidebarContainer = connect(mapStateToProps)(Sidebar);

export default SidebarContainer;

