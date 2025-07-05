import { useEffect, useState } from "react";
import { getCommentsForPost, postComment } from "./DataService";

export type Comment = {
  content: string;
  date: number;
};

const PostWithComment = (props: {
  content: string;
  user: string;
  id: string;
}) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [errorState, setErrorState] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await getCommentsForPost(props.id);
        sortCommentBydate(comments);
        setComments(comments);
      } catch (error) {
        console.error((error as Error).message);
        setErrorState("Error while getting comments!");
      }
    };
    fetchComments();
  }, [props.id]);
  return (
    <div>
      <div data-testid="post-container">
        <h2>{props.user}:</h2>
        <p>{props.content}</p>
      </div>
      <label style={{ color: "red" }} data-testid="error-label">
        {errorState}
      </label>
      <div data-testid="comment-container">
        <input
          data-testid="comment-input"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={() => {
            const now = new Date().getTime();
            comments.push({
              content: comment,
              date: now,
            });
            setComment("");
            postComment(props.id, comment, now);
          }}
        >
          Comment
        </button>
        <div data-testid="post-comment-container">
          {comments.map((comment, index) => (
            <p data-testid="comment-text" key={index}>
              {comment.content}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostWithComment;

function sortCommentBydate(comments: Comment[]) {
  return comments?.sort((a, b) => b.date - a.date);
}
