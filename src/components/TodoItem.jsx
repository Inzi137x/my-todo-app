import React from "react";

const TodoItem = ({ task, onToggle, onRemove }) => {
  return (
    <div className={`todo-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span>{task.text}</span>
      <button onClick={() => onRemove(task.id)}>Remove</button>
    </div>
  );
};

export default TodoItem;
