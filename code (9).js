import React, { useState } from 'react';
import Card from '../Card/Card';

const Reports = () => {
    const [moodTimeRange, setMoodTimeRange] = useState('30d');
    const [sleepTimeRange, setSleepTimeRange] = useState('30d');
    const [activityTimeRange, setActivityTimeRange] = useState('30d');

    const handleTimeRangeChange = (setter, value) => {
        setter(value);
        console.log(`Report time range changed to: ${value} (Simulated)`);
        // Add logic to fetch/update report data based on the new range
    };

    const handleDownload = (reportType) => {
        alert(`Simulating download for ${reportType} Report (CSV)`);
        console.log(`Download ${reportType} data (Simulated)`);
    };

    const ReportSection = ({ id, title, icon, timeRange, setTimeRange, reportType }) => (
         <Card className={`${reportType}-report`} id={id}>
             <h2><i className={`icon-placeholder ${icon}`}></i> {title}</h2>
             <div className="report-controls">
                 <div className="time-range">
                     <label htmlFor={`${reportType}-time-range`} style={{ marginRight: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Time Range:</label>
                     <select
                         id={`${reportType}-time-range`}
                         name={`${reportType}-time-range`}
                         value={timeRange}
                         onChange={(e) => handleTimeRangeChange(setTimeRange, e.target.value)}
                     >
                         <option value="7d">Last 7 Days</option>
                         <option value="30d">Last 30 Days</option>
                         <option value="90d">Last 90 Days</option>
                         <option value="all">All Time</option>
                     </select>
                 </div>
                 <a href="#" className="download-button" onClick={(e) => {e.preventDefault(); handleDownload(reportType);}} title={`Download ${title} Report (CSV)`}>
                     <i className="icon-placeholder icon-download"></i> Download Data
                 </a>
             </div>
             <div className="report-placeholder">
                 [ Placeholder for Detailed {title} Charts & Analysis ]<br />
                 (e.g., Trend line, correlations, distribution based on '{timeRange}' range)
             </div>
         </Card>
     );


    return (
        <div id="reports-content" className="page-section active-section">
            <div className="page-header">
                <h1>Reports & Insights</h1>
            </div>
            <div className="page-content">
                <ReportSection
                    id="mood"
                    title="Mood Analysis"
                    icon="icon-heart"
                    timeRange={moodTimeRange}
                    setTimeRange={setMoodTimeRange}
                    reportType="mood"
                />
                 <ReportSection
                     id="sleep"
                     title="Sleep Analysis"
                     icon="icon-sleep"
                     timeRange={sleepTimeRange}
                     setTimeRange={setSleepTimeRange}
                     reportType="sleep"
                 />
                  <ReportSection
                      id="activity"
                      title="Activity Insights"
                      icon="icon-activity"
                      timeRange={activityTimeRange}
                      setTimeRange={setActivityTimeRange}
                      reportType="activity"
                  />
                {/* Add more report sections as needed */}
            </div>
        </div>
    );
};

export default Reports;