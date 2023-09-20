import { toast } from "react-toastify";
import axios from "./axios";
const ADD_TODO_URL = "/todos/add";
const TODO_URL = "/todos";

export const addTodo = async (todoData, token, setText) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(ADD_TODO_URL, todoData, config);
    setText("");
    console.log(response.data);
  } catch (error) {
    console.log(error.response.data.message);
    toast(error.response.data.message);
  }
};

export const getTodo = async (setTodo, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(TODO_URL, config);
  setTodo(response.data);
  return response.data;
};

export const deleteTodo = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(TODO_URL + "/" + id + "/delete", config);

  return response.data;
};

export const updateTodo = async (todoId, text, token, setIsEdit, setText) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    TODO_URL + "/" + todoId + "/update",
    text,
    config
  );
  setIsEdit(false);
  setText("");
  return response.data;
};
