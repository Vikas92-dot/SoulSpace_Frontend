import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, Box, Divider } from "@mui/material";
import { Home, Users, MessageSquare, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutAdmin } from "../redux-config/AdminSlice";
import { Feedback, FeedbackTwoTone, FeedRounded } from "@mui/icons-material";


function SideBarAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const menuItems = [
    { text: "Dashboard", icon: <Home />, path: "/adminDashboard" },
    { text: "Feedback", icon: <Feedback />, path: "/allFeedback" },
    { text: "Community", icon: <MessageSquare />, path: "/allForum" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 260,
          boxSizing: "border-box",
          p: 2,
          bgcolor: "background.default"
        },
      }}
    >
      {/* Admin Header */}
      <Box sx={{ textAlign: "center", py: 2 }}>
        <Box sx={{height:"90px"}}>
          <img style={{height:"100px"}} src="/images/admin.webp"/>
        </Box>
        <Typography variant="h6" fontWeight="bold">Admin Panel</Typography>
      </Box>
      <Divider />
      {/* Sidebar Menu */}
      <List>
        {menuItems.map((item, index) => (
          <ListItemButton key={index} onClick={() => navigate(item.path)}>
            <ListItemIcon sx={{ color: "primary.main" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
        {/* Logout Button */}
        <ListItemButton
          onClick={() => {
            if (window.confirm("Do you want to log out?")) {
              dispatch(signOutAdmin());
            }
          }}
          sx={{ color: "error.main", mt: 2 }}
        >
          <ListItemIcon>
            <LogOut color="red" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export default SideBarAdmin;
