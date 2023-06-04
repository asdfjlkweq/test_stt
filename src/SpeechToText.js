import React, { useState, useEffect } from "react";

const SpeechToText = () => {
  const [transcripts, setTranscripts] = useState([]);

  useEffect(() => {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new window.SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener("result", (e) => {
      let transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

      if (e.results[0].isFinal) {
        setTranscripts((prevTranscripts) => [...prevTranscripts, transcript]);
        setTimeout(() => {
          setTranscripts((prevTranscripts) =>
            prevTranscripts.filter((t) => t !== transcript)
          );
        }, 5000);
      }
    });

    recognition.addEventListener("end", recognition.start);

    recognition.start();

    return () => {
      recognition.removeEventListener("end", recognition.start);
      recognition.stop();
    };
  }, []);

  return (
    <div>
      {transcripts.map((transcript, index) => (
        <p key={index}>{transcript}</p>
      ))}
    </div>
  );
};

export default SpeechToText;
