import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import api from "../api";
import { setAdmin } from "../redux-config/AdminSlice";
import {Container,Paper,TextField,Button,Typography,Box} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const AdminLogin = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! What's your email?" },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(1);
  const [adminData, setAdminData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSend = async () => {
    if (!input.trim()) return;
  
    const newMessages = [...messages, { sender: "admin", text: input }];
    setMessages(newMessages);
  
    if (step === 1) {
      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!emailRegex.test(input)) {
        setMessages([
          ...newMessages,
          { sender: "bot", text: "Please enter a valid email ID." },
        ]);
        toast.error("Incorrect email id");
        setStep(1);
        return; 
      }
  
      setAdminData({ ...adminData, email: input });
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Great! Now enter your password." },
      ]);
      setStep(2);
    } else if (step === 2) {
      setAdminData({ ...adminData, password: input });
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Logging you in..." },
      ]);
  
      try {
        const response = await axios.post(api.ADMIN_LOGIN, {
          email: adminData.email,
          password: input,
        });
        dispatch(setAdmin(response.data));
        toast.success("Login successful!");

        setTimeout(() => {
          navigate("/adminDashboard");
        }, 2000);
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
          background: "linear-gradient(to bottom,rgb(225, 225, 255),rgb(79, 97, 255))",
        }
      }
    >
      <ToastContainer />
      <Container maxWidth="sm">
        <Paper elevation={5} sx={{ p: 3, borderRadius: 3, textAlign: "center", backgroundColor: "#FFF" }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "rgb(79, 97, 255)" }}>
            Admin Login
          </Typography>
          <Box
            sx={{
              height: 300,
              overflowY: "auto",
              border: "1px solid #ddd",
              borderRadius: 2,
              p: 2,
              backgroundColor: "rgb(175, 180, 220)",
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
                    backgroundColor: msg.sender === "bot" ? "#FFF" : "#FFF",
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
            <Button variant="contained" sx={{ ml: 1, bgcolor: "rgb(79, 97, 255)" }} onClick={handleSend}>
              <SendIcon />
            </Button>
          </Box>               
                                                      
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLogin;
