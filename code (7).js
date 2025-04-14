import React, { useState } from 'react';
import Card from '../Card/Card';
import LogItem from '../Common/LogItem'; // Assuming a reusable LogItem component

// Helper to get date in YYYY-MM-DD format
const getTodayDateString = () => new Date().toISOString().split('T')[0];

// Initial dummy data
const initialSleepLogs = [
    { id: 3, date: 'Oct 23, 2023', summary: '8h 0m - ⭐⭐⭐⭐⭐ Excellent Quality. Vivid dreams.', rawDate: '2023-10-23', timeBed: '22:00', timeWake: '06:00', quality: '5', notes: 'Vivid dreams.'},
    { id: 2, date: 'Oct 24, 2023', summary: '6h 15m - ⭐⭐ Poor Quality. Woke up multiple times. Stressed before bed.', rawDate: '2023-10-24', timeBed: '23:30', timeWake: '05:45', quality: '2', notes: 'Woke up multiple times. Stressed before bed.' },
    { id: 1, date: 'Oct 25, 2023', summary: '7h 30m - ⭐⭐⭐⭐ Good Quality. Felt refreshed.', rawDate: '2023-10-25', timeBed: '22:30', timeWake: '06:00', quality: '4', notes: 'Felt refreshed.' },
];

const qualityMap = { '5': '⭐⭐⭐⭐⭐ Excellent', '4': '⭐⭐⭐⭐ Good', '3': '⭐⭐⭐ Fair', '2': '⭐⭐ Poor', '1': '⭐ Very Poor'};
const qualityStars = { '5': '⭐⭐⭐⭐⭐', '4': '⭐⭐⭐⭐', '3': '⭐⭐⭐', '2': '⭐⭐', '1': '⭐'};

const SleepLog = () => {
    const [sleepLogs, setSleepLogs] = useState(initialSleepLogs);
    const [sleepDate, setSleepDate] = useState(getTodayDateString());
    const [timeBed, setTimeBed] = useState('');
    const [timeWake, setTimeWake] = useState('');
    const [sleepQuality, setSleepQuality] = useState('');
    const [sleepNotes, setSleepNotes] = useState('');

    const calculateDuration = (start, end) => {
        if (!start || !end) return null;
        try {
            // Assume times are on the same day or wake time is next day
            let dateStart = new Date(`1970-01-01T${start}:00`);
            let dateEnd = new Date(`1970-01-01T${end}:00`);

            // If end time is earlier than start time, assume it's the next day
            if (dateEnd < dateStart) {
                dateEnd.setDate(dateEnd.getDate() + 1);
            }

            const diffMillis = dateEnd - dateStart;
            if (diffMillis < 0) return null; // Invalid calculation

            const hours = Math.floor(diffMillis / (1000 * 60 * 60));
            const minutes = Math.floor((diffMillis % (1000 * 60 * 60)) / (1000 * 60));
            return `${hours}h ${minutes}m`;
        } catch (e) {
            console.error("Error calculating duration:", e);
            return null;
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const duration = calculateDuration(timeBed, timeWake);
        const formattedDate = new Date(sleepDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); // Format the date nicely
        const summary = `${duration ? `${duration} - ` : ''}${qualityStars[sleepQuality] || ''} ${qualityMap[sleepQuality] || 'N/A'}. ${sleepNotes || ''}`.trim();

        const newLog = {
            id: Date.now(), // Simple unique ID
            date: formattedDate,
            summary: summary,
            // Store raw data for potential editing
            rawDate: sleepDate,
            timeBed,
            timeWake,
            quality: sleepQuality,
            notes: sleepNotes,
        };

        setSleepLogs(prevLogs => [newLog, ...prevLogs]); // Add to the beginning of the list
        console.log('Sleep Form Submitted (Simulated):', newLog);
        alert('Sleep entry saved successfully! (Simulated)');

        // Reset form
        setSleepDate(getTodayDateString());
        setTimeBed('');
        setTimeWake('');
        setSleepQuality('');
        setSleepNotes('');
    };

    const handleDelete = (idToDelete) => {
         if (window.confirm('Are you sure you want to delete this sleep entry?')) {
            setSleepLogs(prevLogs => prevLogs.filter(log => log.id !== idToDelete));
            console.log(`Deleting sleep entry ${idToDelete} (simulated)`);
         }
    };

    const handleEdit = (idToEdit) => {
        console.log(`Edit sleep entry ${idToEdit} (simulated)`);
        alert('Edit functionality not implemented yet.');
        // Future: Find log by id, populate form, change form mode to "edit"
    };

    return (
        <div id="sleep-log-content" className="page-section active-section">
            <div className="page-header">
                <h1>Sleep Log</h1>
            </div>
            <div className="page-content">
                <Card className="sleep-entry-form" id="add-sleep-entry">
                    <h2>Add New Sleep Entry</h2>
                    <form id="sleepForm" onSubmit={handleSubmit}>
                         <div className="form-group">
                            <label htmlFor="sleep-date"><i className="icon-placeholder icon-calendar"></i> Date of Waking Up</label>
                            <input type="date" id="sleep-date" name="sleep-date" value={sleepDate} onChange={e => setSleepDate(e.target.value)} required />
                        </div>
                         <div className="inline-form-group">
                            <div className="form-group">
                                <label htmlFor="time-bed"><i className="icon-placeholder icon-clock"></i> Time Went to Bed</label>
                                <input type="time" id="time-bed" name="time-bed" value={timeBed} onChange={e => setTimeBed(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="time-wake"><i className="icon-placeholder icon-clock"></i> Time Woke Up</label>
                                <input type="time" id="time-wake" name="time-wake" value={timeWake} onChange={e => setTimeWake(e.target.value)} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="sleep-quality"><i className="icon-placeholder icon-star"></i> Sleep Quality</label>
                            <select id="sleep-quality" name="sleep-quality" value={sleepQuality} onChange={e => setSleepQuality(e.target.value)} required>
                                <option value="" disabled>Select quality...</option>
                                <option value="5">{qualityMap['5']}</option>
                                <option value="4">{qualityMap['4']}</option>
                                <option value="3">{qualityMap['3']}</option>
                                <option value="2">{qualityMap['2']}</option>
                                <option value="1">{qualityMap['1']}</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="sleep-notes"><i className="icon-placeholder icon-journal"></i> Notes (Optional)</label>
                            <textarea id="sleep-notes" name="sleep-notes" placeholder="Any dreams, disruptions, or feelings upon waking?" value={sleepNotes} onChange={e => setSleepNotes(e.target.value)}></textarea>
                        </div>
                        <button type="submit" className="form-button"><i className="icon-placeholder icon-save"></i> Save Sleep Entry</button>
                    </form>
                </Card>

                <Card className="sleep-log-history">
                    <h2>Sleep History</h2>
                    <ul className="log-list" id="sleepLogList">
                        {sleepLogs.map(log => (
                            <LogItem
                                key={log.id}
                                id={log.id}
                                date={log.date}
                                summary={log.summary}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                                type="sleep" // Pass type for specific actions/styling if needed
                            />
                        ))}
                         {sleepLogs.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '20px' }}>No sleep logs yet.</p>}
                    </ul>
                </Card>
            </div>
        </div>
    );
};

export default SleepLog;