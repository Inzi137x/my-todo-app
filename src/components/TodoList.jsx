import React, { useState } from "react";
import TodoItem from "./TodoItem";
import useLocalStorage from "../components/useLocalStorage";

const TodoList = () => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (inputValue.trim()) {
      const newTask = { id: Date.now(), text: inputValue, completed: false };
      setTasks([...tasks, newTask]);
      setInputValue("");
    } else {
      console.log("Task input is empty or whitespace. Task not added.");
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }
    if (filter === "incomplete") {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className="todo-list">
      <h1>TODO LIST</h1>
      <div className="input-box">
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <button className="task-button" onClick={addTask}>
          ADD ITEM
        </button>
        <div className="filter-buttons">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
          <button onClick={() => setFilter("incomplete")}>Incomplete</button>
        </div>
      </div>
      {filteredTasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={toggleTask}
          onRemove={removeTask}
        />
      ))}
    </div>
  );
};

export default TodoList;
