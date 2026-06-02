import { useState, useEffect } from "react";
import "./styles.css";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import AddComment from "../../components/AddComment";

function UserPhotos({ photoRefresh, currentUser }) {
  const { userId } = useParams();

  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel(`/photosOfUser/${userId}`).then((data) => {
      setPhotos(data || []);
    });

    fetchModel(`/user/${userId}`).then((data) => {
      setUser(data || null);
    });
  }, [userId, photoRefresh]);

  function formatDateTime(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const handleCommentAdded = (photoId, newComment) => {
    setPhotos((pre) =>
      pre.map((photo) => {
        if (photo._id === photoId) {
          return {
            ...photo,
            comments: [...(photo.comments || []), newComment],
          };
        }
        return photo;
      })
    );
  };

  const handleDeletePhoto = async (photoId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://nws8dc-8081.csb.app/api/photo/${photoId}`,{
        method: "DELETE",
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })

      setPhotos((prev) =>
        prev.filter((photo) => photo._id !== photoId)
      );
    }catch(error){
      console.log(error);
    }
  };

  return (
    <>
      <h2>
        {user ? `${user.first_name} ${user.last_name}'s Photos` : "Loading..."}
      </h2>

      {photos.map((photo) => (
        <div key={photo._id} style={{ marginBottom: "30px" }}>
          <hr />
          <img
            src={`https://nws8dc-8081.csb.app/images/${photo.file_name}`}
            alt=""
            style={{ maxWidth: "400px" }}
          />

          <h2>Created at: {formatDateTime(photo.date_time)}</h2>

          {photo.user_id === currentUser._id && (
            <button onClick={()=>handleDeletePhoto(photo._id)}>Delete</button>
          )}
          <div style={{ marginLeft: "20px" }}>
            {(photo.comments || []).length === 0 && <h4>No comments</h4>}

            {(photo.comments || []).map((c) => (
              <div key={c._id} style={{ marginBottom: "10px" }}>
                <h4>Comment:</h4>

                <p>{c.comment}</p>

                <p>
                  <b>From </b>
                  <Link to={`/users/${c.user._id}`}>
                    {c.user.first_name} {c.user.last_name}
                  </Link>
                  {" at: "}
                  {formatDateTime(c.date_time)}
                </p>
              </div>
            ))}
          </div>
          <AddComment photoId={photo._id} onCommentAdded={handleCommentAdded} />
        </div>
      ))}
    </>
  );
}

export default UserPhotos;
