import React, { useState } from 'react';
import Card from '../Card/Card'; // Import reusable Card component

// Improved Dashboard specific styles (could be in global.css or a module)
const dashboardStyles = `
#dashboard-content .dashboard-grid {
    gap: 30px; /* Increased gap */
}

/* Ensure cards stretch if needed */
#dashboard-content .card {
   margin-bottom: 0; /* Remove margin-bottom as grid gap handles spacing */
}

/* Optional: Style for specific cards if needed */
#dashboard-content .overview {
    grid-column: span 1; /* Default */
}
#dashboard-content .quick-actions {
     grid-column: span 1; /* Default */
}
#dashboard-content .mood-line-chart {
    grid-column: span 2; /* Make chart wider on larger screens */
}
#dashboard-content .mood-donut-chart {
     grid-column: span 1;
}
#dashboard-content .goals {
    grid-column: span 1;
}
#dashboard-content .sources {
     grid-column: span 1;
}
#dashboard-content .resources-nav {
    grid-column: span 2; /* Make wider */
}

/* Adjustments for medium screens if span 2 is too much */
@media (max-width: 1200px) {
    #dashboard-content .mood-line-chart,
    #dashboard-content .resources-nav {
        grid-column: span 1; /* Revert to single column */
    }
}
`;


const Dashboard = ({ onNavigate }) => {
    // State for chart options - Example
    const [moodTrendOption, setMoodTrendOption] = useState('This Week');

    const handleChartOptionClick = (option) => {
        setMoodTrendOption(option);
        console.log(`Chart option selected: ${option} (Dashboard - Simulated)`);
        // Add data reload logic here if charts were dynamic
    };

     // Helper function for navigation links inside the dashboard
     const handleDashboardLinkClick = (e, targetId, focusSelector = null) => {
         e.preventDefault();
         const linkElement = e.target.closest('a');
         const title = linkElement?.title || linkElement?.textContent?.trim() || 'Wellbeing Page';
         onNavigate(targetId, title, focusSelector);
     };

    return (
        <div id="dashboard-content" className="page-section active-section"> {/* Keep ID for potential focus targeting */}
            <style>{dashboardStyles}</style> {/* Inject specific styles */}
            <header>
                <h1>My Personal Wellbeing Dashboard</h1>
            </header>
            <div className="dashboard-grid">
                {/* Section: Today's Snapshot */}
                <Card className="overview">
                    <h2>Today's Snapshot</h2>
                    <div className="stats-grid">
                        {/* Static data for now */}
                        <div className="stat-item"> <span className="stat-label">Overall Mood</span> <span className="stat-value mood-value">😊 Calm</span> </div>
                        <div className="stat-item"> <span className="stat-label">Energy Level</span> <span className="stat-value energy-value">⚡ Medium</span> </div>
                        <div className="stat-item"> <span className="stat-label">Sleep Quality</span> <span className="stat-value sleep-value">⭐ Good (7.5h)</span> </div>
                        <div className="stat-item"> <span className="stat-label">Meds Taken</span> <span className="stat-value meds-value" data-value="yes">✅ Yes</span> </div>
                        <div className="stat-item"> <span className="stat-label">Key Symptom</span> <span className="stat-value symptom-value">🧠 Mild Fog</span> </div>
                         <div className="stat-item"> <span className="stat-label">Hydration</span> <span className="stat-value hydration-value">💧 Good</span> </div>
                    </div>
                </Card>

                {/* Section: Quick Actions */}
                <Card className="quick-actions">
                    <h2>Quick Actions</h2>
                    <ul>
                        <li><a href="#" onClick={(e) => handleDashboardLinkClick(e, '#check-in-content')} title="Log today's mood, energy, etc."><i className="icon-placeholder icon-plus"></i> Log Today's Check-in</a></li>
                        <li><a href="#" onClick={(e) => handleDashboardLinkClick(e, '#sleep-log-content', '#add-sleep-entry')} title="Add a sleep entry"><i className="icon-placeholder icon-plus"></i> Add Sleep Log</a></li>
                        <li><a href="#" onClick={(e) => handleDashboardLinkClick(e, '#journal-content', '#add-journal-entry')} title="Write a journal entry"><i className="icon-placeholder icon-plus"></i> Add Journal Entry</a></li>
                    </ul>
                </Card>

                {/* Section: Weekly Mood Trend */}
                <Card className="mood-line-chart">
                    <div className="chart-card-header">
                        <h2>Weekly Mood Trend</h2>
                        <div className="chart-options">
                            {['This Week', 'Last Week'].map(opt => (
                                <span
                                    key={opt}
                                    className={`option ${moodTrendOption === opt ? 'active' : ''}`}
                                    onClick={() => handleChartOptionClick(opt)}
                                >
                                    {opt}
                                </span>
                            ))}
                        </div>
                    </div>
                    {/* Static Chart Placeholder */}
                    <div className="line-chart-container">
                         <div className="line-chart-axes"><span>😊 High</span><span>😐 Mid</span><span>😔 Low</span></div>
                         <div className="line-chart-grid"><div></div><div></div><div></div></div>
                         <svg className="line-chart-svg" viewBox="0 0 100 50" preserveAspectRatio="none">
                             <path d="M 0 30 C 10 10, 20 15, 30 25 S 50 40, 60 30 S 80 10, 90 20 L 100 25" />
                             <circle cx="15" cy="12.5" r="3.5"><title>Mon: Good</title></circle>
                             <circle cx="30" cy="25" r="3.5"><title>Tue: Okay</title></circle>
                             <circle cx="60" cy="30" r="3.5"><title>Wed: Neutral</title></circle>
                             <circle cx="85" cy="15" r="3.5"><title>Fri: Good</title></circle>
                             <circle cx="100" cy="25" r="3.5"><title>Sun: Okay</title></circle>
                        </svg>
                        <div className="line-chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
                    </div>
                </Card>

                 {/* Section: Mood Breakdown */}
                 <Card className="mood-donut-chart">
                      <div className="chart-card-header">
                         <h2>Mood Breakdown (30d)</h2>
                          <a href="#" onClick={(e) => handleDashboardLinkClick(e, '#reports-content', '#mood')} className="chart-link">Details</a>
                     </div>
                      <div className="donut-chart-container">
                          <div className="donut-chart">
                               <div className="donut-chart-center-text"><span className="value">7.2</span><span className="label">Avg Mood</span></div>
                          </div>
                          <ul className="donut-chart-legend">
                               <li><span className="dot" style={{ backgroundColor: 'var(--chart-donut-positive)' }}></span> Calm/Positive <span className="percentage">45%</span></li>
                               <li><span className="dot" style={{ backgroundColor: 'var(--chart-donut-neutral)' }}></span> Neutral/Okay <span className="percentage">30%</span></li>
                               <li><span className="dot" style={{ backgroundColor: 'var(--chart-donut-negative)' }}></span> Stressed/Negative <span className="percentage">15%</span></li>
                               <li><span className="dot" style={{ backgroundColor: 'var(--chart-donut-other)' }}></span> Unspecified <span className="percentage">10%</span></li>
                          </ul>
                     </div>
                 </Card>

                 {/* Section: Goals */}
                 <Card className="goals">
                     <h2>Active Goals / Habits</h2>
                     <ul>
                          {/* Static data for now */}
                          <li><span className="goal-text">🧘 Meditate Daily (3/7)</span><progress value="3" max="7" title="3 out of 7 days completed"></progress></li>
                          <li><span className="goal-text">🚶 Walk 30 mins 5x/week (2/5)</span><progress value="2" max="5" title="2 out of 5 sessions completed"></progress></li>
                          <li><span className="goal-text">💧 Drink 2L Water Daily (6/7)</span><progress value="6" max="7" title="6 out of 7 days completed"></progress></li>
                     </ul>
                      <a href="#" onClick={(e) => handleDashboardLinkClick(e, '#goals-content')} className="view-goals-btn">View All Goals</a>
                 </Card>

                 {/* Section: Sources */}
                 <Card className="sources">
                     <h2>Helpful Sources</h2>
                     <ul>
                         <li><a href="#" onClick={(e) => handleDashboardLinkClick(e, '#strategies-content', '#mindfulness')} title="Mindfulness Exercises"><i className="icon-placeholder icon-heart"></i> Mindfulness Exercises</a></li>
                         <li><a href="#" target="_blank" rel="noopener noreferrer" title="Local Support Groups (External Link Example)"><i className="icon-placeholder icon-list"></i> Local Support Groups</a></li>
                         <li><a href="#" target="_blank" rel="noopener noreferrer" title="Mental Health Helplines (External Link Example)"><i className="icon-placeholder icon-link"></i> Mental Health Helplines</a></li>
                          <li><a href="#" onClick={(e) => handleDashboardLinkClick(e, '#strategies-content', '#sleep')} title="Sleep Hygiene Tips"><i className="icon-placeholder icon-sleep"></i> Sleep Hygiene Tips</a></li>
                     </ul>
                 </Card>

                 {/* Resources/Navigation Card */}
                 <Card className="resources-nav">
                      <h2>Resources & Sections</h2>
                      <div className="nav-links">
                         <a href="#" onClick={(e) => handleDashboardLinkClick(e, '#daily-logs-content')}>Full Daily Logs</a>
                         <a href="#" onClick={(e) => handleDashboardLinkClick(e, '#reports-content', '#sleep')}>Sleep Analysis</a>
                         <a href="#" onClick={(e) => handleDashboardLinkClick(e, '#reports-content', '#activity')}>Activity Insights</a>
                         <a href="#" onClick={(e) => handleDashboardLinkClick(e, '#journal-content')}>Journal Entries</a>
                         <a href="#" onClick={(e) => handleDashboardLinkClick(e, '#symptom-tracker-content')}>Symptom Tracker</a>
                         <a href="#" onClick={(e) => handleDashboardLinkClick(e, '#medication-content')}>Medication Details</a>
                         <a href="#" onClick={(e) => handleDashboardLinkClick(e, '#strategies-content')}>Coping Strategies</a>
                      </div>
                 </Card>
            </div>
        </div>
    );
};

export default Dashboard;