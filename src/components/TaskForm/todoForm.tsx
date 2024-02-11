import React, { FormEvent, useRef, useState } from "react";

interface TodoFormProps {
  onSave: (input: string, description: string) => void;
}

const TodoForm:React.FC<TodoFormProps> = ({onSave}) => {
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          value={input}
          onChange={handleInputRef}
          type="text"
          placeholder="Enter the task"
          required
        />
        <textarea
          ref={descriptionRef}
          value={description}
          onChange={handleDescriptionRef}
          rows={9}
          placeholder="Enter the description for the task"
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TodoForm;
