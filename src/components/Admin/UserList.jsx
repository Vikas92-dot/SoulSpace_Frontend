import React, { useEffect, useState } from "react";
import axios from "axios";
import {Container,TextField,Button,Card,CardContent,Typography,Grid,IconButton,CircularProgress
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../api";
import { toast, ToastContainer } from "react-toastify";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(api.GET_ALLUSERS);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if(window.confirm("Do you want to delete it?")){
      try {
        await axios.delete(`${api.DELETE_USER}/${id}`);
        setUsers(users.filter((user) => user.id !== id)); 
        toast.success("User Deleted successfully.");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  

  const filteredUsers = users.filter((user) =>
    user.name.toString().includes(searchName)
  );

  return (
    <Container style={{flexGrow:1}} maxWidth="md">
      <ToastContainer/>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>

      {/* Search Input */}
      <TextField
        label="Search User by Name"
        variant="outlined"
        fullWidth
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={fetchUsers} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Refresh"}
      </Button>

      {/* Users List */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {filteredUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card>
              <CardContent>
                <Typography variant="body1">
                  <strong>ID:</strong> {user.id}
                </Typography>
                <Typography variant="body1">
                  <strong>Name:</strong> {user.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {user.email}
                </Typography>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteUser(user.id)}
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
  );
};

export default UserList;
