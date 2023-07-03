import { useState } from "react";

import { TodosService } from "../services";

const useCreateTodo = () => {
  const [isCreating, setIsCreating] = useState(false);

  const createTodo = async (todo) => {
    setIsCreating(true);

    let responseCode;

    try {
      const response = await TodosService.create(todo);

      responseCode = response.status;
    } catch (error) {
      responseCode = error.response.status;
    }

    setIsCreating(false);

    return { responseCode };
  };

  return { isCreating, createTodo };
};

export default useCreateTodo;
