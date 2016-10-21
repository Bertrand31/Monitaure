import React from 'react';

import Filters from './Filters/Container';
import LogTable from './LogTable/Container';

const LogPanelComponent = () => (
    <div className="o-main o-pane-container dashboard">
        <Filters />
        <LogTable />
    </div>
);

export default LogPanelComponent;
