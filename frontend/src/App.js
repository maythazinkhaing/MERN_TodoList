// const Todos = require("./components/Todos");
import { useEffect, useState } from "react";
import Todos from "./components/Todos";
import { getTodo, addTodo, deleteTodo, updateTodo } from "./util/HandleAPI";

function App() {
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [todoId, setTodoId] = useState("");

  useEffect(() => {
    getTodo(setTodo);
  }, []);

  const editMode = (id, text) => {
    setIsEdit(true);
    setTodoId(id);
    setText(text);
  };

  return (
    <div>
      <div className="container">
        <h1 className="header">To-Do Lists</h1>
        <div className="input_form">
          <input
            type="text"
            placeholder="Add to-do"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input_text"
          />

          <button
            className="add_Button"
            onClick={
              isEdit
                ? () => updateTodo(todoId, text, setText, setTodo, setIsEdit)
                : (e) => addTodo(text, setTodo, setText, e)
            }
          >
            {isEdit ? "Update" : "Add"}
          </button>
        </div>
        <div className="list">
          {todo.map((item) => {
            return (
              <Todos
                key={item._id}
                text={item.text}
                deleteTodo={() => deleteTodo(item.todo_id, setTodo)}
                editMode={() => editMode(item.todo_id, item.text)}
                isEdit={isEdit}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
