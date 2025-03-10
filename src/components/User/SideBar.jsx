import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Home, BookOpen, MessageSquare, Bell, User, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import {signOut} from '../redux-config/UserSlice'
import { useNavigate } from "react-router-dom";

function Sidebar(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
      const menuItems = [
          { text: "Dashboard", icon: <Home />, path: "/UserDashboard" },
          { text: "Journal", icon: <BookOpen />, path: "/journal" },
          { text: "Affirmations", icon: <MessageSquare />, path: "/affirmations" },
          { text: "Community", icon: <MessageSquare />, path: "/community" },
          { text: "Notifications", icon: <Bell />, path: "/notifications" },
          { text: "Profile", icon: <User />, path: "/profile" }
        ];
    return<>
    {/* Sidebar Menu */}
          <Drawer
            variant="permanent"
            sx={{
              width: 240,
              flexShrink: 0,
              "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box", p: 2 },
            }}
          >
            <List>
              {menuItems.map((item, index) => (
                          <ListItemButton key={index} onClick={() => navigate(item.path)}>
                            <ListItemIcon sx={{ color: "primary.main" }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                          </ListItemButton>
                        ))}
              {/* Logout Button */}
              <ListItemButton onClick={()=>dispatch(signOut())} sx={{ color: "error.main" }}>
                <ListItemIcon>
                  <LogOut color="red"/>
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </List>
          </Drawer>
    
    </>
}
export default Sidebar;