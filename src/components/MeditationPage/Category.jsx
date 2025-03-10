import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../User/SideBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Category() {
  const { type } = useParams(); // "audio" or "video"
  const navigate = useNavigate();

  const categories = ["Stress", "Anxiety", "Focus", "Body Scan"];

  return (
    <div style={{display:"flex"}}>
        <Sidebar/>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        bgcolor: "#f5f5f5",
        flexGrow:1
      }}
    >
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)} // Go back to the previous page
        sx={{
          position: "absolute",
          top: 20,
          left: "20%",
          bgcolor: "#0000FF", // Background color for the button
          color: "white", // Text color for the button
          "&:hover": { bgcolor: "#00332c" }, // Hover effect
          padding: "8px 16px", // Button padding
        }}
      >
        Back
      </Button>

      <Typography sx={{mt:15}} variant="h4" fontWeight="bold" gutterBottom>
        Choose Category 
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        {categories.map((category) => (
          <Button
            key={category}
            variant="contained"
            onClick={() => navigate(`/Meditations/type/${type}/${category}`)}
          >
            {category}
          </Button>
        ))}
      </Box>
    </Box>
    </div>
  );
}

export default Category;
