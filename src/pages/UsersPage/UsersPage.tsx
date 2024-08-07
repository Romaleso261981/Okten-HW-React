import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getUsers, setCurrentPage } from "../../store/Slices/UsersSlice";
import { UsersList } from "../../components";
import { getAllUsersSelector } from "../../store/Selectors/usersSelector";
import { Pagination } from "../../components/Pagination/Pagination";

const UsersPage = () => {
  const users = useAppSelector(getAllUsersSelector);

  const dispatch = useAppDispatch();

  const itemsPerPage = 5;

  const onPageChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div>
      <UsersList />
      {users.length > 0 && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={users.length}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default UsersPage;
