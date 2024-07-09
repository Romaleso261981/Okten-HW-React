import { FC } from "react";
import { TodoType } from "../../shared/types/Types";

type TodoDetailProps = {
  todo: TodoType;
};

export const TodoDetail: FC<TodoDetailProps> = ({ todo }) => {
  return <div>{todo.todo}</div>;
};
