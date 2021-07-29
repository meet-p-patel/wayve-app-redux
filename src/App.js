import React, { useEffect } from 'react';
import { MoodTracker } from './features/MoodTracking/Mood';
import { Strategies } from './features/SuggestStrategies/strategies';
import { Social } from './features/Social/Social';
import { Feedback } from './features/Feedback/Feedback';
import './App.css';
import ReactGA from 'react-ga';
import { CheckBox } from './features/MoodTracking/CheckBox';

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

    window.location.reload(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>hi there!</h1>
        <h2>welcome to wayve</h2>
        <p id="intro">
          we want to build a product to help you better manage your mental well-being! to start, our goal is to help you recognize emotional patterns and learn coping skills to manage daily stress and anxiety.  before we create and launch our app, we want to gather feedback and test features you might like.  take a look at our mood tracking feature below and let us know what else you'd like to use!
        </p>
      </header>
      <CheckBox />
      <MoodTracker />
      <button id="clear" type="button" onClick={handleButtonClick}>Clear your mood history</button>
      <Strategies />
      <Social />
      <Feedback />
    </div>
  );
}

export default App;
