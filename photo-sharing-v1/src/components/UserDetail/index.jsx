import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import "./styles.css";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserDetail({ currentUser }) {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel(`/user/${userId}`).then((data) => {
      setUser(data || null  );
    });
  }, [userId]);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <h2>{user.first_name} {user.last_name}</h2>

      <p>First Name: {user.first_name}</p>
      <p>Last Name: {user.last_name}</p>
      <p>Location: {user.location}</p>
      <p>Occupation: {user.occupation}</p>
      <p>Description: {user.description}</p>

      <Link
        to={`/photos/${user._id}`}
        style={{padding: 8}}
      >
        View Photos
      </Link>
      {currentUser._id == userId && (<Link to={`/comments/${user._id}`}> View Comments</Link>)}
      
    </div>
  );
}

export default UserDetail;