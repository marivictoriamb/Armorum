import { db } from "../firebase.js";
import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
  orderBy,
  Timestamp,
} from "firebase/firestore";

export async function getCommentsByAgrupation(agrupationId) {
  const commentsCollection = collection(db, "comments");
  const commentsQuery = query(
    commentsCollection,
    where("agrupationId", "==", agrupationId),
    orderBy("date", "desc")
  );
  const commentsSnapshot = await getDocs(commentsQuery);
  const comments = commentsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return comments;
}

export async function addCommentToAgrupation(
  agrupationId,
  userId,
  commentText
) {
  const commentsCollection = collection(db, "comments");
  const newComment = {
    agrupationId: agrupationId,
    uid: userId,
    comment: commentText,
    date: Timestamp.now(),
  };
  const commentDocRef = await addDoc(commentsCollection, newComment);
  return commentDocRef.id;
}

export async function updateComment(commentId, newCommentText) {
  const commentRef = doc(db, "comments", commentId);
  await updateDoc(commentRef, {
    comment: newCommentText,
    date: Timestamp.now(),
  });
}

export async function deleteComment(commentId) {
  const commentRef = doc(db, "comments", commentId);
  await deleteDoc(commentRef);
}

export async function getCommentById(commentId) {
  const commentRef = doc(db, "comments", commentId);
  const commentSnapshot = await getDoc(commentRef);
  return commentSnapshot.exists()
    ? { id: commentSnapshot.id, ...commentSnapshot.data() }
    : null;
}
