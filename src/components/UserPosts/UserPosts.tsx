import { FC } from "react";
import { Post } from "../../shared/types/Types";

import s from "./UserPosts.module.css";

type UserPostsProps = {
  userPosts: Post[];
};

export const UserPosts: FC<UserPostsProps> = ({ userPosts }) => {
  if (!userPosts) {
    return <div>Loading...</div>;
  }

  if (userPosts.length === 0) {
    return <div className={s.noPost}>No posts</div>;
  }
  return (
    <section className={s.postsWrapper}>
      <ul>
        {userPosts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
