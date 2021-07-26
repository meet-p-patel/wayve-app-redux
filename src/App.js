import React, { useEffect } from 'react';
import { MoodTracker } from './features/MoodTracking/Mood';
import { Strategies } from './features/SuggestStrategies/strategies';
import { Social } from './features/Social/Social';
import { Feedback } from './features/Feedback/Feedback';
import './App.css';
import ReactGA from 'react-ga';

function App() {

  useEffect(() => {
    ReactGA.initialize('UA-187817103-2');

    // to report page view
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])

  const clearAll = () => {
    return localStorage.clear()
  }

  const handleButtonClick = () => {
    clearAll();

    ReactGA.event({
      category: 'MoodLog',
      action: 'User cleared mood log'
    });

    window.location.reload(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>hi there!</h1>
        <h2>welcome to wayve</h2>
        <p id="intro">
          we’re here to help you on your journey to improving your mental well-being! our goal is to help you recognize emotional patterns and learn coping skills to manage daily stress and anxiety
        </p>
      </header>
      <MoodTracker />
      <button id="clear" type="button" onClick={handleButtonClick}>Clear your mood history</button>
      <Strategies />
      <Social />
      <Feedback />
    </div>
  );
}

export default App;
