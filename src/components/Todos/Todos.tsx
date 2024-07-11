import { TodoType } from "../../shared/types/Types";
import Todo from "../Todo/Todo";

import s from "./Todos.mudule.css";

export default function Todos({ todosData }: { todosData: TodoType[] }) {
  if (!todosData.length) return <h1>Loading...</h1>;

  return (
    <section className={s.todosWrapper}>
      <ul>
        {todosData.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
}
