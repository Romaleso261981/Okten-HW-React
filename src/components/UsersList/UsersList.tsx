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
import { Pagination } from "../Pagination/Pagination";

export const UsersList = () => {
  const [users, setUsers] = useState<User[] | []>([]);
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [skipPage, setSkipPage] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);

  const itemsPerPage = 10;

  const limit = 10;

  const fetchUsers = async () => {
    const { users, total } = await getAllUsers<UsersResponse>(
      `/users?limit=${limit}&skip=${skipPage}`
    );
    setUsers([...users]);
    setTotalItems(total);
  };

  useEffect(() => {
    fetchUsers();
  }, [skipPage]);

  const onPageChange = (pageNumber: number) => {
    setSkipPage((pageNumber - 1) * itemsPerPage);
  };

  const getUserPosts = async (id: number) => {
    const { posts } = await getAllUsers<PostsResponse>(`/users/${id}/posts`);
    setUserPosts([...posts]);
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
      {users.length > 0 && (
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      )}
      {userPosts && <UserPosts userPosts={userPosts} />}
    </section>
  );
};
