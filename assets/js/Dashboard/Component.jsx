import React from 'react';

import Sidebar from './Sidebar/Container';
import MainPanel from './MainPanel/Container';

import '../../styles/dashboard.scss';

const Dashboard = () => (
    <div>
        <Sidebar />
        <MainPanel />
    </div>
);

export default Dashboard;
