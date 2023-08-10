import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

function Todos({ text, deleteTodo, editMode, isEdit }) {
  return (
    <div className="todo">
      <h3 className="todo_text">{text}</h3>
      <div className="icons">
        <FaRegEdit className="icon" onClick={editMode} />
        <FiTrash2 className="icon" onClick={deleteTodo} />
      </div>
    </div>
  );
}

export default Todos;
