import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getUsers } from "../../store/Slices/UsersSlice";
import { UsersList } from "../../components";
import { getAllUsersSelector } from "../../store/Selectors/usersSelector";
// import { Pagination } from "../../components/Pagination/Pagination";

const UsersPage = () => {
  const users = useAppSelector(getAllUsersSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  console.log(users);

  return (
    <div>
      <UsersList />
      {/* {users.length > 0 && <Pagination />} */}
    </div>
  );
};

export default UsersPage;
