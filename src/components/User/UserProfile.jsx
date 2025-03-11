import { useState } from "react";
import { Card, CardContent, TextField, Button, Avatar, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./SideBar";

export default function UserProfile() {

  let user = useSelector((store)=> store.User);

  const userName = user.user.name;
  const [name, setName] = useState(userName);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };


  return (
    <div style={{display:"flex"}}>
      <Sidebar/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
                src={preview || ""}
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
          <Button variant="contained" color="primary" className="mt-4 w-full">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
  );
}
