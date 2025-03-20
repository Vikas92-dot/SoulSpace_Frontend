import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Paper, Typography, List, ListItem, IconButton, CircularProgress, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import api from "../api";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import SideBar from '../User/SideBar'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import AudioRecorder from "./AudioRecorder";

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
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !entry.trim()) return;

    try {
      const response = await axios.post(`${api.CREATE_JOURNAL}`, { userId: userID, title, content: entry });
      setJournalEntries([response.data.journal, ...journalEntries]);
      setTitle("");
      setEntry("");
      toast.success("Journal created successfully.");
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
      toast.success("Edit Successfully.");
    } catch (error) {
      console.error("Error updating journal entry:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Do you want to delete it?")) {
      try {
        await axios.delete(`${api.DELETE_JOURNAL}/${id}`);
        setJournalEntries(journalEntries.filter(item => item.id !== id));
        toast.success("Deleted successfully.");
      } catch (error) {
        console.error("Error deleting journal entry:", error);
      }
    }
  };

  return (
    <Box display="flex" minHeight="100vh" bgcolor="#E3F2FD">
      <SideBar />
      {/* <AudioRecorder/> */}
      <Box flexGrow={1} maxWidth="700px" mx="auto" my={5} p={3} bgcolor="#ffffff" borderRadius={5} boxShadow={3}>
        <ToastContainer />
        <Button variant="contained" color="primary" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          Back
        </Button>
        <Typography variant="h4" fontWeight="bold" color="primary" textAlign="center" gutterBottom>
          Your Journal
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth variant="outlined" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 2 }} />
            <TextField fullWidth multiline rows={4} variant="outlined" label="Write your thoughts..." value={entry} onChange={(e) => setEntry(e.target.value)} />
            <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2, width: "100%" }}>
              Save Entry
            </Button>
          </form>
        </Paper>
        <Typography variant="h5" fontWeight="bold" color="secondary" gutterBottom>
          Previous Entries
        </Typography>
        <List>
          {loading ? (
            <CircularProgress sx={{ display: "block", mx: "auto", my: 3 }} />
          ) : (
            journalEntries.map((item) => (
              <Paper key={item.id} sx={{ p: 2, mb: 2, borderRadius: 2, backgroundColor: "#E3F2FD" }}>
                {editMode === item.id ? (
                  <>
                    <TextField fullWidth variant="outlined" label="Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} sx={{ mb: 1 }} />
                    <TextField fullWidth multiline rows={2} variant="outlined" value={editEntry} onChange={(e) => setEditEntry(e.target.value)} />
                  </>
                ) : (
                  <>
                    <Typography variant="h6" fontWeight="bold">{item.title}</Typography>
                    <Typography variant="body1" color="textSecondary">{item.content}</Typography>
                    <Typography variant="caption" color="gray">{new Date(item.createdAt).toLocaleDateString()}</Typography>
                  </>
                )}
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  {editMode === item.id ? (
                    <Button variant="contained" color="success" size="small" onClick={() => handleUpdate(item.id)}>
                      Update
                    </Button>
                  ) : (
                    <IconButton onClick={() => handleEdit(item.id, item.title, item.content)} color="primary">
                      <Edit />
                    </IconButton>
                  )}
                  <IconButton onClick={() => handleDelete(item.id)} color="error">
                    <Delete />
                  </IconButton>
                </Box>
              </Paper>
            ))
          )}
        </List>
      </Box>
    </Box>
  );
}

export default JournalEntry;
