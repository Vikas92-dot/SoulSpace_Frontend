import { useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";
import axios from "axios";
import api from "../../api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Typography,Card, CardContent,Button } from "@mui/material";

function Progress() {
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
    <Box sx={{  height: "auto", bgcolor: "linear-gradient(to bottom, #FFDD44, #FF6600)" }}>
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
              <Button onClick={handlePrevious} disabled={currentPage === 0} variant="contained">
                Previous
              </Button>
              <Button onClick={handleNext} disabled={(currentPage + 1) * sessionsPerPage >= allMeditationData.length} variant="contained">
                Next
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
  );
}

export default Progress;
