import { FormEvent } from "react";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Post } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addPost, editPost } from "../../features/postsSlice";
import "./style.css";
type OpenModalFunction = React.Dispatch<React.SetStateAction<boolean>>;

interface AddPostModalProps {
  userId: number;
  openModal: OpenModalFunction;
  newPost?: boolean;
  id?: number;
}

function AddPostModal({
  userId,
  openModal,
  newPost = true,
  id = 0,
}: AddPostModalProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const postData: Post = {
      userId: userId,
      id, // API саме генерує id не залежно від того, яке id я передав
      title,
      body,
    };
    if (newPost) {
      await dispatch(addPost(postData));
    } else {
      await dispatch(editPost(postData));
    }
    openModal(false);
  };

  return (
    <div className="postModal__container">
      <IoCloseSharp
        onClick={() => openModal(false)}
        size={32}
        className="close-btn"
      />
      <h3>Enter post data</h3>
      <form onSubmit={handleSubmit} className="postModal-form">
        <label>
          Enter title:
          <input
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Enter content:
          <textarea
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddPostModal;
