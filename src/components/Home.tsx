import React, { useEffect, useState } from "react";
import TodoForm from "./TaskForm/todoForm";
import { Pivot, PivotItem } from "@fluentui/react";
import TaskList from "./TaskList/TaskList";
import { TodoListTask } from "./types";
import TodoComplete from "./TaskCompleted/todoComplete";
import "./Home.css";

const Home = () => {
  // for loading the stored component
  const [tasks, setTask] = useState<TodoListTask[]>(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );

  const [completedTask, setCompletedTasks] = useState<TodoListTask[]>(
    JSON.parse(localStorage.getItem("completedTask") || "[]")
  );

  // saving the task to local storege
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("completedTask", JSON.stringify(completedTask));
  }, [completedTask]);

  const handleSaveTask = (input: string, description: string) => {
    if (tasks.some((task) => task.Task === input)) {
      // Task is already added, show error message
      alert("Task is already added.");
      return;
    }
    const newTask: TodoListTask = {
      id: (tasks.length + 1).toString(),
      Task: input,
      isCompleted: false,
      description: description,
    };
    setTask((prevTask) => [...prevTask, newTask]);
  };

  return (
    <div className="TodoContainer">
      <header className="headerStyle">
        <h2>ToDo Application</h2>
      </header>
      <div className="pivotContainer">
        <Pivot styles={{ root: { display: "flex", justifyContent: "center" } }}>
          <PivotItem headerText="Task">
            <TaskList
              tasks={tasks}
              setTask={setTask}
              completedTasks={completedTask}
              setCompletedTasks={setCompletedTasks}
            />
          </PivotItem>
          <PivotItem headerText="Add Task">
            <TodoForm onSave={handleSaveTask} />
          </PivotItem>
          <PivotItem headerText="Completed Task">
            <TodoComplete
              setCompletedTask={setCompletedTasks}
              completedTasks={completedTask}
            />
          </PivotItem>
        </Pivot>
      </div>
    </div>
  );
};

export default Home;
