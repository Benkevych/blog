import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getUsersList } from "../../features/usersSlice";
import { useEffect } from "react";
import UserItem from "../UserItem/UserItem";
function UsersList() {
  const users = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);
  return (
    <div>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UsersList;
