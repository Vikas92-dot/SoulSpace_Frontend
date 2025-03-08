import React from "react";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";

const ContactUs = () => {
  return (
    <Container  sx={{marginTop:5, minHeight: "100vh",width:"100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(180deg, #FFFBCC 0%,rgb(242, 205, 240) 50%)", padding: 4 }}>
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 3, textAlign: "center", maxWidth: "600px", width: "100%" }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Have questions or feedback? Feel free to reach out to us. We’d love to hear from you!
        </Typography>
        
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Name" variant="outlined" fullWidth required />
          <TextField label="Email" type="email" variant="outlined" fullWidth required />
          <TextField label="Subject" variant="outlined" fullWidth required />
          <TextField label="Message" multiline rows={4} variant="outlined" fullWidth required />
          
          <Button variant="contained" color="warning" sx={{ mt: 2, fontWeight: "bold" }}>
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
