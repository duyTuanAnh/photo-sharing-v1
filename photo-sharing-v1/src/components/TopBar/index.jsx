import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation, matchPath } from "react-router-dom";
import models from "../../modelData/models";

function TopBar () {
  const location = useLocation();

  let contextText = "";

  const userDetailMatch = matchPath("/users/:userId", location.pathname);
  const userPhotosMatch = matchPath("/photos/:userId", location.pathname);

  if (userDetailMatch) {
    const user = models.userModel(userDetailMatch.params.userId);
    if (user) {
      contextText = `${user.first_name} ${user.last_name}`;
    }
  } else if (userPhotosMatch) {
    const user = models.userModel(userPhotosMatch.params.userId);
    if (user) {
      contextText = `Photos of ${user.first_name} ${user.last_name}`;
    }
  } else if (location.pathname === "/users") {
    contextText = "User List";
  }

  return (
    <AppBar className="topbar-appBar" position="fixed">
      <Toolbar className="topbar-toolbar">
        <Typography variant="h6" className="topbar-left">
          Nguyễn Duy Tuấn Anh
        </Typography>

        <Typography variant="h6" className="topbar-right" style={{textAlign: "right", marginLeft: "auto"}}>
          {contextText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
