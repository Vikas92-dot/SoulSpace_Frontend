import { Box, Button, Typography, Card, CardContent } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../User/SideBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import api from "../api";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import AudioList from "./AudioMediaData";
import VideoList from "./VideoMediaData";
import { ArrowBack } from "@mui/icons-material";

function Category() {
  const { type } = useParams();
  const navigate = useNavigate();
  const categories = ["Stress", "Anxiety", "Focus", "Body Scan"];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const user = useSelector((store) => store.User);
  const userId = user.user.id;
  const playbackData = useRef([]);
  const startTime = useRef({});
  const videoRef = useRef({});
  const intervalRef = useRef(null);

  const filteredAudio = AudioList.filter((media) => media.category === selectedCategory);
  const filteredVideo = VideoList.filter((video) => video.category === selectedCategory);

  function convertToEmbedUrl(url) {
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=0&enablejsapi=1` : url;
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handlePlay = (id) => {
    startTime.current[id] = Date.now();
    playbackData.current.push({ userId, title: "Video", description: "Started playing", category: type, duration: 0, notes: "User started playing video" });
  };

  const handlePause = (media) => {
    const { id, title, description } = media;
    if (startTime.current[id]) {
      const endTime = Date.now();
      const duration = Math.round((endTime - startTime.current[id]) / 1000);
      playbackData.current.push({ userId, title, description, category: type, duration, notes: "User paused video" });
      toast.success("Meditation Saved successfully");
      startTime.current[id] = null;
    }
  };

  const savePlaybackData = async () => {
    if (playbackData.current.length === 0) return;
    try {
      await axios.post(api.MEDITATION_LOG, playbackData.current[0]);
    } catch (error) {
      console.error("Error saving playback data:", error.response?.data || error);
    }
  };

  useEffect(() => {
    // Set interval to track video play state (checking every second)
    intervalRef.current = setInterval(() => {
      Object.keys(videoRef.current).forEach((key) => {
        const video = videoRef.current[key];
        if (video) {
          // Check if the iframe is playing or paused
          const iframe = video.contentWindow;
          if (iframe) {
            iframe.postMessage('{"event":"command","func":"getPlayerState","args":""}', '*');
          }
        }
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
      savePlaybackData();
    };
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <ToastContainer />
      <Sidebar />
      <Box sx={{ flexGrow: 1, padding: 4, background: "linear-gradient(to bottom, #FFF8E1, #FFD54F)", minHeight: "100vh" }}>
        {/* Back Button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{
            position: "absolute",
            top: 25,
            left: "20%",
          }}
          variant="contained"
          color="inherit"
        >
          Back
        </Button>

        <Typography variant="h4" fontWeight="bold" color="#F57F17" textAlign="center" gutterBottom>
          Choose Meditation Category
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
          {categories.map((category) => (
            <Button key={category} variant={selectedCategory === category ? "contained" : "outlined"} onClick={() => handleCategoryClick(category)}>
              {category}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 3, mt: 4 }}>
          {type === "audio" && filteredAudio.length > 0 ? (
            filteredAudio.map((media) => (
              <Card key={media.id} sx={{ padding: 2, borderRadius: "12px", boxShadow: 5, "&:hover": { transform: "scale(1.05)" } }}>
                <CardContent>
                  <Typography variant="h5">{media.title}</Typography>
                  <audio controls onPlay={() => handlePlay(media.id)} onPause={() => handlePause(media)} style={{ width: "100%" }}>
                    <source src={media.src} type="audio/mpeg" />
                  </audio>
                </CardContent>
              </Card>
            ))
          ) : type === "video" && filteredVideo.length > 0 ? (
            filteredVideo.map((media) => (
              <Card key={media.id} sx={{ padding: 2, borderRadius: "12px", boxShadow: 5, "&:hover": { transform: "scale(1.05)" } }}>
                <CardContent>
                  <Typography variant="h5">{media.title}</Typography>
                  <iframe
                    id={media.id}
                    ref={(ref) => (videoRef.current[media.id] = ref)}
                    width="100%"
                    height="300px"
                    src={convertToEmbedUrl(media.src)}
                    title={media.title}
                    allowFullScreen
                    onPlay={() => handlePlay(media.id)}
                    onPause={() => handlePause(media)}
                  ></iframe>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5rem" }}>No {type} files available.</Typography>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default Category;
