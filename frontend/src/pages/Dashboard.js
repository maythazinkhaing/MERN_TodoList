import React from "react";
import { useState, useContext } from "react";
import Todos from "../components/Todos";
import AuthContext from "../features/authProvider";
import { addTodo, getTodo, deleteTodo, updateTodo } from "../util/HandleTodo";

function Dashboard() {
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [todoId, setTodoId] = useState("");

  const { auth } = useContext(AuthContext);
  const { username, token } = auth.user;

  getTodo(setTodo, token);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(token);

    if (isEdit) {
      updateTodo(todoId, { text }, token, setIsEdit, setText);
    } else {
      addTodo({ text }, token, setText);
    }

    // setText("");
  };

  const editMode = (id, text) => {
    setIsEdit(true);
    setTodoId(id);
    setText(text);
  };

  return (
    <div>
      <div className="todo_container">
        <h3 className="sub-title">WELCOME</h3>
        <h1 className="title"> {username} !</h1>

        <form onSubmit={onSubmit} className="input_form">
          <input
            type="text"
            placeholder="Add to-do"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input_text"
          />

          <button className="add_Button" type="submit">
            {isEdit ? "Update" : "Add"}
          </button>
        </form>
        <div className="list">
          {todo.length > 0 ? (
            <>
              {todo.map((item) => {
                return (
                  <Todos
                    key={item._id}
                    text={item.text}
                    deleteTodo={() => deleteTodo(item._id, token)}
                    editMode={() => editMode(item._id, item.text)}
                  />
                );
              })}
            </>
          ) : (
            <h3 className="description">
              You doesn't have any to-do lists yet!
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
