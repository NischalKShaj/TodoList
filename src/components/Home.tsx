import React, { useEffect, useState } from "react";
import "./Home.css";
import TodoForm from "./TaskForm/todoForm";
import { Pivot, PivotItem, loadTheme } from "@fluentui/react";
import TaskList from "./TaskList/TaskList";
import { TodoListTask } from "./types";

const Home = () => {
  // for loading the stored component
  const [tasks, setTask] = useState<TodoListTask[]>(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );

  // saving the task to local storege
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSaveTask = (input: string, description: string) => {
    const newTask: TodoListTask = {
      id: (tasks.length + 1).toString(),
      Task: input,
      isCompleted: false,
    };
    setTask((prevTask) => [...prevTask, newTask]);
  };

  return (
    <div className="TodoContainer">
      <Pivot aria-label="Large Link Size Pivot Example" linkSize="large">
        <PivotItem headerText="Task">
          <TaskList tasks={tasks} setTask={setTask} />
        </PivotItem>
        <PivotItem headerText="Add Task">
          <TodoForm onSave={handleSaveTask} />
        </PivotItem>
      </Pivot>
    </div>
  );
};

export default Home;
