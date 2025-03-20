import { useState } from "react";
import axios from "axios";
import api from "../api";
import { useSelector } from "react-redux";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";


const SetNotification = () => {
  const [type, setType] = useState("");
  const [time, setTime] = useState("");

  const user = useSelector((store) => store.User);
  const userId = user.user.id;

  const saveNotification = async () => {
    try {
      await axios.post(api.SET_NOTIFICATION, { userId, type, time });
      toast.success("Notification successfully created.");
    } catch (error) {
      console.error("Error scheduling notification:", error);
      alert("Failed to schedule notification!");
    }
  };

  return (
    <div
      className="notification-container"
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        padding: 25,
        alignItems: "center",
        height: "100vh",
         // Light Orange Theme
      }}
    >
      <ToastContainer/>
      <Card
        sx={{
          width: "400px",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          transition: "0.3s ease-in-out",
        }}
      >
        <CardContent>
          <Typography 
            variant="h5" 
            align="center" 
            gutterBottom 
            style={{ fontWeight: "bold", color: "#F57F17" }} // Orange Text
          >
            Schedule a Notification
          </Typography>

          <TextField
            fullWidth
            label="Notification Type"
            variant="outlined"
            value={type}
            onChange={(e) => setType(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            type="datetime-local"
            variant="outlined"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={saveNotification}
            sx={{
              marginTop: "15px",
              padding: "10px",
              background: "linear-gradient(135deg, #F57F17, #FF6F00)", // Orange Gradient
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "10px",
              transition: "0.3s",
              "&:hover": {
                background: "linear-gradient(135deg, #FFA726, #F57C00)", // Light Orange Hover
              },
            }}
          >
            Save Notification
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetNotification;
