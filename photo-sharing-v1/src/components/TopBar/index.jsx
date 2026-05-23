import {useState, useEffect} from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useLocation, matchPath, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import models from "../../modelData/models";

function TopBar({ curUser, onLogout }) {
  const location = useLocation();
  const [contextText, setContextText] = useState("");

  useEffect(() => {
    const userDetailMatch = matchPath("/users/:userId", location.pathname);
    const userPhotosMatch = matchPath("/photos/:userId", location.pathname);
    const userCommentsMatch = matchPath("/comments/:userId", location.pathname);

    async function loadContextText() {
      if (userDetailMatch) {
        const userId = userDetailMatch.params.userId;
        const user = await fetchModel(`/user/${userId}`);
        if (user) {
          setContextText(`${user.first_name} ${user.last_name}`);
        }
      } else if (userPhotosMatch) {
        const userId = userPhotosMatch.params.userId;
        const user = await fetchModel(`/user/${userId}`);
        if (user) {
          setContextText(`Photos of ${user.first_name} ${user.last_name}`);
        }
      } else if (userCommentsMatch) {
        const userId = userCommentsMatch.params.userId;
        const user = await fetchModel(`/user/${userId}`);
        if (user) {
          setContextText(`Comments of ${user.first_name} ${user.last_name}`);
        }
      } else setContextText("");
    }

    loadContextText();
  }, [location.pathname]);

  return (
    <AppBar className="topbar-appBar" position="fixed">
      <Toolbar className="topbar-toolbar">
        <Typography variant="h6" className="topbar-left">
          Nguyễn Duy Tuấn Anh
        </Typography>

        <Typography
          variant="h6"
          className="topbar-right"
          style={{ textAlign: "center", marginLeft: "auto" }}
        >
          {contextText}
        </Typography>

        {curUser ? (
          <>
            <Typography
              variant="body1"
              style={{ textAlign: "right", marginLeft: "auto" }}
              className="topbar-left"
            >
              <h3>Hi {curUser.first_name} </h3>
            </Typography>

            <Button variant="contained" color="secondary" onClick={onLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Typography variant="body1">
            <Link to="/login">Please Login</Link>
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
