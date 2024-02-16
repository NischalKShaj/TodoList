import React, { FormEvent, useRef, useState } from "react";
import "./todoform.css";

interface TodoFormProps {
  onSave: (input: string, description: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSave }) => {
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInputRef = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
  };

  const handleDescriptionRef = (
    event: React.ChangeEvent<HTMLTextAreaElement | null>
  ) => {
    setDescription(event.currentTarget.value); 
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSave(input, description);
    setInput("");
    setDescription("");
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <div className="task-box">
          <input
            ref={inputRef}
            value={input}
            onChange={handleInputRef}
            type="text"
            placeholder="Enter the task"
            required
            className="formInput"
          />
        </div>
        <div className="description-box">
          <textarea
            ref={descriptionRef}
            value={description}
            onChange={handleDescriptionRef}
            cols={100}
            rows={9}
            placeholder="Enter the description for the task"
            className="formInput"
          />
        </div>
        {input.trim() !== "" && description.trim() !== "" && (
          <button type="submit" className="formButton">
            Add Task
          </button>
        )}
      </form>
    </div>
  );
};

export default TodoForm;
