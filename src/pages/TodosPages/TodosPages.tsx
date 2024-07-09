import { useEffect, useState } from "react";
import { API } from "../../API";
import Todos from "../../components/Todos/Todos";
import { TodoType } from "../../shared/types/Types";

const TodosPages = () => {
  const [todosData, setTodosData] = useState<TodoType[]>([]);

  const getTodos = async () => {
    const {
      data: { todos }
    } = await API.get("/todos");
    setTodosData(todos);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return <Todos todosData={todosData} />;
};

export default TodosPages;
