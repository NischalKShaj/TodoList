import React from "react";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input type="text" placeholder="Enter the task....." />
          <input
            type="number"
            placeholder="Deadline for completing the task (in Days....)"
          />
        </div>
        <button>Add Task</button>
      </div>
      <div className="todoList"></div>
    </div> 
  );
};

export default App;
