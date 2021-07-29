import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './strategies.css';
import { updateStress, updateAnxiety, selectStrategy } from './strategiesSlice';
import { selectBtnColor, toggleStressColor, toggleAnxietyColor } from './btnColorSlice';
import { stressStrategies, anxietyStrategies } from '../../data/strategiesReference';
import ReactGA from 'react-ga';

export function Strategies() {
    const dispatch = useDispatch();

    const strategies = useSelector(selectStrategy);
    const btnColor = useSelector(selectBtnColor);

    const stressToggle = (value) => {
        if (value) {
            return {stress: false};
        } else {
            return {stress: true}
        }
    }

    const stressColorToggle = (value) => {
        if (value) {
            return {stress: false};
        } else {
            return {stress: true}
        }
    }

    const anxietyToggle = (value) => {
        if (value) {
            return {anxiety: false};
        } else {
            return {anxiety: true}
        }
    }

    const anxietyColorToggle = (value) => {
        if (value) {
            return {anxiety: false};
        } else {
            return {anxiety: true}
        }
    }

    const handleStressSelect = () => {
        dispatch(updateStress(stressToggle(strategies[0].stress)));

        dispatch(toggleStressColor(stressColorToggle(btnColor[0].stress)))

        ReactGA.event({
            category: 'Strategies',
            action: 'User viewed stress strategies'
        });

    }

    const handleAnxietySelect = () => {
        dispatch(updateAnxiety(anxietyToggle(strategies[1].anxiety)));

        dispatch(toggleAnxietyColor(anxietyColorToggle(btnColor[1].anxiety)))

        ReactGA.event({
            category: 'Strategies',
            action: 'User viewed anxiety strategies'
        });

    }

    const handleLinkClick = (event) => {
        const linkName = event.target.id;

        ReactGA.event({
            category: 'Strategies',
            action: `User viewed the strategy link for ${linkName}`
        });

    }

    let btnClassStress = btnColor[0].stress ? "blueTopic" : "whiteTopic";
    let btnClassAnxiety = btnColor[1].anxiety ? "blueTopic" : "whiteTopic";

    const showStressStrategies = () => {
        if (strategies[0].stress) {
            return (
                stressStrategies.map((strategy, i) => <div className="stressStrats" key={i}>
                                                            <a href={strategy.instructions} target="_blank" rel="noopener noreferrer" id={strategy.name} key={strategy.name} onClick={handleLinkClick}>{strategy.name}</a>
                                                         </div>
                     )
            )
        } else {
            return;
        }
    }

    const showAnxietyStrategies = () => {
        if (strategies[1].anxiety) {
            return (
                anxietyStrategies.map((strategy, i) => <div className="anxietyStrats" key={i}>
                                                            <a href={strategy.instructions} target="_blank" rel="noopener noreferrer" id={strategy.name} key={strategy.name} onClick={handleLinkClick}>{strategy.name}</a>
                                                         </div>
                     )
            )
        } else {
            return;
        }
    }
    

    return (
        <div className="Strategies">
            <p><span id="step">part 2.</span> discover potential coping strategies <span id="newTab">(click on a topic below!)</span></p>
            <div className="topicSelect">
                    <button id="stress" className={btnClassStress} onClick={handleStressSelect}>stress</button>
                    <div id="stratCards">
                        {showStressStrategies()}
                    </div>
                    <button id="anxiety" className={btnClassAnxiety} onClick={handleAnxietySelect}>anxiety</button>
                    <div id="stratCards">
                        {showAnxietyStrategies()}
                    </div>
            </div>            
        </div>
    )
}