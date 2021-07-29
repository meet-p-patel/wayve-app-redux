import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { addMood } from './moodSlice';
import './CheckBox.css';
import ReactGA from 'react-ga';
import { emotions_data } from '../../data/emotions';

export function CheckBox() {
    const dispatch = useDispatch();

    const emotions = emotions_data;

    const hourConverter = (n) => {
        if (n > 12) {
            return n - 12;
        } else {
            return n;
        }
    };

    const secondConverter = (n) => {
        if (n < 10) {
            return `0${n}`;
        } else {
            return n;
        }
    };

    const initialDetailsState = {
        details: ''
    };

    const [detailsState, setDetailsState] = useState(initialDetailsState);
    const [checkedState, setCheckedState] = useState({
        emotions: emotions,
        selected: []
    });
    const [errorMessage, setErrorMessage] = useState();

    const submitForm = (e) => {
        
        let currentDate = new Date();

        if (checkedState.selected.length > 0) {
            dispatch(addMood({date: `${(currentDate.getMonth())+1}-${currentDate.getDate()}-${currentDate.getFullYear()} at ${hourConverter((currentDate.getHours()))}:${secondConverter(currentDate.getMinutes())}:${secondConverter(currentDate.getSeconds())}`,
                            mood: checkedState.selected,
                            details: detailsState.details
            }));

            ReactGA.event({
                category: 'Mood',
                action: 'User logged a mood'
            });

        } else {
            e.preventDefault();
            setErrorMessage({
                text: 'please select at least one option!'
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

    function onChange(value) {
        let selected = checkedState.selected
        let find = selected.indexOf(value)
      
        if(find > -1) {
          selected.splice(find, 1)
        } else {
          selected.push(value)
        }

        let temp = {
            emotions: emotions,
            selected: selected
        }
      
        setCheckedState(temp)
      }

    return (
        <div className="CheckBox">
            <p><span id="step">part 1.</span> complete daily check-ins to track your emotions</p>
            <p id="question">how are you feeling today? (select one or more)</p>
            <form onSubmit={submitForm}>
                {checkedState.emotions.map((item) =>
                    <div key={item.id} id="emotions-map">
                    <label key={ item.id }>
                                <input type="checkbox" 
                                onChange={() => onChange(item.value)} 
                                selected={ checkedState.selected.includes(item.id) }
                                ></input>
                                <span id="checkbox-tags">{ item.label }</span>
                    </label>
                    </div> 
                )
                }
                <label htmlFor="descrip">would you like to provide details?</label>
                <textarea onChange={updateDetailsControl} type="text" id="details" value={detailsState.details} placeholder=" details"></textarea>
                <button className="SubmitButton">Submit</button>
            </form>
            {errorMessage && <p id="errorMessage">{errorMessage.text}</p>}
        </div>
    )
}