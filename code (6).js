import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';

// Helper to get date in YYYY-MM-DD format
const getTodayDateString = () => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const adjustedDate = new Date(today.getTime() - (offset*60*1000));
    return adjustedDate.toISOString().split('T')[0];
}

const CheckIn = () => {
    const [checkinDate, setCheckinDate] = useState(getTodayDateString());
    const [mood, setMood] = useState('3'); // Default to 'Okay'
    const [energy, setEnergy] = useState('medium'); // Default to 'Medium'
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [customSymptom, setCustomSymptom] = useState('');
    const [notes, setNotes] = useState('');

    const availableSymptoms = ["Anxious", "Stressed", "Fatigued", "Brain Fog", "Irritable", "Motivated", "Calm", "Focused"];

    const handleMoodClick = (value) => setMood(value);
    const handleEnergyClick = (value) => setEnergy(value);

    const handleSymptomTagClick = (symptom) => {
        setSelectedSymptoms(prev =>
            prev.includes(symptom)
                ? prev.filter(s => s !== symptom)
                : [...prev, symptom]
        );
    };

    const handleAddCustomSymptom = () => {
         if (customSymptom.trim() && !selectedSymptoms.includes(customSymptom.trim()) && !availableSymptoms.includes(customSymptom.trim())) {
             // Ideally, you'd add this to availableSymptoms state too if it should be persistent
             setSelectedSymptoms(prev => [...prev, customSymptom.trim()]);
             setCustomSymptom(''); // Clear input
         } else if (customSymptom.trim()) {
             // If it already exists or is a predefined tag, just select it
             if (!selectedSymptoms.includes(customSymptom.trim())) {
                  setSelectedSymptoms(prev => [...prev, customSymptom.trim()]);
             }
             setCustomSymptom(''); // Clear input
         }
     };

     const handleCustomSymptomKeyDown = (e) => {
         if (e.key === 'Enter') {
             e.preventDefault(); // Prevent form submission on Enter
             handleAddCustomSymptom();
         }
     };

    const handleSubmit = (event) => {
        event.preventDefault();
        const finalSymptoms = selectedSymptoms.join(', ');
        const formData = {
            date: checkinDate,
            mood,
            energy,
            symptoms: finalSymptoms,
            notes,
        };
        console.log('Check-in Form Submitted (Simulated):', formData);
        alert('Check-in saved successfully! (Simulated)');
        // Reset form potentially (optional)
        // setMood('3'); setEnergy('medium'); setSelectedSymptoms([]); setNotes(''); setCheckinDate(getTodayDateString());
    };

    return (
        <div id="check-in-content" className="page-section active-section">
            <div className="page-header">
                <h1>Quick Check-in</h1>
            </div>
            <div className="page-content">
                <Card className="check-in-form">
                    <h2>Log Today's Check-in</h2>
                    <p style={{ marginBottom: '20px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        How are you feeling right now? Take a moment to reflect and log your current state.
                    </p>
                    <form id="checkinForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="checkin-date"><i className="icon-placeholder icon-calendar"></i> Date</label>
                            <input
                                type="date"
                                id="checkin-date"
                                name="checkin-date"
                                value={checkinDate}
                                onChange={(e) => setCheckinDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label><i className="icon-placeholder icon-heart"></i> Overall Mood</label>
                            <div className="mood-selector">
                                <button type="button" onClick={() => handleMoodClick('5')} className={mood === '5' ? 'selected' : ''}>😊 Very Good</button>
                                <button type="button" onClick={() => handleMoodClick('4')} className={mood === '4' ? 'selected' : ''}>🙂 Good</button>
                                <button type="button" onClick={() => handleMoodClick('3')} className={mood === '3' ? 'selected' : ''}>😐 Okay</button>
                                <button type="button" onClick={() => handleMoodClick('2')} className={mood === '2' ? 'selected' : ''}>😕 Bad</button>
                                <button type="button" onClick={() => handleMoodClick('1')} className={mood === '1' ? 'selected' : ''}>😔 Very Bad</button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label><i className="icon-placeholder icon-activity"></i> Energy Level</label>
                            <div className="energy-selector">
                                <button type="button" onClick={() => handleEnergyClick('high')} className={energy === 'high' ? 'selected' : ''}>⚡ High</button>
                                <button type="button" onClick={() => handleEnergyClick('medium')} className={energy === 'medium' ? 'selected' : ''}>⚡ Medium</button>
                                <button type="button" onClick={() => handleEnergyClick('low')} className={energy === 'low' ? 'selected' : ''}>⚡ Low</button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="symptoms"><i className="icon-placeholder icon-list"></i> Key Symptoms/Feelings (Optional)</label>
                            <div className="symptom-tags">
                                {availableSymptoms.map(symptom => (
                                    <span
                                        key={symptom}
                                        className={`tag ${selectedSymptoms.includes(symptom) ? 'selected' : ''}`}
                                        onClick={() => handleSymptomTagClick(symptom)}
                                    >
                                        {symptom}
                                    </span>
                                ))}
                                 {/* Display custom added tags that weren't predefined */}
                                 {selectedSymptoms.filter(s => !availableSymptoms.includes(s)).map(symptom => (
                                     <span
                                         key={symptom}
                                         className="tag selected" // Assume custom ones are always selected when shown here
                                         onClick={() => handleSymptomTagClick(symptom)} // Allow deselect
                                     >
                                         {symptom}
                                     </span>
                                 ))}
                            </div>
                            <input
                                 type="text"
                                 id="custom-symptom"
                                 placeholder="Type a custom symptom/feeling and press Enter..."
                                 style={{ marginTop: '10px', fontSize: '0.9rem' }}
                                 value={customSymptom}
                                 onChange={(e) => setCustomSymptom(e.target.value)}
                                 onKeyDown={handleCustomSymptomKeyDown}
                             />
                        </div>
                        <div className="form-group">
                            <label htmlFor="notes"><i className="icon-placeholder icon-journal"></i> Additional Notes (Optional)</label>
                            <textarea
                                id="notes"
                                name="notes"
                                placeholder="Any specific thoughts, events, or details related to your check-in?"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            ></textarea>
                        </div>
                        <button type="submit" className="form-button">
                            <i className="icon-placeholder icon-save"></i> Save Check-in
                        </button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default CheckIn;