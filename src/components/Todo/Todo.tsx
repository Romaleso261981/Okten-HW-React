import { FC } from "react";
import { TodoType } from "../../shared/types/Types";
import { Link } from "react-router-dom";

type TodoProps = {
  todo: TodoType;
};

const Todo: FC<TodoProps> = ({ todo }) => {
  return (
    <div>
      <Link to={todo.id.toString()}>{todo?.todo}</Link>;
    </div>
  );
};

export default Todo;
