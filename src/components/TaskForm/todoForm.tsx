import React, { FormEvent, useRef, useState } from "react";
import style from "./todoform.module.css";

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
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          value={input}
          onChange={handleInputRef}
          type="text"
          placeholder="Enter the task"
          required
          className={style.formInput}
        />
        <textarea
          ref={descriptionRef}
          value={description}
          onChange={handleDescriptionRef}
          rows={9}
          placeholder="Enter the description for the task"
          className={style.formInput}
        />
        <button type="submit" className={style.formButton}>
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
