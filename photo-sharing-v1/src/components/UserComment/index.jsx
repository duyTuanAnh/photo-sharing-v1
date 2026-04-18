import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserComments() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await fetchModel(`/user/${userId}`);
        setUser(userData);

        const commentsData = await fetchModel(`/commentsOfUser/${userId}`);
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching user comments:", error);
        setUser(null);
        setComments([]);
      }
    };

    loadData();
  }, [userId]);

  return (
    <div>
      <h2>
        {user
          ? `${user.first_name} ${user.last_name}'s Comments`
          : "Loading..."}
      </h2>

      {comments.map((item) => (
        <div key={item._id} style={{ marginBottom: "20px" }}>
          <Link
            to={`/photos/${item.photo.user_id}`}
            state={{ selectedPhotoId: item.photo._id }}
          >
            <img
              src={`https://x6vsmn-8081.csb.app/images/${item.photo.file_name}`}
              alt={item.photo.file_name}
              style={{ width: "120px" }}
            />
          </Link>

          <div>
            <Link
              to={`/photos/${item.photo.user_id}`}
              state={{ selectedPhotoId: item.photo._id }}
            >
              {item.comment}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserComments;
