import { FC } from "react";
import { TodoType } from "../../shared/types/Types";
import { Link } from "react-router-dom";
import s from "./Todo.module.css"; // Підключення стилів

type TodoProps = {
  todo: TodoType;
};

const Todo: FC<TodoProps> = ({ todo }) => {
  return (
    <li className={s.todoItem}>
      <Link to={todo.id + ""}>
        <span className={s.todoText}>{todo?.todo}</span>
        <span
          className={`${s.statusBox} ${
            todo?.completed ? s.completed : s.notCompleted
          }`}
        ></span>
      </Link>
    </li>
  );
};

export default Todo;
