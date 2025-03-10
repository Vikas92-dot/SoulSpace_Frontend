import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Back icon
import { useNavigate } from "react-router-dom";

function BackButton(){
    const navigate = useNavigate();
    return<>
    <div>

    <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)} // Go back to the previous page
            sx={{
              position: "absolute",
              top: 20,
              left: "20%",
              bgcolor: "#004d40", // Background color for the button
              color: "white", // Text color for the button
              "&:hover": { bgcolor: "#00332c" }, // Hover effect
              padding: "8px 16px", // Button padding
            }}
          >
            Back
          </Button>
        </div>
    </>
}
export default BackButton;