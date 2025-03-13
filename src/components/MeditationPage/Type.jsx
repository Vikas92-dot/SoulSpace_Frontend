import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
function MeditationType(){
    const navigate = useNavigate();
    return<>
    <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",height:"100vh",background: "linear-gradient(to bottom, #FFF8E1, #FFD54F)" ,flexGrow:1}}>

        <Button
                startIcon={<ArrowBack/>}
                onClick={()=> navigate(-1)}
                sx={{
                    position:"absolute",
                    top:25,
                    left:"20%"
                }}
                variant="contained"
                >
                    Back
        </Button>
         {/* Card Container */}
         <Card 
                sx={{
                    width: "400px",
                    padding: "30px",
                    textAlign: "center",
                    borderRadius: "12px",
                    boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
                    background: "white",
                    marginTop:20
                }}
            >
                {/* Title */}
                <Typography 
                    variant="h4" 
                    fontWeight="bold" 
                    gutterBottom 
                    sx={{
                        borderBottom: "3px solid orange",
                        paddingBottom: "10px",
                        marginBottom: "20px"
                    }}
                >
                    Meditation Session
                </Typography>

                {/* Buttons */}
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                    <Button 
                        onClick={() => navigate('/Meditations/type/video')} 
                        sx={{ height: "50px", borderRadius: "10px", width: "150px" }} 
                        variant="contained"
                        color="primary"
                    >
                        Video
                    </Button>
                    <Button 
                        onClick={() => navigate('/Meditations/type/audio')} 
                        sx={{ height: "50px", borderRadius: "10px", width: "150px" }} 
                        variant="contained"
                        color="secondary"
                    >
                        Audio
                    </Button>
                </Box>
            </Card>
    </Box>
    </>
}
export default MeditationType;