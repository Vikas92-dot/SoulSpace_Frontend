import { useState } from "react";
import axios from "axios";
import api from "../api";
import { useSelector } from "react-redux";

const SetNotification = () => {
  const [type, setType] = useState("");
  const [time, setTime] = useState("");

  const user = useSelector((store)=>store.User);
  const userId = user.user.id;

  const saveNotification = async () => {
    try {
      await axios.post(api.SET_NOTIFICATION, {
        userId,
        type,
        time,
      });

      alert("Notification scheduled!");
    } catch (error) {
      console.error("Error scheduling notification:", error);
      alert("Failed to schedule notification!");
    }
  };

  return (
    <div>
      <h2>Schedule a Notification</h2>
      <input
        type="text"
        placeholder="Notification Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <input
        type="datetime-local"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button onClick={saveNotification}>Save</button>
    </div>
  );
};

export default SetNotification;
