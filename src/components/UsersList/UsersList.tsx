import { useEffect, useState } from "react";

import s from "./UsersList.module.css";
import {
  Post,
  PostsResponse,
  User,
  UsersResponse
} from "../../shared/types/Types";
import { getAllUsers } from "../../hooks/getUsers";
import { UserPosts } from "..";
import { UserComponent } from "../UserComponent/UserComponent";
import myCustomUseState from "../../hooks/useMyCustomState";

export const UsersList = () => {
  const [users, setUsers] = myCustomUseState<User[] | []>([]);
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [skip, setSkip] = myCustomUseState<number>(0);
  const [totalUser, setTotalUser] = myCustomUseState<number>(0);

  const limit = 10;

  const fetchUsers = async () => {
    const { users, total } = await getAllUsers<UsersResponse>(
      `/users?limit=${limit}&skip=${skip}`
    );
    setUsers([...users]);
    setTotalUser(total);
    console.log(totalUser);
  };

  useEffect(() => {
    fetchUsers();
  }, [skip]);

  const getUserPosts = async (id: number) => {
    const { posts } = await getAllUsers<PostsResponse>(`/users/${id}/posts`);
    setUserPosts([...posts]);
  };

  const nextUsers = async () => {
    setSkip((prev) => prev + 10);
  };

  const prevUsers = async () => {
    setSkip((prev) => prev - 10);
  };

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <section className={s.container}>
      <ul className={s.wrapper}>
        {users.map((user) => (
          <UserComponent
            key={user.id}
            user={user}
            getUserPosts={getUserPosts}
          />
        ))}
      </ul>
      <div className={s.buttonWrapper}>
        {skip !== 0 && <button onClick={prevUsers}>prev</button>}
        {skip < totalUser && <button onClick={nextUsers}>Next</button>}
      </div>
      <h2>{`skip ${skip}`}</h2>
      <h2>{`totalUser ${totalUser}`}</h2>
      {userPosts && <UserPosts userPosts={userPosts} />}
    </section>
  );
};
