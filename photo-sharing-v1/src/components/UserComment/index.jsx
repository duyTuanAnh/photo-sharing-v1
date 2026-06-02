import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserComments() {
  const { userId } = useParams();
  const [user, setUser] = useState();
  const [comments, setComments] = useState([]);

  const loadData = async () => {
    try {
      const userData = await fetchModel(`/user/${userId}`);
      setUser(userData);

      const commentData = await fetchModel(`/commentsOfUser/${userId}`);
      setComments(commentData);
    } catch (error) {
      setUser(null);
      setComments([]);
    }
  };

  useEffect(() => {
    loadData();
  }, [userId]);

  const handleDeleteComment = async (commentId, photoId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://nws8dc-8081.csb.app/api/comment/${commentId}/ofPhoto/${photoId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        console.log("ok");
        loadData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>
        {user
          ? `${user.first_name} ${user.last_name}'s Comments`
          : "Loading..."}
      </h2>

      {comments.map((item) => (
        <div key={item._id}>
          <Link to={`/photos/${item.photo.user_id}`}>
            <img
              src={`https://nws8dc-8081.csb.app/images/${item.photo.file_name}`}
              style={{ width: "120px" }}
            />
          </Link>

          <div>
            <Link to={`/photos/${item.photo.user_id}`}>{item.comment}</Link>
            <button
              onClick={() => handleDeleteComment(item._id, item.photo._id)}
              style={{ marginLeft: "12px" }}
            >
              Delete
            </button>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
}

export default UserComments;
