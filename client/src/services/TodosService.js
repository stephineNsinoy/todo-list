import axios from "axios";
import config from "./config";

const BASE_URL = `${config.API_URL}/api/todos`;

const TodosService = {
  create: (todo) => axios.post(`${BASE_URL}`, todo),
  list: () => axios.get(`${BASE_URL}`),
  retrieveById: (id) => axios.get(`${BASE_URL}/${id}`),
  update: (id, updatedTodo) => axios.put(`${BASE_URL}/${id}`, updatedTodo),
  delete: (id) => axios.delete(`${BASE_URL}/${id}`),
};

export default TodosService;
