import { User } from "../../types";
import "./style.css";
import { useNavigate } from "react-router-dom";
function UserItem({ user }: { user: User }) {
  const navigate = useNavigate();

  const handleButtonClick = (id: number, name: string) => {
    navigate(`/posts/${id}/${name}`);
  };

  return (
    <div className="user__container">
      <div className="user_data">
        <h3>
          {user.username} ({user.name})
        </h3>
        <p>
          {user.address.street} St, {user.address.city}{" "}
        </p>
        <p>Email: {user.email}</p>
      </div>
      <button
        className="post-btn"
        onClick={() => handleButtonClick(user.id, user.name)}
      >
        Posts
      </button>
    </div>
  );
}

export default UserItem;
