import React, { createContext, useState } from 'react';
import run from '../gemini';

export const datacontext = createContext();

function UserContext({ children }) {
  let [speaking, setSpeaking] = useState(false);
  let [prompt, setPrompt] = useState('listening...');
  let [response, setResponse] = useState(false);

  // Speak Function
  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = 'hi-GB';
    window.speechSynthesis.speak(text_speak);
  }

  // AI Response
  async function aiResponse(prompt) {
    let text = await run(prompt);
    let newText =
      text.split('**') &&
      text.split('*') &&
      text.replace('google', 'Abinash Nath Pandey') &&
      text.replace('Google', 'Abinash Nath Pandey');
    setPrompt(newText);
    speak(newText);
    setResponse(true);
    setTimeout(() => {
      setSpeaking(false);
    }, 5000);
  }

  // Setup SpeechRecognition
  let speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition = new speechRecognition();
  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript;
    setPrompt(transcript);
    takeCommand(transcript.toLowerCase());
  };

  // Take Command
  function takeCommand(command) {
    if (command.includes('open') && command.includes('youtube')) {
      window.open('https://www.youtube.com/', '_blank');
      speak('openning Youtube');
      setResponse(true);
      setPrompt('openning Youtube...');
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes('open') && command.includes('google')) {
      window.open('https://www.google.com/', '_blank');
      speak('openning Google');
      setResponse(true);
      setPrompt('openning Google...');
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes('open') && command.includes('Google')) {
      window.open('https://www.google.com/', '_blank');
      speak('openning Google');
      setResponse(true);
      setPrompt('openning Google...');
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes('open') && command.includes('instagram')) {
      window.open('https://www.instagram.com/', '_blank');
      speak('openning Instagram');
      setResponse(true);
      setPrompt('openning Instagram...');
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes('open') && command.includes('Instagram')) {
      window.open('https://www.instagram.com/', '_blank');
      speak('openning Instagram');
      setResponse(true);
      setPrompt('openning Instagram...');
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes('open') && command.includes('facebook')) {
      window.open('https://www.facebook.com/', '_blank');
      speak('openning Facebook');
      setResponse(true);
      setPrompt('openning Facebook...');
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes('open') && command.includes('Facebook')) {
      window.open('https://www.facebook.com/', '_blank');
      speak('openning Facebook');
      setResponse(true);
      setPrompt('openning Facebook...');
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes('time')) {
      let time = new Date().toLocaleDateString(undefined, {
        hour: 'numeric',
        minute: 'numeric',
      });
      speak(time);
      setResponse(true);
      setPrompt(time);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes('date')) {
      let date = new Date().toLocaleString(undefined, {
        day: 'numeric',
        month: 'short',
      });
      speak(date);
      setResponse(true);
      setPrompt(date);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else {
      aiResponse(command);
    }
  }

  let value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
  };
  return (
    <div>
      <datacontext.Provider value={value}>{children}</datacontext.Provider>
    </div>
  );
}

export default UserContext;
