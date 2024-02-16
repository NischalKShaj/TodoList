import { Checkbox, FontIcon, initializeIcons } from "@fluentui/react";
import React, { useState } from "react";
import { TodoListTask } from "../types";
import "./TaskList.css";

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

      if (isChecked) {
        const completeTask = updatedTask.find((task) => task.id === id);
        if (completeTask) {
          setCompletedTasks((prevCompletedTask) => [
            ...prevCompletedTask,
            completeTask,
          ]);
        }
      }

      return updatedTask.filter((task) => task.isCompleted || task.id !== id);
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
        <div key={item.id} className="task-box">
          <Checkbox
            checked={item.isCompleted}
            onChange={(_, checked) =>
              handleCheckBoxState(item.id, checked ?? false)
            }
          />
          <span>{item.Task}</span>
          <div className="taskIcon">
            <FontIcon
              iconName="Info"
              title={item.description}
              style={{ cursor: "pointer", fontSize: "24px", margin: "5px" }}
            />
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
              style={{ cursor: "pointer", fontSize: "24px", margin: "5px" }}
            />

            <FontIcon
              iconName="Delete"
              onClick={() => handleDeleteTask(item.id)}
              style={{ cursor: "pointer", fontSize: "24px", margin: "5px" }}
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
              style={{ cursor: "pointer", fontSize: "24px", margin: "5px" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
