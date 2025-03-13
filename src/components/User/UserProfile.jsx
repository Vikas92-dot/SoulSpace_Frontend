import { useState } from "react";
import { Card, CardContent, TextField, Button, Avatar, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./SideBar";
import axios from "axios";  // Make sure axios is installed
import api from "../api";
import { toast, ToastContainer } from "react-toastify";
import { updateUserProfilePic } from "../redux-config/UserSlice";

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
  const dispatch = useDispatch();

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
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(`${api.UPLOAD_PIC}/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log();
      
      
      if(response.data){
        toast.success("Image changed successfully..");
        //Change in redux
        dispatch(updateUserProfilePic(response.data.imagePath));
        setPreview(`${api.BASE_URL}${response.data.imagePath}`);
      }
      
    } catch (error) {
      console.error("Error uploading profile:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <ToastContainer/>
      <Sidebar />
      <div
        className="flex justify-center items-center bg-gray-100"
        style={{ flexGrow: 1, marginLeft: 200, marginRight: 200, marginTop: 30 }}
      >
        <Card className="p-6 rounded-3xl shadow-lg bg-white max-w-sm text-center">
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
              <Avatar sx={{ width: 150, height: 150 }} src={preview || (userProfilePic ? `${api.BASE_URL}${userProfilePic}` : "")} />
                <PhotoCamera sx={{ position: "absolute", top: 100, left: 90 }} />
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
