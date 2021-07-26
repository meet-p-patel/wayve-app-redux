import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Mood.css';
import { addMood, selectMood } from './moodSlice';
import ReactGA from 'react-ga';

export function MoodTracker() {
    const dispatch = useDispatch();

    const emotions = [
        {value: "excited", label: "😃 excited"},
        {value: "confused", label: "🤔 confused"},
        {value: "sad", label: "😔 sad"},
        {value: "overwhelmed", label: "😩 overwhelmed"},
        {value: "nervous", label: "😰 nervous"},
        {value: "angry", label: "😠 angry"},
        {value: "tired", label: "😴 tired"}
    ]

    const hourConverter = (n) => {
        if (n > 12) {
            return n - 12;
        } else {
            return n;
        }
    }

    const secondConverter = (n) => {
        if (n < 10) {
            return `0${n}`;
        } else {
            return n;
        }
    }

    let handleMoodSelect = (e) => {
        let currentDate = new Date();
        dispatch(addMood({date: `${(currentDate.getMonth())+1}-${currentDate.getDate()}-${currentDate.getFullYear()} at ${hourConverter((currentDate.getHours()))}:${secondConverter(currentDate.getMinutes())}:${secondConverter(currentDate.getSeconds())}`,
                          mood: e.target.value
        }));

        ReactGA.event({
            category: 'MoodLog',
            action: 'User logged a mood'
        })
    }

    const mood = useSelector(selectMood);

    return (
        <div className="MoodTracker">
            <p><span id="step">step 1.</span> complete daily check-ins to track your emotions</p>
            <p id="question">how are you feeling today? (select one)</p>
            <select onChange={handleMoodSelect}>
                <option value="select mood">select</option>
                {emotions.map((emotion) => <option key={emotion.label} value={emotion.value}>{emotion.label}</option>)}
            </select>
            <div className="logContainer">
            {mood.map((eachMood, i) => <div className="moodLog" key={i}>
                                            <p id="moodTime" key={eachMood.date}>Your check in on {eachMood.date}:</p>
                                            <p id="moodHist" key={eachMood.name}>You were feeling {eachMood.mood}</p>
                                         </div>
                     )
            }
            </div>            
        </div>
    )
}

