import React from 'react';

import TopBar from './TopBar/Container';
import GlobalStats from './GlobalStats/Container';
import CheckStats from './CheckStats/Container';
import ChecksTable from './ChecksTable/Container';


const DashboardComponent = () => (
    <div className="o-main o-pane-container dashboard">
        <div className="pane-components-wrapper">
            <TopBar />
            <GlobalStats />
            <CheckStats />
        </div>
        <ChecksTable />
    </div>
);

export default DashboardComponent;
