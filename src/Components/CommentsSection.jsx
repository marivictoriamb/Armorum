import { useState, useEffect } from "react";
import "./Comments.css";

// Asegúrate de importar las funciones necesarias de comment.js
import { addCommentToAgrupation, getCommentsByAgrupation } from "../controllers/comments";
import { getUserById, getUserData, getUserIdByUser } from "../controllers/auth";
import { getImageUrl } from "../controllers/files";
import Loader from "./Loader";

function CommentSection({ currentUser, agrupationId }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [names, setNames] = useState([]);
  const [dates, setDates] = useState([]);
  const [done, setDone] = useState(false)

  async function handleCommentChange(event){
    setNewComment(event.target.value);
  };

  async function handleSubmitComment(){
    if (!newComment.trim()) return;

    try {
      setDone(false)
      const userId = await getUserIdByUser(currentUser.uid)
      await addCommentToAgrupation(agrupationId.id, userId, newComment);
      setNewComment("");
      await fetchData()
      setDone(true);
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    }
  };

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    // Choose the desired format options
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    const formattedString = date.toLocaleString('en-US', options);
    return formattedString;
  }

  async function fetchData(){
    const comments = await getCommentsByAgrupation(agrupationId.id);

    if (comments.length != 0) {
      //Comentarios
      const text = await Promise.all(
        comments.map(async (item) => {
          return item.comment;
        })
      );    
      setComments(text)

      // Miembros (fotos y nombre)
      const users = await Promise.all(
        comments.map(async (item) => {
          return await getUserById(item.uid);
        })
      );

      const membersN = await Promise.all(
        users.map(async (item) => {
          return item.name;
        })
      );
      setNames(membersN)

      const membersIm = await Promise.all(
        users.map(async (item) => {
          return await getImageUrl(item.image);
        })
      );
      setPhotos(membersIm)

      // Fechas 
      const date = await Promise.all(
        comments.map(async (item) => {
          return formatTimestamp(item.date.seconds);
        })
      );    
      setDates(date)
     }
     setDone(true)
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
    {done == true ? (
      <div className="comments-container">
      {currentUser == null ? (""):(
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
      )}
        {comments.length == 0 ? (
          <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <div className="comment-text">Se el primero en comentar!</div>
          </div>
        ):(
          <div className="each">
          {comments.map((text, index) => (
            <div className="comment" key={index}>
            <div className="comment-person">
            <img className="comment-avatar" alt="user" src={photos[index]}/>
            <div className="comment-info">
            <div className="comment-author">{names[index]}</div>
            <div className="comment-date">{dates[index]}</div>
            </div>
            </div>
            <div className="comment-content">
            <div className="comment-text">{text}</div>
            </div>
            </div>
          ))}
          
          </div>
        )}
    </div>
    ) : (
      <Loader/>
    )}
    </div>
  );
}

export default CommentSection;
