import { Component } from "react";
import s from "./UsersList.module.css";
import {
  Post,
  PostsResponse,
  User,
  UsersResponse
} from "../../shared/types/Types";
import { getAllUsers } from "../../hooks/getUsers";
import { UserPosts } from "..";
import UserComponent from "../UserComponentClass/UserComponentClass";

interface UsersListProps {}

interface UsersListState {
  users: User[];
  userPosts: Post[] | null;
  skip: number;
  totalUser: number;
}

class UsersList extends Component<UsersListProps, UsersListState> {
  limit: number;

  constructor(props: UsersListProps) {
    super(props);
    this.state = {
      users: [],
      userPosts: null,
      skip: 0,
      totalUser: 0
    };
    this.limit = 10;
  }

  componentDidMount() {
    this.fetchUsers();
  }

  componentDidUpdate(prevProps: UsersListProps, prevState: UsersListState) {
    if (prevState.skip !== this.state.skip) {
      console.log("prevState", prevState);
      console.log("prevProps", prevProps);
      this.fetchUsers();
    }
  }

  fetchUsers = async () => {
    const { users, total } = await getAllUsers<UsersResponse>(
      `/users?limit=${this.limit}&skip=${this.state.skip}`
    );
    this.setState({ users, totalUser: total });
  };

  getUserPosts = async (id: number) => {
    const { posts } = await getAllUsers<PostsResponse>(`/users/${id}/posts`);
    this.setState({ userPosts: posts });
  };

  nextUsers = () => {
    this.setState((prevState) => ({ skip: prevState.skip + 10 }));
  };

  prevUsers = () => {
    this.setState((prevState) => ({ skip: prevState.skip - 10 }));
  };

  render() {
    const { users, userPosts, skip, totalUser } = this.state;

    if (!users.length) {
      return <div className={s.loading}>Loading...</div>;
    }

    return (
      <section className={s.container}>
        <ul className={s.wrapper}>
          {users.map((user) => (
            <UserComponent
              key={user.id}
              user={user}
              getUserPosts={this.getUserPosts}
            />
          ))}
        </ul>
        <div className={s.buttonWrapper}>
          {skip !== 0 && <button onClick={this.prevUsers}>Prev</button>}
          {skip + this.limit < totalUser && (
            <button onClick={this.nextUsers}>Next</button>
          )}
        </div>
        <h2>{`Skip ${skip}`}</h2>
        <h2>{`Total User ${totalUser}`}</h2>
        {userPosts && <UserPosts userPosts={userPosts} />}
      </section>
    );
  }
}

export default UsersList;
