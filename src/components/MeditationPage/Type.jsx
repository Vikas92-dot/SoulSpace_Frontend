import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
function MeditationType(){
    const navigate = useNavigate();
    return<>
    <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",height:"100vh",bgcolor:"#f5f5f5",flexGrow:1}}>

        <Button
                startIcon={<ArrowBack/>}
                onClick={()=> navigate(-1)}
                sx={{
                    position:"absolute",
                    top:25,
                    left:"20%",
                    bgcolor:"#0000FF",
                    color:"white",
                    "&:hover":{bgcolor: "#00332c"},
                    padding:"8px 16px"
                }}
                >
                    Back
        </Button>

        <Typography sx={{mt:15}} variant="h4" fontWeight="bold" gutterBottom>
          Meditation Session
        </Typography>

        <Box sx={{mt:4,mb:4,display:"flex",gap:2}}>
            <Button onClick={()=>navigate('/Meditations/type/video')} sx={{height:"40px"}} variant="contained">Video</Button>
            <Button onClick={()=>navigate('/Meditations/type/audio')} sx={{height:"40px"}} variant="contained">Audio</Button>
        </Box>

    </Box>
    </>
}
export default MeditationType;