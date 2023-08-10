import axios from "axios";

const url = "http://localhost:8000/api/todos";

export const getTodo = async (setTodo) => {
  const response = await axios.get(url);
  setTodo(response.data);
};

export const addTodo = async (text, setTodo, setText, e) => {
  e.preventDefault();

  try {
    const response = await axios.post(`${url}/add`, { text });
    setText("");

    getTodo(setTodo);
    console.log("Todo created successfully:", response.data);

    // Handle successful response or perform any other actions here
  } catch (error) {
    console.error("Error creating goal:", error);
    // Handle error or perform any other actions here
  }
};

export const updateTodo = async (id, text, setText, setTodo, setIsEdit) => {
  try {
    const response = await axios.put(`${url}/${id}/update`, { text });
    setText("");
    getTodo(setTodo);
    setIsEdit(false);
    console.log("Todo updated successfully:", response.data);

    // Handle successful response or perform any other actions here
  } catch (error) {
    console.error("Error updating Todo:", error);
    // Handle error or perform any other actions here
  }
};

export const deleteTodo = async (id, setTodo) => {
  try {
    const response = await axios.delete(`${url}/${id}/delete`);
    getTodo(setTodo);
    console.log("Todo deleted successfully:", response.data);

    // Handle successful response or perform any other actions here
  } catch (error) {
    console.error("Error deleting Todo:", error);
    // Handle error or perform any other actions here
  }
};
