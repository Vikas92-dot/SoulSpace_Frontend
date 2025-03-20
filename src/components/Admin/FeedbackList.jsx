import React, { useEffect, useState } from "react";
import axios from "axios";
import {Container,TextField,Button,Card,CardContent,Typography,Grid,IconButton,CircularProgress
} from "@mui/material";

import api from "../api";

import SideBarAdmin from "./SideBarAdmin";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const response = await axios.get(api.GET_FEEDBACK);
      console.log(response.data);
      
      setFeedbacks(response.data);
      
    } catch (error) {
      console.error("Error fetching Forum Post:", error);
    } finally {
      setLoading(false);
    }
  };

  
  const filteredFeedback = feedbacks.filter((feedback) =>
    feedback.name.includes(searchName)
  );

  return (
    <div style={{display:"flex"}}>
      <SideBarAdmin/>
    <Container maxWidth="md">
      
      <Typography sx={{mt:5}} variant="h4" gutterBottom>
        Feedbacks
      </Typography>

      {/* Search Input */}
      <TextField
        label="Search Feedback by User name"
        variant="outlined"
        fullWidth
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={fetchFeedback} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Refresh"}
      </Button>

      {/* Feedback List */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {filteredFeedback.map((feedback) => (
          <Grid item xs={12} sm={6} md={4} key={feedback.id}>
            <Card>
              <CardContent>
                <Typography variant="body1">
                  <strong>ID:</strong> {feedback.id}
                </Typography>
                <Typography variant="body2">
                  <strong>User Name:</strong> {feedback.name}
                </Typography> 
                <Typography variant="body1">
                  <strong>Email:</strong> {feedback.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Subject:</strong> {feedback.subject}
                </Typography>
                <Typography variant="body1">
                  <strong>Message:</strong> {feedback.message}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Container>
    </div>
  );
};

export default Feedback;
