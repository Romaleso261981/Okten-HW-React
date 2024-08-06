import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getAllUsers } from "../../store/Selectors/usersSelector";
import { getUsers } from "../../store/Slices/UsersSlice";

const UsersPage = () => {
  const users = useAppSelector(getAllUsers);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return <div>{JSON.stringify(users)}</div>;
};

export default UsersPage;
