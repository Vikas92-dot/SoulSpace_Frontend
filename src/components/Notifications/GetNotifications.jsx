import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api";

const GetNotifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${api.GET_NOTIFICATION}/${userId}`);
        setNotifications(res.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  return (
    <div>
      <h2>Your Notifications</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((n) => (
            <li key={n.id}>
              {n.type} at {new Date(n.time).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications set.</p>
      )}
    </div>
  );
};

export default GetNotifications;
