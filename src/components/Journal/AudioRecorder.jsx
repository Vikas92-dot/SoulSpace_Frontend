import React, { useState, useRef } from "react";
import axios from "axios";

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcription, setTranscription] = useState("");
  const mediaRecorderRef = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorderRef.current.ondataavailable = (event) => chunks.push(event.data);
    mediaRecorderRef.current.onstop = () => {
      const audioFile = new Blob(chunks, { type: "audio/wav" });
      setAudioBlob(audioFile);
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const uploadAudio = async () => {
    if (!audioBlob) return alert("No audio recorded!");

    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.wav");

    try {
      const response = await axios.post("http://localhost:5000/transcribe", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTranscription(response.data.text);
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  return (
    <div className="p-4 text-center">
      <button onClick={recording ? stopRecording : startRecording} className="bg-blue-500 text-white px-4 py-2 rounded">
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
      <button onClick={uploadAudio} disabled={!audioBlob} className="bg-green-500 text-white px-4 py-2 rounded ml-2">
        Upload & Transcribe
      </button>
      <p className="mt-4">{transcription}</p>
    </div>
  );
};

export default AudioRecorder;
