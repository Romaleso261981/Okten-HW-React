import { TodosType } from "../../shared/types/Types";

export default function Todos({ todosData }: { todosData: TodosType[] }) {
  console.log(todosData);

  if (!todosData.length) return <h1>Loading...</h1>;

  return todosData.map((todo) => (
    <div key={todo.id}>
      <h3>{todo.todo}</h3>
    </div>
  ));
}
