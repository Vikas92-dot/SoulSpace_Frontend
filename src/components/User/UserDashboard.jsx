import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";
import axios from "axios";
import api from "../api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import { Box, Typography } from "@mui/material";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupsIcon from "@mui/icons-material/Groups";

function UserDashboard() {
  const [quote, setQuote] = useState("“Believe in yourself and all that you are.”");
  const [allMeditationData, setAllMeditationData] = useState([]);
  const [meditationData, setMeditationData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const sessionsPerPage = 7;
  const user = useSelector((store) => store.User);

  useEffect(() => {
    const fetchMeditationProgress = async () => {
      try {
        const userId = user.user.id;
        const response = await axios(`${api.MEDITATION_TRACKER}/${userId}`);
        let data = response.data;
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        const formattedData = data.map(session => ({
          date: new Date(session.createdAt).toLocaleDateString("en-US", { weekday: "short" }),
          minutes: session.duration,
        }));
        setAllMeditationData(formattedData);
        setMeditationData(formattedData.slice(0, sessionsPerPage));
      } catch (error) {
        console.error("Error fetching meditation data:", error);
      }
    };
    fetchMeditationProgress();
  }, []);

  const handleNext = () => {
    const nextPage = currentPage + 1;
    const startIndex = nextPage * sessionsPerPage;
    if (startIndex < allMeditationData.length) {
      setMeditationData(allMeditationData.slice(startIndex, startIndex + sessionsPerPage));
      setCurrentPage(nextPage);
    }
  };

  const handlePrevious = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 0) {
      const startIndex = prevPage * sessionsPerPage;
      setMeditationData(allMeditationData.slice(startIndex, startIndex + sessionsPerPage));
      setCurrentPage(prevPage);
    }
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
            <Button onClick={() => setQuote("“Peace comes from within. Do not seek it without.” - Buddha")}>Refresh Quote</Button>
          </CardContent>
        </Card>
        <Box sx={{ mt: 4, mb: 4, display: "flex", gap: 2 }}>
          <Button variant="contained" sx={{ bgcolor: "#4CAF50" }} onClick={() => navigate('/Meditations')}>
            <SelfImprovementIcon sx={{ mr: 1 }} /> Start Meditation
          </Button>
          <Button variant="outlined" sx={{ borderColor: "#6D4C41", color: "#6D4C41" }}>
            <MenuBookIcon sx={{ mr: 1 }} /> Write a Journal
          </Button>
          <Button variant="outlined" sx={{ borderColor: "#6D4C41", color: "#6D4C41" }}>
            <GroupsIcon sx={{ mr: 1 }} onClick={()=> navigate('/community')} /> Visit Community
          </Button>
        </Box>
        <Card sx={{ p: 2, bgcolor: "#FFF3E0" }}>
          <CardContent>
            <Typography variant="h5" color="#6D4C41" gutterBottom>
              Meditation Progress
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={meditationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D7CCC8" />
                <XAxis dataKey="date" stroke="#6D4C41" />
                <YAxis stroke="#6D4C41" />
                <Tooltip contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)", color: "#6D4C41" }} />
                <Line type="monotone" dataKey="minutes" stroke="#4CAF50" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button onClick={handlePrevious} disabled={currentPage === 0} sx={{ color: "#6D4C41" }}>
                Previous
              </Button>
              <Button onClick={handleNext} disabled={(currentPage + 1) * sessionsPerPage >= allMeditationData.length} sx={{ color: "#6D4C41" }}>
                Next
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default UserDashboard;
