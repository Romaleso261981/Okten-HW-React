import { FC } from "react";
import s from "./UsersList.module.css";
import { UserPosts } from "..";
import { UserComponent } from "../UserComponent/UserComponent";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getAllUsersSelector } from "../../store/Selectors/usersSelector";
import { getUserPosts } from "../../store/Slices/UsersSlice";

export const UsersList: FC = () => {
  const users = useAppSelector(getAllUsersSelector);

  const { userPosts } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  const getPosts = async (id: number) => {
    dispatch(getUserPosts(id));
  };

  if (!users) {
    return <div>Loading......</div>;
  }

  return (
    <section className={s.container}>
      <ul className={s.wrapper}>
        {users.map((user) => (
          <UserComponent key={user.id} user={user} getUserPosts={getPosts} />
        ))}
      </ul>

      {userPosts && <UserPosts userPosts={userPosts} />}
    </section>
  );
};
