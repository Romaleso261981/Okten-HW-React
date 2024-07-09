import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TodoType } from "../../shared/types/Types";
import { API } from "../../API";
import { TodoDetail } from "../../components";

const TodoDetailPage = () => {
  const [todoData, setTodoData] = useState<TodoType>({} as TodoType);

  const { id } = useParams<{ id: string }>();

  const getTodo = async () => {
    const { data } = await API.get(`/todos/${id}`);
    setTodoData(data);
  };

  useEffect(() => {
    getTodo();
  }, [id]);

  return (
    <section>
      <TodoDetail todo={todoData} />
    </section>
  );
};

export default TodoDetailPage;
