import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import Dashboard from './components/PageSections/Dashboard';
import CheckIn from './components/PageSections/CheckIn';
import SleepLog from './components/PageSections/SleepLog';
import Journal from './components/PageSections/Journal';
import ActivityLog from './components/PageSections/ActivityLog';
import Medication from './components/PageSections/Medication';
import Reports from './components/PageSections/Reports';
import Strategies from './components/PageSections/Strategies';
import Goals from './components/PageSections/Goals';
import Settings from './components/PageSections/Settings';
import DailyLogs from './components/PageSections/DailyLogs'; // Placeholder
import SymptomTracker from './components/PageSections/SymptomTracker'; // Placeholder

function App() {
    // State to track the active section (using the target ID)
    const [activeSection, setActiveSection] = useState('#dashboard-content');
    const [pageTitle, setPageTitle] = useState('My Wellbeing Dashboard'); // Add state for title

    // Function to handle navigation clicks
    const handleNavigate = (targetId, title = 'Wellbeing Dashboard', focusSelector = null) => {
        setActiveSection(targetId);
        setPageTitle(title); // Update title state
         // Note: Focusing logic might need refinement with refs in React,
         // especially after conditional rendering. Simple timeout approach for now.
        if (focusSelector) {
             setTimeout(() => {
                const targetElement = document.querySelector(`${targetId} ${focusSelector}`);
                targetElement?.focus();
                 // Scroll element into view if it's in a form card
                 if (targetElement?.closest('form')) {
                     targetElement.closest('.card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                 } else if (targetElement?.closest('.card')) {
                     // Scroll card into view otherwise
                      targetElement.closest('.card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                 }
             }, 150); // Short delay
        } else {
             // Scroll main content to top on general navigation
             document.querySelector('.main-content')?.scrollTo(0, 0);
        }
    };

    // Update document title when pageTitle state changes
    useEffect(() => {
        document.title = `${pageTitle} - Wellbeing`;
    }, [pageTitle]);


    // Function to handle logout
    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            console.log('Logging out (simulated)...');
            alert('Logged out successfully (simulated).');
            // Reset to dashboard or implement actual logout
             handleNavigate('#dashboard-content', 'My Personal Wellbeing Dashboard');
        }
    };

    // Define navigation items
    const mainNavItems = [
        { target: '#dashboard-content', icon: 'icon-dashboard', title: 'Dashboard' },
        { target: '#check-in-content', icon: 'icon-checkin', title: 'Quick Check-in' },
        { target: '#sleep-log-content', icon: 'icon-sleep', title: 'Sleep Log' },
        { target: '#journal-content', icon: 'icon-journal', title: 'Journal' },
        { target: '#activity-log-content', icon: 'icon-activity', title: 'Activity Log' },
        { target: '#medication-content', icon: 'icon-meds', title: 'Medication' },
        { target: '#reports-content', icon: 'icon-reports', title: 'Reports' },
        { target: '#strategies-content', icon: 'icon-list', title: 'Strategies' },
        { target: '#goals-content', icon: 'icon-list', title: 'Goals' },
        // Add placeholders if needed or implement later
        { target: '#daily-logs-content', icon: 'icon-list', title: 'Daily Logs' },
        { target: '#symptom-tracker-content', icon: 'icon-list', title: 'Symptom Tracker' },
    ];

    const footerNavItems = [
        { target: '#settings-content', icon: 'icon-settings', title: 'Settings' },
    ];

    return (
        <div className="app-layout">
            <Sidebar
                mainNavItems={mainNavItems}
                footerNavItems={footerNavItems}
                activeSection={activeSection}
                onNavigate={handleNavigate}
                onLogout={handleLogout}
            />
            <MainContent activeSection={activeSection} onNavigate={handleNavigate}>
                {/* Conditionally render page sections based on activeSection */}
                {activeSection === '#dashboard-content' && <Dashboard onNavigate={handleNavigate} />}
                {activeSection === '#check-in-content' && <CheckIn />}
                {activeSection === '#sleep-log-content' && <SleepLog />}
                {activeSection === '#journal-content' && <Journal />}
                {activeSection === '#activity-log-content' && <ActivityLog />}
                {activeSection === '#medication-content' && <Medication />}
                {activeSection === '#reports-content' && <Reports />}
                {activeSection === '#strategies-content' && <Strategies />}
                {activeSection === '#goals-content' && <Goals />}
                {activeSection === '#settings-content' && <Settings />}
                {/* Placeholder Page Sections */}
                {activeSection === '#daily-logs-content' && <DailyLogs />}
                {activeSection === '#symptom-tracker-content' && <SymptomTracker />}
            </MainContent>
        </div>
    );
}

export default App;