import { useState } from "react";
import { Card, CardContent, TextField, Button, Avatar, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useSelector } from "react-redux";
import Sidebar from "./SideBar";
import axios from "axios";  // Make sure axios is installed
import api from "../api";

export default function UserProfile() {

  let user = useSelector((store) => store.User);

  const userId = user.user.id;
  const userName = user.user.name;
  const userEmail = user.user.email;
  const userProfilePic = user.user.profilePic;
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (image) formData.append("profilePic", image);

    try {
      const response = await axios.post(api.UPLOAD_PIC/{userId}, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data); // handle response
      // Update Redux state if necessary or show success message
    } catch (error) {
      console.error("Error uploading profile:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div
        className="flex justify-center items-center bg-gray-100"
        style={{ flexGrow: 1, marginLeft: 200, marginRight: 200 }}
      >
        <Card className="p-6 rounded-2xl shadow-lg bg-white max-w-sm text-center">
          <CardContent>
            <label htmlFor="upload-button">
              <input
                id="upload-button"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <IconButton color="primary" component="span">
                <Avatar
                  src={preview || userProfilePic || ""}
                  sx={{ width: 100, height: 100 }}
                />
                <PhotoCamera sx={{ position: "absolute", top: 60, left: 60 }} />
              </IconButton>
            </label>
            <div className="mt-4">
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <TextField
                fullWidth
                label="Email-id"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              className="mt-4 w-full"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
