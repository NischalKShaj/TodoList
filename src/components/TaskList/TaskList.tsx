import { Checkbox, FontIcon, initializeIcons } from "@fluentui/react";
import React, { useState } from "react";
import { TodoListTask } from "../types";

initializeIcons();

interface TaskListProps {
  tasks: TodoListTask[];
  setTask: React.Dispatch<React.SetStateAction<TodoListTask[]>>;
  completedTasks: TodoListTask[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<TodoListTask[]>>;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  setTask,
  completedTasks,
  setCompletedTasks,
}) => {
  const [editedTask, setEditedTask] = useState({
    id: "",
    newTaskName: "",
    newDescription: "",
  });

  const handleCheckBoxState = (id: string, isChecked: boolean) => {
    setTask((prevTask) => {
      const updatedTask = prevTask.map((task) =>
        task.id === id ? { ...task, isCompleted: isChecked } : task
      );
      const completeTask = prevTask.find((task) => task.id === id && isChecked);

      if (completeTask) {
        setCompletedTasks((prevCompletedTask) => [
          ...prevCompletedTask,
          completeTask,
        ]);
      }
      return updatedTask.filter((tasks) => tasks.id !== id && !isChecked);
    });
  };

  const handleDeleteTask = (id: string) => {
    setTask((prevTask) => prevTask.filter((task) => task.id !== id));
  };

  const handleEditTask = (
    id: string,
    newTaskName: string,
    newDescription: string
  ) => {
    setTask((prevTask) =>
      prevTask.map((task) =>
        task.id === id
          ? { ...task, Task: newTaskName, descripiton: newDescription }
          : task
      )
    );
    setEditedTask({ id: "", newTaskName: "", newDescription: "" });
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
          <FontIcon iconName="Info" title={item.description} style={{cursor:"pointer"}}/>
          <input
            id={`nameInput-${item.id}`}
            type="text"
            value={editedTask.newTaskName || item.Task}
            onChange={(e) =>
              setEditedTask({
                ...editedTask,
                id: item.id,
                newTaskName: e.target.value,
              })
            }
            style={{ display: "none" }}
          />

          <textarea
            id={`descriptionInput-${item.id}`}
            onChange={(e) =>
              setEditedTask({
                ...editedTask,
                id: item.id,
                newDescription: e.target.value,
              })
            }
            style={{ display: "none" }}
          />
          <FontIcon
            iconName="EditNote"
            onClick={() => {
              const nameInputField = document.getElementById(
                `nameInput-${item.id}`
              ) as HTMLInputElement;
              const descriptionInputField = document.getElementById(
                `descriptionInput-${item.id}`
              ) as HTMLTextAreaElement;

              if (nameInputField && descriptionInputField) {
                nameInputField.style.display =
                  nameInputField.style.display === "none" ? "block" : "none";
                descriptionInputField.style.display =
                  descriptionInputField.style.display === "none"
                    ? "block"
                    : "none";
              }
            }}
            style={{ cursor: "pointer" }}
          />

          <FontIcon
            iconName="Delete"
            onClick={() => handleDeleteTask(item.id)}
            style={{ cursor: "pointer" }}
          />
          <FontIcon
            iconName="Save"
            onClick={() =>
              handleEditTask(
                editedTask.id,
                editedTask.newTaskName,
                editedTask.newDescription
              )
            }
            style={{ cursor: "pointer" }}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
