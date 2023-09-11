import React from 'react';
import 'regenerator-runtime';
import speech, { useSpeechRecognition } from 'react-speech-recognition';
// import { apiKey } from './config';
import { useEffect, useState } from 'react';

function App() {
  const { listening, transcript } = useSpeechRecognition();
  const [thinking, setThinking] = useState(false);

  async function callGpt3API(message) {
    const data = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          sk - Q4ENt4UkU959UFtZx6SXT3BlbkFJhB6aUvOVnz3OwTAEX6bf
        }`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
        model: 'gpt-3.5-turbo',
      }),
    }).then((res) => res.json());

    return data.choices[0].message.content;
  }

  useEffect(() => {
    if (!listening && transcript) {
      callGpt3API(transcript).then((response) => {
        const speechSynthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(response);
        speechSynthesis.speak(utterance);
      });
    }
  }, [transcript, listening]);
  return (
    <>
      {listening ? (
        <p>Go ahead I am listening</p>
      ) : (
        <p>Click the button and ask me anything</p>
      )}
      <button
        onClick={() => {
          speech.startListening();
        }}
      >
        Ask me anything
      </button>
      {transcript && <div>{transcript}</div>}
    </>
  );
}

export default App;
