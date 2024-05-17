import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { getPostsList } from "../../features/postsSlice";
import { useEffect, useState } from "react";
import PostItem from "../../components/PostItem";
import "./style.css";
import AddPostModal from "../../components/AddPostModal";

function Posts() {
  const [isOpened, setIsOpened] = useState(false);
  const { userId, userName } = useParams();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (userId) dispatch(getPostsList(+userId));
  }, [dispatch, userId]);

  const userIdNumber = userId ? parseInt(userId, 10) : 0;

  return (
    <div className="posts__container">
      <h2>{userName} Posts</h2>
      <button className="add-btn" onClick={() => setIsOpened(true)}>
        Add New Post
      </button>
      {isOpened && (
        <AddPostModal userId={userIdNumber} openModal={setIsOpened} />
      )}
      <div className="post_items">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Posts;
