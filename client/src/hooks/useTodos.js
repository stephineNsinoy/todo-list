import { useState, useEffect } from "react";

import { TodosService } from "../services";

const useTodos = (isCreating, isUpdating, isDeleting) => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const { data: getTodoResponse } = await TodosService.list();

      if (getTodoResponse) {
        setTodos(getTodoResponse);
      }

      setIsLoading(false);
    };

    getTodos();
  }, [isCreating, isUpdating, isDeleting]);

  return { isLoading, todos };
};

export default useTodos;
