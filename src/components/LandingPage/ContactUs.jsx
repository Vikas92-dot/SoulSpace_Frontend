import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import axios from "axios";
import api from "../api";
import { toast, ToastContainer } from "react-toastify";


const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    // Validation
    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email.");
      return;
    }
    if (!subject.trim()) {
      toast.error("Subject is required.");
      return;
    }
    if (!message.trim()) {
      toast.error("Message cannot be empty.");
      return;
    }

    try {
      await axios.post(api.FILL_FORM, { name, email, subject, message });
      toast.success("Form submitted successfully.");
      
      // Clear the form after successful submission
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Container sx={{ marginTop: 5, minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(180deg, #FFFBCC 0%,rgb(242, 205, 240) 50%)", padding: 4 }}>
      <ToastContainer autoClose={3000} /> 
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 3, textAlign: "center", maxWidth: "600px", width: "100%" }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Have questions or feedback? Feel free to reach out to us. We’d love to hear from you!
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" fullWidth required />
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" variant="outlined" fullWidth required />
          <TextField label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} variant="outlined" fullWidth required />
          <TextField label="Message" value={message} onChange={(e) => setMessage(e.target.value)} multiline rows={4} variant="outlined" fullWidth required />

          <Button type="submit" variant="contained" color="warning" sx={{ mt: 2, fontWeight: "bold" }}>
            Send Message
          </Button>
        </Box>
      </Paper>

      <Typography variant="body2" color="text.secondary" mt={3} textAlign="center">
        By contacting us, you agree to our <a href="/privacy-policy" style={{ color: "#FF5722", fontWeight: "bold" }}>Privacy Policy</a>. We respect your privacy and will never share your information without your consent.
      </Typography>
    </Container>
  );
};

export default ContactUs;
