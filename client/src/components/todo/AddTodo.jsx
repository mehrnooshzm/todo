import { useState, useRef } from "react";
import styled from "styled-components";

const Panel = styled.form`
  width: 100%;
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 14px;
  padding: 14px;
  box-sizing: border-box;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 10px;
  color: #8e8e93;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #e0e0e4;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  box-sizing: border-box;
  background: #f9f9fb;
  color: #1c1c1e;

  &:focus {
    border-color: #1c1c1e;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(28, 28, 30, 0.08);
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const CancelBtn = styled.button`
  background: transparent;
  border: none;
  color: #8e8e93;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
    color: #1c1c1e;
  }
`;

const SubmitBtn = styled.button`
  background: #1c1c1e;
  border: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background: #e0e0e4;
    color: #a0a0a5;
    cursor: not-allowed;
  }
`;

export default function AddTodo({
  onAdd,
  onCancel,
  initialTitle = "",
  initialDueDate = "",
  submitLabel = "Add Task",
  isEdit = false,
}) {
  const today = new Date().toISOString().split("T")[0];

  const [title, setTitle] = useState(initialTitle || "");
  const [dueDate, setDueDate] = useState(initialDueDate || today);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !dueDate.trim()) return;
    onAdd(title.trim(), dueDate.trim());
    if (!isEdit) {
      setTitle("");
      setDueDate(today);
    }
  };

  return (
    <Panel onSubmit={handleSubmit}>
      <Label>Task Title *</Label>
      <Input
        ref={inputRef}
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Label>Due Date *</Label>
      <Row>
        <Input
          type="date"
          min={today}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </Row>

      <Actions>
        <CancelBtn type="button" onClick={onCancel}>
          Cancel
        </CancelBtn>
        <SubmitBtn type="submit" disabled={!title.trim() || !dueDate.trim()}>
          {submitLabel}
        </SubmitBtn>
      </Actions>
    </Panel>
  );
}
