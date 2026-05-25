import { useRef } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function TopBar({ curUser, onLogout, onPhotoUploaded }) {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleAddPhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("uploadedphoto", file);

    try {
      const res = await fetch("https://x6vsmn-8081.csb.app/api/photos/new", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        alert("Upload photo failed");
        return;
      }

      if (onPhotoUploaded) {
        onPhotoUploaded();
      }

      navigate(`/photos/${curUser._id}`);
    } catch (error) {
      console.log("Upload photo error:", error);
      alert("Cannot connect to server");
    }

    e.target.value = "";
  };

  if (!curUser) {
    return (
      <AppBar className="topbar-appBar" position="fixed">
        <Toolbar className="topbar-toolbar">
          <Typography variant="h6">Please Login</Typography>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar className="topbar-appBar" position="fixed">
      <Toolbar className="topbar-toolbar">
        <Typography variant="h6" className="topbar-left">
          Hi {curUser.first_name}
        </Typography>

        <Button
          variant="contained"
          color="inherit"
          size="small"
          onClick={handleAddPhoto}
          sx={{
            marginLeft: "12px",
            height: "28px",
            fontSize: "12px",
            textTransform: "none",
            color: "black",
          }}
        >
          Add Photo
        </Button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handlePhotoChange}
        />

        <Button
          variant="contained"
          color="inherit"
          size="small"
          onClick={onLogout}
          sx={{
            marginLeft: "8px",
            height: "28px",
            fontSize: "12px",
            textTransform: "none",
            color: "black",
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
