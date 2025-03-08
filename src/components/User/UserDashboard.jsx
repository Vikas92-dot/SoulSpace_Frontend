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

function UserDashboard() {
  const [quote, setQuote] = useState("“Believe in yourself and all that you are.”");
  const [allMeditationData, setAllMeditationData] = useState([]); // Stores full data
  const [meditationData, setMeditationData] = useState([]); // Stores paginated data
  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const navigate = useNavigate();

  const sessionsPerPage = 7; // Show 7 sessions per page

  //Fetch user details
  const user = useSelector((store)=>store.User);
    
  console.log(user.user.id)
  
  useEffect(() => {
        
    const fetchMeditationProgress = async () => {
      try {
        const userId = user.user.id;
        const response = await axios(`${api.MEDITATION_TRACKER}/${userId}`);
        console.log(response.data);
        
        let data = response.data;    

        // Sort sessions by date (latest first)
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        // Convert session dates to weekday names
        const formattedData = data.map(session => ({
          date: new Date(session.createdAt).toLocaleDateString("en-US", { weekday: "short" }), // "Mon", "Tue"
          minutes: session.duration,
        }));

        setAllMeditationData(formattedData);
        setMeditationData(formattedData.slice(0, sessionsPerPage)); // Show first 7 sessions
      } catch (error) {
        console.error("Error fetching meditation data:", error);
      }
    };

    fetchMeditationProgress();
    
  }, []);

  // Handle Next Page
  const handleNext = () => {
    const nextPage = currentPage + 1;
    const startIndex = nextPage * sessionsPerPage;
    if (startIndex < allMeditationData.length) {
      setMeditationData(allMeditationData.slice(startIndex, startIndex + sessionsPerPage));
      setCurrentPage(nextPage);
    }
  };

  // Handle Previous Page
  const handlePrevious = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 0) {
      const startIndex = prevPage * sessionsPerPage;
      setMeditationData(allMeditationData.slice(startIndex, startIndex + sessionsPerPage));
      setCurrentPage(prevPage);
    }
  };
  
  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f5f5f5" }}>
      {/*Side bar component */}
      <Sidebar/>
      {/* Main Dashboard Section */}
      <Box sx={{ flex: 1, p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Good Morning, {user.user.name} 🌞
        </Typography>

        {/* Daily Affirmation Card */}
        <Card sx={{ mb: 4, p: 2 }}>
          <CardContent>
            <Typography variant="h5" color="primary" gutterBottom>
              Daily Affirmation
            </Typography>
            <Typography variant="body1" fontStyle="italic" mb={2}>
              {quote}
            </Typography>
            <Button onClick={() => setQuote("“Peace comes from within. Do not seek it without.” - Buddha")}>
              Refresh Quote
            </Button>
          </CardContent>
        </Card>
        {/* Action Buttons */}
        <Box sx={{ mt: 4,mb: 4, display: "flex", gap: 2 }}>
          <Button variant="contained" onClick={()=>navigate('/Meditations')} >Start Meditation</Button>
          <Button variant="outlined">Write a Journal</Button>
          <Button variant="outlined">Visit Community</Button>
        </Box>

        {/* Meditation Progress Card */}
        <Card sx={{ p: 2 }}>
          <CardContent>
            <Typography variant="h5" color="primary" gutterBottom>
              Meditation Progress
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={meditationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis dataKey="date" stroke="#333" />
                <YAxis stroke="#333" />
                <Tooltip contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)", color: "#333" }} />
                <Line type="monotone" dataKey="minutes" stroke="#4a90e2" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>

            {/* Pagination Buttons */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button onClick={handlePrevious} disabled={currentPage === 0}>
                Previous
              </Button>
              <Button onClick={handleNext} disabled={(currentPage + 1) * sessionsPerPage >= allMeditationData.length}>
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
