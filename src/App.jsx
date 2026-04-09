import React, { useContext } from 'react';
import './App.css';
import va from './assets/ai.png';
import { CiMicrophoneOn } from 'react-icons/ci';
import { datacontext } from './context/UserContext';

function App() {
  let { speak } = useContext(datacontext);
  return (
    <div className="main">
      <img src={va} alt="robot" id="shifra" />
      <span>Hi, I'm Shifra, Your Advance Virtual Assistant</span>
      <button
        onClick={() => {
          speak('Hello Abinash');
        }}
      >
        Click Here <CiMicrophoneOn />
      </button>
    </div>
  );
}

export default App;
