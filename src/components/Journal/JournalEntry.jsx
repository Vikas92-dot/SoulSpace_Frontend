import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Paper, Typography, List, ListItem, IconButton, CircularProgress } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import api from "../api";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import SideBar from '../User/SideBar'
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; 
import { useNavigate } from "react-router-dom";


function JournalEntry() {
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [journalEntries, setJournalEntries] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editEntry, setEditEntry] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetchEntries();
  }, []);

  const user = useSelector((store) => store.User);
  let userID = user.user.id;

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`${api.GET_JOURNALS}/${userID}`);
      setJournalEntries(response.data);
    } catch (error) {
      console.error("Error fetching journal entries:", error);
    }
    finally{
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !entry.trim()) return;
    console.log(entry);
    
    try {
      const response = await axios.post(`${api.CREATE_JOURNAL}`, { userId: userID,title, content: entry });
      //console.log(response.data.journal);
      
      setJournalEntries([response.data.journal, ...journalEntries]);
      setTitle("");
      setEntry("");
      toast.success("Journal created successfully..");
    } catch (error) {
      console.error("Error saving journal entry:", error);
    }
  };

  const handleEdit = (id, title, text) => {
    setEditMode(id);
    setEditTitle(title);
    setEditEntry(text);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`${api.UPDATE_JOURNAL}/${id}`, { title: editTitle, content: editEntry });
      setJournalEntries(journalEntries.map(item => item.id === id ? { ...item, title: editTitle, content: editEntry } : item));
      setEditMode(null);
      setEditTitle("");
      setEditEntry("");
      toast.success("Edit Successfully..");
    } catch (error) {
      console.error("Error updating journal entry:", error);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Do you want to delete it?")){

      try {
        await axios.delete(`${api.DELETE_JOURNAL}/${id}`);
        setJournalEntries(journalEntries.filter(item => item.id !== id));
        toast.success("Delete successfully..")
      } catch (error) {
        console.error("Error deleting journal entry:", error);
      }
    }
  };

  return (
    <div style={{display:"flex"}}>
      <SideBar/>
      {/* Back Button */}
        <Button sx={{height:"30px",marginTop:4,marginLeft:5}} variant="contained" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          Back
        </Button>
    <Paper elevation={5} style={{flexGrow:1, maxWidth: "600px", margin: "auto", padding: "20px" ,marginTop:30}}>
      <ToastContainer/>
      <Typography variant="h5" gutterBottom>Your Journal</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="Write your thoughts..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
        >
          Save Entry
        </Button>
      </form>
      <Typography variant="h6" style={{ marginTop: "20px" }}>Previous Entries</Typography>
      <List>
        {loading ? (<CircularProgress style={{display:"block", margin:"20px auto" }}/>) : journalEntries.map((item) => (
          <ListItem key={item.id} style={{ background: "#f5f5f5", marginTop: "5px", padding: "10px", borderRadius: "5px", display: "flex", flexDirection: "column" }}>
            {editMode === item.id ? (
              <>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{ marginBottom: "5px" }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                  value={editEntry}
                  onChange={(e) => setEditEntry(e.target.value)}
                />
              </>
            ) : (
              <>
                <Typography variant="subtitle1" fontWeight="bold">{item.title}</Typography>
                <Typography variant="body1">{item.content}</Typography>
                <Typography variant="caption" color="textSecondary">{new Date(item.createdAt).toLocaleDateString()}</Typography>
              </>
            )}
            <div style={{ marginTop: "10px" }}>
              {editMode === item.id ? (
                <Button variant="contained" color="primary" size="small" onClick={() => handleUpdate(item.id)}>Update</Button>
              ) : (
                <IconButton onClick={() => handleEdit(item.id, item.title, item.content)} color="primary">
                  <Edit />
                </IconButton>
              )}
              <IconButton onClick={() => handleDelete(item.id)} color="secondary">
                <Delete />
              </IconButton>
            </div>
          </ListItem>
        ))}
      </List>
    </Paper>
  </div>
  );
}

export default JournalEntry;
