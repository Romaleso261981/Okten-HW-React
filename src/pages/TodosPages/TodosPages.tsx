import { useEffect, useState } from "react";
import { API } from "../../API";
import Todos from "../../components/Todos/Todos";
import { TodoType } from "../../shared/types/Types";
import { Pagination } from "../../components/Pagination/Pagination";

const TodosPages = () => {
  const [todosData, setTodosData] = useState<TodoType[]>([]);
  const [skipPage, setSkipPage] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 10;

  const onPageChange = (pageNumber: number) => {
    setSkipPage((pageNumber - 1) * itemsPerPage);
  };

  const getTodos = async () => {
    const {
      data: { todos, total }
    } = await API.get(`/todos?skip=${skipPage}&limit=10`);
    setTodosData(todos);
    setTotalItems(total);
  };

  useEffect(() => {
    getTodos();
  }, [skipPage]);

  return (
    <>
      <Todos todosData={todosData} />
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default TodosPages;
