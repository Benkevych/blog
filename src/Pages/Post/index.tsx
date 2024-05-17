import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { getCommentsList } from "../../features/commentsSlice";
import { useEffect, useState } from "react";
import CommentItem from "../../components/CommentItem";
import PostItem from "../../components/PostItem";
import { selectPostById, deletePost } from "../../features/postsSlice";
import "./style.css";
import AddPostModal from "../../components/AddPostModal";

function Post() {
  const [openModal, setOpenModal] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const comments = useSelector((state: RootState) => state.comments.comments);
  const postIdNumber = postId ? +postId : 0;
  const post = useSelector((state: RootState) =>
    selectPostById(postIdNumber)(state)
  );
  useEffect(() => {
    if (postId) dispatch(getCommentsList(+postId));
  }, [dispatch, postId]);

  const handleDelete = async (postId: number) => {
    console.log(await dispatch(deletePost(postId)));
    navigate("/");
  };

  return (
    <div className="post__container">
      <div className="post-details">
        {post && <PostItem post={post} showButton={false} />}
      </div>
      {openModal && (
        <AddPostModal
          openModal={setOpenModal}
          newPost={false}
          userId={post?.userId ? post.userId : 0}
          id={post?.id}
        />
      )}
      <div className="comment-btns">
        <button onClick={() => handleDelete(postIdNumber)}>Delete post</button>
        <button onClick={() => setOpenModal(true)}>Edit post</button>
      </div>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <CommentItem comment={comment} key={comment.id} />
      ))}
    </div>
  );
}

export default Post;
