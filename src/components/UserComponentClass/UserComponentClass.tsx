import { Component } from "react";
import s from "./UserComponent.module.css";
import { User } from "../../shared/types/Types";

type UserProps = {
  user: User;
  getUserPosts: (id: number) => void;
};

class UserComponent extends Component<UserProps> {
  constructor(props: UserProps) {
    super(props);
  }

  render() {
    const { user, getUserPosts } = this.props;

    return (
      <li key={user.id} className={s.userWrapper}>
        <h2>{`User ID: ${user.id}`}</h2>
        <h3>{`First Name: ${user.firstName}`}</h3>
        <p>{`Last Name: ${user.lastName}`}</p>
        <button onClick={() => getUserPosts(user.id)}>Posts</button>
      </li>
    );
  }
}

export default UserComponent;
