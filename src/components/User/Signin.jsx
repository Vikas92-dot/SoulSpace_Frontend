import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import api from "../api";
import { setUser } from "../redux-config/UserSlice";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Signin = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! What's your email?" },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    if (step === 1) {
      setUserData({ ...userData, email: input });
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Great! Now enter your password." },
      ]);
      setStep(2);
    } else if (step === 2) {
      setUserData({ ...userData, password: input });
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Logging you in..." },
      ]);

      try {
        const response = await axios.post(api.USER_LOGIN, {
          email: userData.email,
          password: input,
        });
        dispatch(setUser(response.data));
        toast.success("Login successful!");
        navigate("/UserDashboard");
      } catch (err) {
        setMessages([
          ...newMessages,
          { sender: "bot", text: "Invalid credentials. Try again." },
        ]);
        toast.error("Invalid User");
        setStep(1);
      }
    }
    setInput("");
  };

  return (
    <Box
      sx={
        {
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom, #FFF8E1, #FFD54F)",
        }
      }
    >
      <ToastContainer />
      <Container maxWidth="sm">
        <Paper elevation={5} sx={{ p: 3, borderRadius: 3, textAlign: "center", backgroundColor: "#FFF" }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#F57F17" }}>
            SoulSpace Login
          </Typography>
          <Box
            sx={{
              height: 300,
              overflowY: "auto",
              border: "1px solid #ddd",
              borderRadius: 2,
              p: 2,
              backgroundColor: "#FFECB3",
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: msg.sender === "bot" ? "flex-start" : "flex-end",
                  mb: 1,
                }}
              >
                <Typography
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    maxWidth: "75%",
                    backgroundColor: msg.sender === "bot" ? "#FFF" : "#FFD54F",
                    color: "#000000",
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", mt: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Type your response..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button variant="contained" sx={{ ml: 1, bgcolor: "#FFA000" }} onClick={handleSend}>
              <SendIcon />
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signin;
