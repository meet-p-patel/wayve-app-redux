import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { addMood } from './moodSlice';
import './CheckBox.css';
import ReactGA from 'react-ga';

export function CheckBox() {
    const dispatch = useDispatch();

    const emotions = [
        {value: "excited", label: "😃 excited"},
        {value: "confused", label: "🤔 confused"},
        {value: "sad", label: "😔 sad"},
        {value: "overwhelmed", label: "😩 overwhelmed"},
        {value: "nervous", label: "😰 nervous"},
        {value: "angry", label: "😠 angry"},
        {value: "tired", label: "😴 tired"},
        {value: "happy", label: "😊 happy"}
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

    const initialDetailsState = {
        details: ''
    };

    const [detailsState, setDetailsState] = useState(initialDetailsState);
    const [checkedState, setCheckedState] = useState([]);
    const [errorMessage, setErrorMessage] = useState();

    const submitForm = (e) => {
        
        let currentDate = new Date();

        if (checkedState.length > 0) {
            dispatch(addMood({date: `${(currentDate.getMonth())+1}-${currentDate.getDate()}-${currentDate.getFullYear()} at ${hourConverter((currentDate.getHours()))}:${secondConverter(currentDate.getMinutes())}:${secondConverter(currentDate.getSeconds())}`,
                            mood: checkedState,
                            details: detailsState.details
            }));

            ReactGA.event({
                category: 'Mood',
                action: 'User logged a mood'
            });

        } else {
            e.preventDefault();
            setErrorMessage({
                text: 'Please select at least one option'
            })
        }
    }

    const updateDetailsControl = (event) => {
        const { id, value } = event.target;
        const detailsKey = id;
        const updatedDetailsState = { ...detailsState };
        updatedDetailsState[detailsKey] = value;
        setDetailsState(updatedDetailsState);
    }

    const handleCheckboxSelect = (event) => {
        const emotions = [];
        emotions.push(...checkedState, event.target.value)
        setCheckedState(emotions);
    }

    return (
        <div className="CheckBox">
            <p><span id="step">part 1.</span> complete daily check-ins to track your emotions</p>
            <p id="question">how are you feeling today?</p>
            <form onSubmit={submitForm}>
                {emotions.map((emotion, i) => <div key={i} id="emotions-map"><input type="checkbox" id={emotion.value} name={emotion.value} value={emotion.value} onChange={handleCheckboxSelect}/><label id="checkbox-tags">{emotion.label}</label></div>)}
                <label htmlFor="descrip">would you like to provide details?</label>
                <textarea onChange={updateDetailsControl} type="text" id="details" value={detailsState.details} placeholder=" details"></textarea>
                <button className="SubmitButton">Submit</button>
            </form>
            {errorMessage && <p className="ErrorMessage">{errorMessage.text}</p>}
        </div>
    )
}