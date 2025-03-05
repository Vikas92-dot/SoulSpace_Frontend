import { useEffect, useState } from "react";
import { Home, Heart, BookOpen, MessageSquare, Bell, User, LogOut } from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import api from "../api";

function UserDashboard() {
  const [quote, setQuote] = useState("“Believe in yourself and all that you are.”");
  const [allMeditationData, setAllMeditationData] = useState([]); // Stores full data
  const [meditationData, setMeditationData] = useState([]); // Stores paginated data
  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const [userLevel, setUserLevel] = useState(""); // User level (Beginner, Intermediate, Advanced)

  const sessionsPerPage = 7; // Show 7 sessions per page

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = 39; // Replace with dynamic user ID
        const response = await axios(`${api.USER_DATA}/${userId}`);
        const userData = response.data;

        // Set user level
        setUserLevel(userData.level);

        // Fetch meditation progress data
        const meditationResponse = await axios(`${api.MEDITATION_TRACKER}/${userId}`);
        console.log(meditationResponse.data);
        
        let data = meditationResponse.data;

        // Sort sessions by date (latest first)
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Convert session dates to weekday names
        const formattedData = data.map(session => ({
          date: new Date(session.createdAt).toLocaleDateString("en-US", { weekday: "short" }), // "Mon", "Tue"
          minutes: session.duration,
        }));

        setAllMeditationData(formattedData);
        setMeditationData(formattedData.slice(0, sessionsPerPage)); // Show first 7 sessions
      } catch (error) {
        console.error("Error fetching user data or meditation data:", error);
      }
    };

    fetchUserData();
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
      {/* Sidebar Menu */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box", p: 2 },
        }}
      >
        <List>
          {[{ text: "Dashboard", icon: <Home /> }, { text: "Meditation Tracker", icon: <Heart /> },
            { text: "Journal", icon: <BookOpen /> }, { text: "Affirmations", icon: <MessageSquare /> },
            { text: "Community", icon: <MessageSquare /> }, { text: "Notifications", icon: <Bell /> },
            { text: "Profile", icon: <User /> }
          ].map((item, index) => (
            <ListItemButton key={index}>
              <ListItemIcon sx={{ color: "primary.main" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
          {/* Logout Button */}
          <ListItemButton sx={{ color: "error.main" }}>
            <ListItemIcon>
              <LogOut color="red"/>
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* Main Dashboard Section */}
      <Box sx={{ flex: 1, p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Good Morning, [User Name] 🌞
        </Typography>

        {/* User Level */}
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Level: {userLevel || "Loading..."} {/* Display user level */}
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

        {/* Action Buttons */}
        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          <Button variant="contained">Start Meditation</Button>
          <Button variant="outlined">Write a Journal</Button>
          <Button variant="outlined">Visit Community</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default UserDashboard;
