import { useState } from "react";
import "./Comments.css";

// Asegúrate de importar las funciones necesarias de comment.js
import { addCommentToAgrupation } from "../controllers/comments";

function CommentSection({ currentUser, agrupationId }) {
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    try {
      await addCommentToAgrupation(agrupationId, currentUser.uid, newComment);
      console.log("Comentario enviado:", newComment);
      setNewComment("");
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    }
  };

  return (
    <div className="comments-container">
      <div className="new-comment-container">
        <textarea
          className="new-comment-input"
          placeholder="Escriba un comentario..."
          value={newComment}
          onChange={handleCommentChange}
        />
        <button className="submit-comment-button" onClick={handleSubmitComment}>
          Enviar
        </button>
      </div>
    </div>
  );
}

export default CommentSection;
