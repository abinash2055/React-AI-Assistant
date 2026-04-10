import React, { createContext, useState } from 'react';
import run from '../gemini';

export const datacontext = createContext();

function UserContext({ children }) {
  const [speaking, setSpeaking] = useState(false);
  const [prompt, setPrompt] = useState('Click mic to speak...');
  const [response, setResponse] = useState(false);

  // Speak function
  function speak(text) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.volume = 1;
    utter.rate = 1;
    utter.pitch = 1;
    utter.lang = 'en-US';
    window.speechSynthesis.speak(utter);
  }

  // AI response
  async function aiResponse(text) {
    try {
      let result = await run(text);

      let cleanText = result
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/google/gi, 'Abinash Nath Pandey');

      setPrompt(cleanText);
      speak(cleanText);
      setResponse(true);

      setTimeout(() => setSpeaking(false), 4000);
    } catch (error) {
      speak("Sorry, I couldn't process that.");
      setSpeaking(false);
    }
  }

  // Speech Recognition Setup
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition = null;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (e) => {
      let transcript = e.results[0][0].transcript;
      setPrompt(transcript);
      takeCommand(transcript.toLowerCase());
    };
  }

  // Command Handler
  function takeCommand(command) {
    command = command.toLowerCase();

    // NEW: Creator identity response
    if (
      command.includes('who created you') ||
      command.includes('who invented you') ||
      command.includes('who made you')
    ) {
      const msg = 'I am created by Abinash Nath Pandey';
      setPrompt(msg);
      speak(msg);
      setResponse(true);
      setTimeout(() => setSpeaking(false), 4000);
      return;
    }

    // OPEN APPS
    if (command.includes('open youtube')) {
      window.open('https://youtube.com', '_blank');
      speak('Opening YouTube');
    } else if (command.includes('open google')) {
      window.open('https://google.com', '_blank');
      speak('Opening Google');
    } else if (command.includes('open instagram')) {
      window.open('https://instagram.com', '_blank');
      speak('Opening Instagram');
    } else if (command.includes('open facebook')) {
      window.open('https://facebook.com', '_blank');
      speak('Opening Facebook');
    }
    // TIME
    else if (command.includes('time')) {
      let time = new Date().toLocaleTimeString();
      setPrompt(time);
      speak(time);
    }
    // DATE
    else if (command.includes('date')) {
      let date = new Date().toLocaleDateString();
      setPrompt(date);
      speak(date);
    }
    // GOOGLE SEARCH
    else {
      const searchQuery = command.replace('search', '').trim();

      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`,
        '_blank',
      );

      speak(`Searching Google for ${searchQuery}`);
    }

    setResponse(true);
    setTimeout(() => setSpeaking(false), 4000);
  }

  const value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse,
  };

  return <datacontext.Provider value={value}>{children}</datacontext.Provider>;
}

export default UserContext;
