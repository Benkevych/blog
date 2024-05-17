import { Comment } from "../../types";
import "./style.css";
function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="comment__container">
      <h4>{comment.name}</h4>
      <p className="email">{comment.email}</p>
      <p>{comment.body}</p>
    </div>
  );
}

export default CommentItem;
