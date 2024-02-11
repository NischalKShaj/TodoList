import React from "react";
import "./Home.css";
import TodoForm from "./TaskForm/todoForm";
import { Label, Pivot, PivotItem } from "@fluentui/react";

const Home = () => {
  return (
    <div className="TodoContainer">
      <Pivot aria-label="Large Link Size Pivot Example" linkSize="large">
        <PivotItem headerText="Task">
          <Label>Pivot #1</Label>
        </PivotItem>
        <PivotItem headerText="Add Task">
          <TodoForm />
        </PivotItem>
        <PivotItem headerText="Shared with me">
          <Label>Pivot #3</Label>
        </PivotItem>
      </Pivot>
    </div>
  );
};

export default Home;
