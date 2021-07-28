import React from 'react';
import { useSelector } from 'react-redux';
import './Mood.css';
import { selectMood } from './moodSlice';

export function MoodTracker() {


    const mood = useSelector(selectMood);


    return (
        <div className="MoodTracker">
            {/* <p><span id="step">step 1.</span> complete daily check-ins to track your emotions</p>
            <p id="question">how are you feeling today?</p>
            <select onChange={handleMoodSelect}>
                <option value="select mood">select</option>
                {emotions.map((emotion) => <option key={emotion.label} value={emotion.value}>{emotion.label}</option>)}
            </select> */}
            <div className="logContainer">
            {mood.map((eachMood, i) => <div className="moodLog" key={i}>
                                            <p id="moodTime" key={eachMood.date}>Your check in on {eachMood.date}:</p>
                                            <p id="moodHist" key={eachMood.name}>{eachMood.mood.map((txt, i) => <span key={i} id="moods">{txt}<br></br></span>)}</p>
                                            <p id="showDetails">{eachMood.details}</p>
                                       </div>
                     )
            }
            </div>            
        </div>
    )
}

