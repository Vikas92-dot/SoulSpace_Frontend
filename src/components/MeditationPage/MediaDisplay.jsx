import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Back icon
import Sidebar from "../User/SideBar";
import AudioList from "./AudioMediaData";
import VideoList from "./VideoMediaData";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import api from "../api";
import { useSelector } from "react-redux";

function MediaDisplayPage() {
  const { type, category } = useParams();
  const navigate = useNavigate();
  const [playbackData, setPlaybackData] = useState([]);
  const audioRefs = useRef({});
  const videoRefs = useRef({});
  const startTime = useRef({});

  const filteredAudio = AudioList.filter((media) => media.category === category);
  const filteredVideo = VideoList.filter((video) => video.category === category);

  const user = useSelector((store) => store.User);
  const userId = user.user.id;

  // Convert YouTube URL to Embed URL
  function convertToEmbedUrl(url) {
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=0&enablejsapi=1` : url;
  }

  // Function to handle play event
  const handlePlay = (id) => {
    startTime.current[id] = Date.now();
  };

  // Function to handle pause or stop
  const handlePause = (media) => {
    const { id, title, description, category } = media; // Ensure id, title, description, and category are available
  
    if (startTime.current[id]) {
      const endTime = Date.now();
      const duration = Math.round((endTime - startTime.current[id]) / 1000); // Convert to seconds
  
      // Ensure that all required data is available before proceeding
      if (!title || !description || !category || !duration) {
        console.error("Missing data:", { title, description, category, duration });
        return;
      }
  
      // Push to playbackData only if all required data is present
      setPlaybackData((prev) => [
        ...prev,
        {
          userId: userId,
          title,
          description: description || "No description", 
          category: type, // audio/video
          duration,
          notes: "User listened/watched this session",
        },
      ]);
  
      startTime.current[id] = null;
    }
  };

  // Function to save playback data to the backend
  const savePlaybackData = async () => {
    if (playbackData.length === 0) return;

    console.log("Sending playback data:", playbackData[0]);

    try {
      const response = await axios.post(api.MEDITATION_LOG, playbackData[0]);
      if (response.status === 201) {
        console.log("Playback data saved successfully!");
      }
    } catch (error) {
      console.error("Error saving playback data:", error.response?.data || error);
    }
  };

  // Save data before unmount
  useEffect(() => {
    return () => {
      savePlaybackData();
    };
  }, [playbackData]);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          Back
        </Button>

        <Typography variant="h4">{category} ({type.toUpperCase()})</Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 3 }}>
          {type === "audio" && filteredAudio.length > 0 ? (
            filteredAudio.map((media) => (
              <Card key={media.id} sx={{ padding: 2 }}>
                <CardContent>
                  <Typography variant="h6">{media.title}</Typography>
                  <Box>
                    <audio
                      ref={(el) => (audioRefs.current[media.id] = el)}
                      controls
                      onPlay={() => handlePlay(media.id)}
                      onPause={() => handlePause(media)}
                      onEnded={() => handlePause(media)}
                      style={{ width: "100%" }}
                    >
                      <source src={media.src} type="audio/mpeg" />
                    </audio>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : type === "video" && filteredVideo.length > 0 ? (
            filteredVideo.map((media) => (
              <Card key={media.id} sx={{ padding: 2 }}>
                <CardContent>
                  <Typography variant="h6">{media.title}</Typography>
                  <Box>
                    <iframe
                      ref={(el) => (videoRefs.current[media.id] = el)}
                      width="100%"
                      height="300px"
                      src={convertToEmbedUrl(media.src)}
                      title={media.title}
                      frameBorder="0"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
                      style={{ borderRadius: "8px" }}
                      onPlay={() => handlePlay(media.id)}
                      onPause={() => handlePause(media)}
                      onEnded={() => handlePause(media)}
                    ></iframe>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>No {type} files available.</Typography>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default MediaDisplayPage;
