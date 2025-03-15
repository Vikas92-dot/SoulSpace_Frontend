import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"; 
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; 
import Sidebar from "../User/SideBar";
import AudioList from "./AudioMediaData";
import VideoList from "./VideoMediaData";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import api from "../api";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

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

  function convertToEmbedUrl(url) {
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=0&enablejsapi=1` : url;
  }

  const handlePlay = (id) => {
    startTime.current[id] = Date.now();
  };

  const handlePause = (media) => {
    const { id, title, description, category } = media; 
    if (startTime.current[id]) {
      const endTime = Date.now();
      const duration = Math.round((endTime - startTime.current[id]) / 10000);
      if (!title || !description || !category || !duration) {
        console.error("Missing data:", { title, description, category, duration });
        return;
      }
      setPlaybackData((prev) => [...prev, { userId, title, description, category: type, duration, notes: "User listened/watched this session" }]);
      toast.success("Meditation Saved successfully");
      startTime.current[id] = null;
    }
  };

  const savePlaybackData = async () => {
    if (playbackData.length === 0) return;
    try {
      const response = await axios.post(api.MEDITATION_LOG, playbackData[0]);
      if (response.status === 201) {
        console.log("Playback data saved successfully!");
      }
    } catch (error) {
      console.error("Error saving playback data:", error.response?.data || error);
    }
  };

  useEffect(() => {
    return () => {
      savePlaybackData();
    };
  }, [playbackData]);

  return (
    <div style={{ display: "flex", background: "linear-gradient(to bottom, #FFF8E1, #FFD54F)", minHeight: "100vh" }}>
      <ToastContainer />
      <Sidebar />
      <Box sx={{ flexGrow: 1, padding: 4, color: "white" }}>
      {/* Back Button */}
      <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            position: "absolute",
            top: 20,
            left: "20%",
            bgcolor: "#1E88E5",
            color: "white",
            "&:hover": { bgcolor: "#1565C0" },
            padding: "10px 20px",
            borderRadius: "12px",
            fontSize: "16px",
          }}
        >
          Back
        </Button>

        <Typography variant="h4" sx={{ mt: 3, fontWeight: "bold", textAlign: "center", textTransform: "uppercase", letterSpacing: "2px",color:"#FF6F61" }}>
          {category} ({type.toUpperCase()})
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 3, mt: 4 }}>
          {type === "audio" && filteredAudio.length > 0 ? (
            filteredAudio.map((media) => (
              <Card key={media.id} sx={{ padding: 2, borderRadius: "12px", boxShadow: "5px 5px 20px rgba(0,0,0,0.2)", transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>{media.title}</Typography>
                  <Box>
                    <audio ref={(el) => (audioRefs.current[media.id] = el)} controls onPlay={() => handlePlay(media.id)} onPause={() => handlePause(media)} onEnded={() => handlePause(media)} style={{ width: "100%", borderRadius: "8px" }}>
                      <source src={media.src} type="audio/mpeg" />
                    </audio>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : type === "video" && filteredVideo.length > 0 ? (
            filteredVideo.map((media) => (
              <Card key={media.id} sx={{ padding: 2, borderRadius: "12px", boxShadow: "5px 5px 20px rgba(0,0,0,0.2)", transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>{media.title}</Typography>
                  <Box>
                    <iframe ref={(el) => (videoRefs.current[media.id] = el)} width="100%" height="300px" src={convertToEmbedUrl(media.src)} title={media.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen sandbox="allow-same-origin allow-scripts allow-popups allow-presentation" style={{ borderRadius: "8px", boxShadow: "3px 3px 15px rgba(0,0,0,0.2)" }}></iframe>
                  </Box>
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

export default MediaDisplayPage;
