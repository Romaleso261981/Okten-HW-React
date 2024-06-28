import { FC } from "react";
import { User } from "../../shared/types/Types";

import s from "./UserComponent.module.css";

type UserProps = {
  user: User;
  getUserPosts: (id: number) => void;
};
export const UserComponent: FC<UserProps> = ({ user, getUserPosts }) => {
  return (
    <li key={user.id} className={s.userWrapper}>
      <h2>{`user.id:  ${user.id}`}</h2>
      <h3>{`firstName:  ${user.firstName}`}</h3>
      <p>{`lastName: ${user.lastName}`}</p>
      <button onClick={() => getUserPosts(user.id)}>Posts</button>
    </li>
  );
};
