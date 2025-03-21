import React from "react";
import { Container, Typography, Button, Card, CardContent, List, ListItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  
  return (
    <Container 
      maxWidth="md" 
      style={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        backgroundColor: "#FFF3E0", 
        padding: "20px"
      }}
    >
      {/* Home Button */}
    <Button
        onClick={() => navigate('/')}
        sx={{
          position: "absolute",
          top: 20,
          left: "2%",
          bgcolor: "#F57F17",
          color: "white",
          "&:hover": { bgcolor: "#FFD54F" },
          padding: "10px 20px",
          borderRadius: "12px",
          fontSize: "16px",
        }}
      >
        Home
      </Button>
      <Card 
        style={{ 
          padding: "32px", 
          textAlign: "center", 
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
          borderRadius: "12px",
          backgroundColor: "#FFE0B2"
        }}
      >
        <CardContent>
          <Typography variant="h3" gutterBottom style={{ color: "#D84315", fontWeight: "bold" }}>
            Welcome to SoulSpace
          </Typography>
          <Typography variant="h6" style={{ color: "#6D4C41" }} paragraph>
            Your sanctuary for inner peace and spiritual wellness.
          </Typography>

          <Typography variant="h5" gutterBottom style={{ color: "#BF360C", fontWeight: "bold" }}>
            Our Mission
          </Typography>
          <Typography variant="body1" style={{ color: "#4E342E" }} paragraph>
            At SoulSpace, we aim to help individuals cultivate mindfulness, self-discovery, 
            and emotional well-being through meditation, journaling, and community support.
          </Typography>

          <Typography variant="h5" gutterBottom style={{ color: "#BF360C", fontWeight: "bold" }}>
            What We Offer
          </Typography>
          <List>
            <ListItem style={{ color: "#4E342E" }}>✔ Guided Meditation Sessions</ListItem>
            <ListItem style={{ color: "#4E342E" }}>✔ Journaling & Reflection Tools</ListItem>
            <ListItem style={{ color: "#4E342E" }}>✔ Community Forum for Support & Growth</ListItem>
            <ListItem style={{ color: "#4E342E" }}>✔ Daily Quotes & Affirmations</ListItem>
            <ListItem style={{ color: "#4E342E" }}>✔ Personalized Insights for Mindfulness</ListItem>
          </List>

          <Typography variant="h5" gutterBottom style={{ color: "#BF360C", fontWeight: "bold" }}>
            Why Choose SoulSpace?
          </Typography>
          <List>
            <ListItem style={{ color: "#4E342E" }}>✔ Beautiful, user-friendly experience</ListItem>
            <ListItem style={{ color: "#4E342E" }}>✔ Science-backed and spiritually enriched content</ListItem>
            <ListItem style={{ color: "#4E342E" }}>✔ A supportive and uplifting community</ListItem>
          </List>

          <Typography variant="h6" style={{ color: "#6D4C41", fontWeight: "bold" }} paragraph>
            Join us on this journey toward a more mindful, peaceful, and fulfilling life.
          </Typography>
          <Link to={'/register'}>
          <Button 
            variant="contained" 
            size="large" 
            style={{ backgroundColor: "#E64A19", color: "white", fontWeight: "bold", padding: "10px 24px" }}
            >
            Get Started
          </Button>
            </Link>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AboutUs;
