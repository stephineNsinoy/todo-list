import { useState } from "react";

import { TodosService } from "../services";

const useUpdateTodo = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateTodo = async (todoId, updatedTodo) => {
    setIsUpdating(true);

    let responseCode;

    try {
      const response = await TodosService.update(todoId, updatedTodo);

      responseCode = response.status;
    } catch (error) {
      responseCode = error.response.status;
    }

    setIsUpdating(false);

    return { responseCode };
  };

  return { isUpdating, updateTodo };
};

export default useUpdateTodo;
