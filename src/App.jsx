import React, { useContext } from 'react';
import './App.css';
import va from './assets/ai.png';
import { CiMicrophoneOn } from 'react-icons/ci';
import { datacontext } from './context/UserContext';
import speakimg from './assets/speak.gif';
import aigif from './assets/aiVoice.gif';

function App() {
  let {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse,
  } = useContext(datacontext);

  return (
    <div className="main">
      <img src={va} alt="robot" id="shifra" />
      <span>Hi, I'm Shifra, Your Advance Virtual Assistant</span>

      {!speaking ? (
        <button
          onClick={() => {
            setPrompt('Listening...');
            setSpeaking(true);
            setResponse(false);
            recognition.start();
          }}
        >
          Click Here <CiMicrophoneOn />
        </button>
      ) : (
        <div className="response">
          {!response ? (
            <img src={speakimg} alt="" id="speak" />
          ) : (
            <img src={aigif} alt="" id="aigif" />
          )}

          <p>{prompt}</p>
        </div>
      )}
    </div>
  );
}

export default App;
