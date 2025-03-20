import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography, List, ListItem, ListItemText, ListItemIcon, Chip } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const GetNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  let user = useSelector((store) => store.User);
  let userId = user.user.id;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        let res = await axios.get(`${api.GET_NOTIFICATION}/${userId}`);
        console.log(res.data);
        setNotifications(res.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  return (
    <Card sx={{ maxWidth: 700, mx: "auto", mt: 4, mr: 5, p: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <NotificationsIcon color="primary" /> Your Notifications
        </Typography>
        {notifications.length > 0 ? (
          <List>
            {notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((n) => (
                <ListItem key={n.id} sx={{ borderBottom: "1px solid #ddd" }}>
                  <ListItemText primary={n.type} secondary={new Date(n.time).toLocaleString()} />
                  <ListItemIcon sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip
                      label={n.status ? "Active" : "Sent"}
                      color={n.status ? "success" : "default"}
                      variant="outlined"
                    />
                    {n.status ? (
                      <AccessTimeIcon color="action" />
                    ) : (
                      <CheckCircleIcon color="primary" />
                    )}
                  </ListItemIcon>
                </ListItem>
              ))}
          </List>
        ) : (
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
            No notifications available.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default GetNotifications;
