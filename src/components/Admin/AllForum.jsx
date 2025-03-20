import React, { useEffect, useState } from "react";
import axios from "axios";
import {Container,TextField,Button,Card,CardContent,Typography,Grid,IconButton,CircularProgress
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../api";
import { toast, ToastContainer } from "react-toastify";
import SideBarAdmin from "./SideBarAdmin";

const AllForum = () => {
  const [forums, setForums] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [author,setAuthor] = useState("");
  const [comments,setComments] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchForum();
  }, []);

  const fetchForum = async () => {
    setLoading(true);
    try {
      const response = await axios.get(api.GET_ALLPOSTS);
      console.log(response.data);
      
      for(let i=0; i<response.data.length; i++){
        setAuthor(response.data[i].author);
        setComments(response.data[i].comments);
      }
      console.log(comments);
      
      setForums(response.data);
      
    } catch (error) {
      console.error("Error fetching Forum Post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteForum = async (postId) => {
    if(window.confirm("Do you want to delete it?")){

      try {
        await axios.delete(`${api.DELETE_POST}/${postId}`);
      setForums(forums.filter((forum) => forum.postId !== postId));
      toast.success("Forum deleted successfully.");
    } catch (error) {
      console.error("Error deleting forum:", error);
    }
  }
  };

  const filteredForums = forums.filter((forum) =>
    forum.author.userName.includes(searchName)
  );

  return (
    <div style={{display:"flex"}}>
      <SideBarAdmin/>
    <Container maxWidth="md">
      <ToastContainer/>
      <Typography sx={{mt:5}} variant="h4" gutterBottom>
        Community Posts
      </Typography>

      {/* Search Input */}
      <TextField
        label="Search Post by User name"
        variant="outlined"
        fullWidth
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={fetchForum} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Refresh"}
      </Button>

      {/* Post List */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {filteredForums.map((forum) => (
          <Grid item xs={12} sm={6} md={4} key={forum.postId}>
            <Card>
              <CardContent>
                <Typography variant="body1">
                  <strong>ID:</strong> {forum.postId}
                </Typography>
                <Typography variant="body2">
                  <strong>Author:</strong> {forum.author.userName}
                </Typography> 
                <Typography variant="body1">
                  <strong>Title:</strong> {forum.title}
                </Typography>
                <Typography variant="body1">
                  <strong>Content:</strong> {forum.content}
                </Typography>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteForum(forum.postId)}
                  sx={{ mt: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Container>
    </div>
  );
};

export default AllForum;
