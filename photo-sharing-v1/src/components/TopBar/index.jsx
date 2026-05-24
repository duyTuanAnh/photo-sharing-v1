import { useRef } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function TopBar({ curUser, onLogout, onPhotoUploaded }) {
  // khởi tạo ref để hiển thị thư mục cho người dùng chọn file khi bấm addPhoto
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // khởi tạo hàm kích hoạt
  const handleAddPhoto = () => {
    fileInputRef.current.click();
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    const token = localStorage.getItem("token");
    // sử dụng formData để xử lý file
    const formData = new FormData();
    formData.append("uploadedphoto", file);
    try{
      const res = await fetch("https://x6vsmn-8081.csb.app/api/photos/new",{
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if(!res.ok){
        alert("Upload photo failed");
        return;
      }

      // thông báo để userPhoto re-render
      if(onPhotoUploaded) onPhotoUploaded();
      navigate(`/photos/${curUser._id}`);
    }catch(error){
      console.log(error);
    }
    e.target.value="";
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
        {/* <Typography variant="h6" className="topbar-left">
          Nguyễn Duy Tuấn Anh
        </Typography> */}

        <Typography
          variant="body1"
          // style={{ textAlign: "right", marginLeft: "auto" }}
          className="topbar-left"
        >
          <h3>Hi {curUser.first_name} </h3>
        </Typography>
        
        <Button
          variant="contained"
          color="inherit"
          style={{ margin: "10px" }}
          onClick={handleAddPhoto} //kích hoạt để mở thư mục chọn file
        >
          <span style={{color:"black"}}>Add Photo</span>
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
          style={{ margin: "10px" }}
          color="inherit"
          onClick={onLogout}
        >
          <span style={{ color: "black" }}>Logout</span>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
