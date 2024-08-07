import { FC } from "react";
import { UserFromJsonplaceholder } from "../../shared/types/Types";

import s from "./UserComponent.module.css";

type UserProps = {
  user: UserFromJsonplaceholder;
  getUserPosts: (id: number) => void;
};
export const UserComponent: FC<UserProps> = ({ user, getUserPosts }) => {
  return (
    <li key={user.id} className={s.userWrapper}>
      <h2>{`user.id:  ${user.id}`}</h2>
      <h3>{`firstName:  ${user.username}`}</h3>
      <p>{`Name: ${user.name}`}</p>
      <button onClick={() => getUserPosts(user.id)}>Posts</button>
    </li>
  );
};
