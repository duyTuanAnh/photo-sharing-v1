import "./App.css";

import React, { useState } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";

import TopBar from "./components/TopBar";
import Login from "./components/Login";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import UserComments from "./components/UserComment";
import ProtectedRoute from "./components/ProtectedRoute";

function AppLayOut() {
  const nav = useNavigate();
  const [curUser, setCurUser] = useState(() => {
    const savedUser = localStorage.getItem("curUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // biến check upload photo
  const [photoRefresh, setPhotoRefresh] = useState(0);

  // +1 nếu đã up photo
  const handlePhotoUploaded = ()=>{
    setPhotoRefresh((pre) => pre+1);
  }

  const handleLogin = (user) => {
    setCurUser(user);
    nav(`/users/${user._id}`);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      await fetch("https://x6vsmn-8081.csb.app/admin/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("curUser");

    setCurUser(null);
    nav("/login");
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TopBar curUser={curUser} onLogout={handleLogout} onPhotoUploaded={handlePhotoUploaded}/>
        </Grid>
        <div className="main-topbar-buffer" />
        {curUser && (
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList />
            </Paper>
          </Grid>
        )}

        <Grid item sm={9}>
          <Paper className="main-grid-item">
            <Routes>
              <Route
                path="/"
                element={
                  curUser ? (
                    <Navigate to={`/users/${curUser._id}`} replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/login"
                element={
                  curUser ? (
                    <Navigate to={`/users/${curUser._id}`} replace />
                  ) : (
                    <Login onLogin={handleLogin} />
                  )
                }
              />

              <Route
                path="/users/:userId"
                element={
                  <ProtectedRoute currentUser={curUser}>
                    <UserDetail />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/photos/:userId"
                element={
                  <ProtectedRoute currentUser={curUser}>
                    <UserPhotos photoRefresh={photoRefresh}/>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/comments/:userId"
                element={
                  <ProtectedRoute currentUser={curUser}>
                    <UserComments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={
                  curUser ? (
                    <Navigate to={`/users/${curUser._id}`} replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            </Routes>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

const App = () => {
  return (
    <Router>
      <AppLayOut />
    </Router>
  );
};

export default App;
