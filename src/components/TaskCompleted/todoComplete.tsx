import React from "react";
import { TodoListTask } from "../types";
import { FontIcon } from "@fluentui/react";
import "./todoCompletedTask.css";

interface TodoCompleteProps {
  completedTasks: TodoListTask[];
  setCompletedTask: React.Dispatch<React.SetStateAction<TodoListTask[]>>;
}

const TodoComplete: React.FC<TodoCompleteProps> = ({
  completedTasks,
  setCompletedTask,
}) => {
  const handleDeleteCompletedTask = (id: string) => {
    setCompletedTask((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };
  return (
    <div className="completedTaskBox">
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id}>
            <div className="task-box">
              {task.Task}
              <FontIcon
                iconName="Delete"
                onClick={() => handleDeleteCompletedTask(task.id)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoComplete;
