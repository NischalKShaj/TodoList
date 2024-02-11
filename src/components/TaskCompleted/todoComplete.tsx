import React from "react";
import { TodoListTask } from "../types";
import { FontIcon } from "@fluentui/react";

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
    <div>
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id}>
            {task.Task}
            <FontIcon
              iconName="Delete"
              onClick={() => handleDeleteCompletedTask(task.id)}
              style={{ cursor: "pointer" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoComplete;
