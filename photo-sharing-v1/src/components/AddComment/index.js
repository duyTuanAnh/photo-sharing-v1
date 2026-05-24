import { useState, useEffect } from "react";

function AddComment({ photoId, onCommentAdded }) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("Comment must have content");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `https://x6vsmn-8081.csb.app/api/commentsOfPhoto/${photoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ comment: comment }),
        }
      );

      if (!res.ok) {
        setError("Failed to add comment");
        return;
      }
      const newComment = await res.json();
      onCommentAdded(photoId, newComment);
      setComment("");
    } catch (error) {
      console.log("ascnaj: error ");
      setError("Faild fetch");
    }
  };

  return (
    <div>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <button onClick={handleAddComment}>Add</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default AddComment;
