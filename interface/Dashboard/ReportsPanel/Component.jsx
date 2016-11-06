import React from 'react';

import ReportsFilters from './Filters/Container';
import ReportsTable from './ReportsTable/Container';

const ReportsPanelComponent = () => (
    <div className="o-main o-pane-container dashboard">
        <p>Warning: this part of this app is still under heavy development.<br />This is just an incomplete preview of the final "Reports" panel.</p>
        <ReportsFilters />
        <ReportsTable />
    </div>
);

export default ReportsPanelComponent;
