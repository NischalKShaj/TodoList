import { Checkbox, FontIcon, initializeIcons } from "@fluentui/react";
import TodoForm from "../TaskForm/todoForm";
import React from "react";
import { TodoListTask } from "../types";

initializeIcons();

interface TaskListProps {
  tasks: TodoListTask[];
  setTask: React.Dispatch<React.SetStateAction<TodoListTask[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTask }) => {
  const handleCheckBoxState = (id: string, isChecked: boolean) => {
    setTask((prevTask) =>
      prevTask.map((task) =>
        task.id === id ? { ...task, isCompleted: isChecked } : task
      )
    );
  };

  return (
    <div>
      {tasks.map((item) => (
        <div key={item.id}>
          <Checkbox
            checked={item.isCompleted}
            onChange={(_, checked) =>
              handleCheckBoxState(item.id, checked ?? false)
            }
          />
          <span>{item.Task}</span>
          <FontIcon iconName="Info" />
          <FontIcon iconName="EditNote" />
          <FontIcon iconName="Delete" />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
