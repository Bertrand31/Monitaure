import React from 'react';

import ReportsFilters from './Filters/Container';
import ReportsTable from './ReportsTable/Container';

const ReportsPanelComponent = () => (
    <div className="o-main o-pane-container dashboard">
        <ReportsFilters />
        <ReportsTable />
    </div>
);

export default ReportsPanelComponent;
