import React, { useState } from "react";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { Progress } from "./ui/Progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import ReactPlayer from "react-player";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Home, Heart, BookOpen, MessageSquare, Bell, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MeditationPage = () => {
  const [progress, setProgress] = useState(50); // Example progress value
  const [mediaType, setMediaType] = useState("video"); // "video" or "audio"
  const [category, setCategory] = useState("Stress Relief");
  const navigate = useNavigate();

  const menuItems = [
    { text: "Dashboard", icon: <Home />, path: "/UserDashboard" },
    { text: "Journal", icon: <BookOpen />, path: "/journal" },
    { text: "Affirmations", icon: <MessageSquare />, path: "/affirmations" },
    { text: "Community", icon: <MessageSquare />, path: "/community" },
    { text: "Notifications", icon: <Bell />, path: "/notifications" },
    { text: "Profile", icon: <User />, path: "/profile" }
  ];

  return (
    <div className="flex">
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
          {menuItems.map((item, index) => (
            <ListItemButton key={index} onClick={() => navigate(item.path)}>
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
      
      <div className="p-6 space-y-6 flex-1">
        {/* Media Type Selection */}
        <div className="flex justify-center space-x-4">
          <Button variant={mediaType === "video" ? "default" : "outline"} onClick={() => setMediaType("video")}>
            Video
          </Button>
          <Button variant={mediaType === "audio" ? "default" : "outline"} onClick={() => setMediaType("audio")}>
            Audio
          </Button>
        </div>

        {/* Header with Categories */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Meditation</h1>
          <div className="space-x-4">
            {["Stress Relief", "Anxiety", "Sleep", "Focus"].map((cat) => (
              <Button key={cat} variant={category === cat ? "default" : "outline"} onClick={() => setCategory(cat)}>
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Media Player */}
        <Card>
          <CardContent className="p-4 flex justify-center">
            {mediaType === "video" ? (
              <ReactPlayer url="https://youtu.be/inpok4MKVLM?si=CHOtEolowAi7da2c" controls width="50%" />
            ) : (
              <audio controls>
                <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MeditationPage;
