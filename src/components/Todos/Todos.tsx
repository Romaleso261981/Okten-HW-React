import { TodoType } from "../../shared/types/Types";
import Todo from "../Todo/Todo";

import s from "./Todos.mudule.css";

export default function Todos({ todosData }: { todosData: TodoType[] }) {
  console.log(todosData);

  if (!todosData.length) return <h1>Loading...</h1>;

  return (
    <section className={s.todosWrapper}>
      <h1>Todos</h1>
      <ul>
        {todosData.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
}
