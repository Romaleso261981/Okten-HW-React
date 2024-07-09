import { TodoType } from "../../shared/types/Types";
import Todo from "../Todo/Todo";

export default function Todos({ todosData }: { todosData: TodoType[] }) {
  console.log(todosData);

  if (!todosData.length) return <h1>Loading...</h1>;

  return todosData.map((todo) => <Todo key={todo.id} todo={todo} />);
}
