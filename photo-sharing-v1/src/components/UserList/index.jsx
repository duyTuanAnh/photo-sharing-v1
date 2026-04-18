import { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchModel("/user/list").then((data) => {
      setUsers(data || []);
    });
  }, []);

  console.log("users: ", users);
  return (
    <div>
      {users.map((user) => (
        <div key={user._id} style={{ marginRight: "12px" }}>
          <Link to={`/users/${user._id}`}>
            {user.first_name} {user.last_name}
          </Link>
          <span
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "50%",
              backgroundColor: "green",
              color: "white",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              marginRight: "8px",
              marginLeft: "8px",
            }}
          >
            {user.photoCount}
          </span>
          <Link
            to={`/comments/${user._id}`}
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "50%",
              backgroundColor: "red",
              color: "white",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              textDecoration: "none",
            }}
          >
            {user.commentCount}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default UserList;
