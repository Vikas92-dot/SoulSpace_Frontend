import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../SideBar";
import { Box, Typography,Card, CardContent,Button } from "@mui/material";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupsIcon from "@mui/icons-material/Groups";
import QuotesData from "./QuotesData";
import Progress from "./Progress";

function UserDashboard() {
  const [quote, setQuote] = useState("");
  const navigate = useNavigate();
  const user = useSelector((store) => store.User);

  useEffect(() => {
    //select random quotes from QuotesData
    const randomIndex = Math.floor(Math.random() * QuotesData.length);
    setQuote(QuotesData[randomIndex].quote);

  }, []);

  const refreshQuote = () => {
    const randomIndex = Math.floor(Math.random() * QuotesData.length);
    setQuote(QuotesData[randomIndex].quote);
  };

  
  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "linear-gradient(to bottom, #FFDD44, #FF6600)" }}>
      <Sidebar />
      <Box sx={{ flex: 1, p: 4, color: "#6D4C41" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Good Morning, {user.user.name} 🌞
        </Typography>
        <Card sx={{ mb: 4, p: 2, bgcolor: "#FFF3E0" }}>
          <CardContent>
            <Typography variant="h5" color="#6D4C41" gutterBottom>
              Daily Affirmation
            </Typography>
            <Typography variant="body1" fontStyle="italic" mb={2}>
              {quote}
            </Typography>
            <Button sx={{height:"40px"}} variant="contained" onClick={refreshQuote}>Refresh Quote</Button>
          </CardContent>
        </Card>
        <Box sx={{ mt: 4, mb: 4, display: "flex", gap: 2 }}>
          <Button variant="contained" sx={{ bgcolor: "#4CAF50" }} onClick={() => navigate('/Meditations')}>
            <SelfImprovementIcon sx={{ mr: 1 }} /> Start Meditation
          </Button>
          <Button variant="contained" sx={{ bgcolor: "#4CAF50" }}>
            <MenuBookIcon sx={{ mr: 1 }} /> Write a Journal
          </Button>
          <Button variant="contained" sx={{ bgcolor: "#4CAF50" }} onClick={()=> navigate('/community')}>
            <GroupsIcon sx={{ mr: 1 }}  /> Visit Community
          </Button>
        </Box>

        {/* Add Progress chart */}
        <Progress/>
      </Box>
    </Box>
  );
}

export default UserDashboard;
