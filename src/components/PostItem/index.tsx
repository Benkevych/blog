import { Post } from "../../types";
import { useNavigate } from "react-router-dom";
import "./style.css";
interface PostItemProps {
  post: Post;
  showButton?: boolean;
}
function PostItem({ post, showButton = true }: PostItemProps) {
  const navigate = useNavigate();

  const handleButtonClick = (id: number) => {
    navigate(`/post/${id}`);
  };
  return (
    <div className="post">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      {showButton && (
        <button onClick={() => handleButtonClick(post.id)}>Details</button>
      )}
    </div>
  );
}

export default PostItem;
