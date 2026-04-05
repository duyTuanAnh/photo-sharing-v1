import {useState, useEffect} from "react";
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


function UserList () {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      fetchModel("/user/list").then((data) => {
        setUsers(data || []);
      });
    }, []);

    console.log("users: ", users);
    return (
      <div>
        {users.map(user => (
          <div key={user._id}>
            <Link to={`/users/${user._id}`}>
              {user.first_name} {user.last_name}
            </Link>
          </div>
        ))}
      </div>  
    );
}

export default UserList;
