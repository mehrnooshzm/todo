import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { X } from "lucide-react";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: #ffffff;
  width: min(92vw, 380px);
  border-radius: 20px;
  padding: 22px 20px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #1c1c1e;
`;

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #8e8e93;
  display: flex;
  padding: 4px;
  border-radius: 8px;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #1c1c1e;
  }
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

const DatePicker=styled.input`
    width: 100%;
  padding: 10px 14px;
  border: 1px solid #e0e0e4;
  border-radius: 6px;
  

`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 18px;
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
const Label=styled.label`
  font-size:10px;
  color: #8e8e93;
  padding-top:10px;
`;

/**
 * TaskModal Component
 * Pop-up modal dialog for creating a new task or editing an existing task.
 * Mandates both title and due date fields for submission.
 */
export default function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  initialTitle = "",
  initialDueDate = "",
  isEdit = false,
}) {
  // Set today's date for date picker `min` constraint and default value
  const today = new Date().toISOString().split("T")[0];

  // Task title input state
  const [title, setTitle] = useState(initialTitle);
  // Task due date input state (defaults to today if empty)
  const [dueDate, setDueDate] = useState(initialDueDate || today);
  // Input ref to handle auto-focus
  const inputRef = useRef(null);

  // Sync state when modal opens or initial props change
  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle || "");
      setDueDate(initialDueDate || today);
      if (inputRef.current) {
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    }
  }, [isOpen, initialTitle, initialDueDate, today]);

  /** Form submit handler */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !dueDate.trim()) return;
    onSubmit(title.trim(), dueDate.trim());
    onClose();
  };

  // Don't render anything if modal is closed
  if (!isOpen) return null;

  return (
    // Overlay backdrop closes modal when clicked outside
    <Overlay onClick={onClose}>
      {/* Prevent click events inside modal box from bubbling up to backdrop */}
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{isEdit ? "Edit Task" : "Add new task"}</Title>
          <CloseBtn onClick={onClose}>
            <X size={18} />
          </CloseBtn>
        </Header>
        <form onSubmit={handleSubmit}>
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
          <DatePicker
            type="date"
            min={today}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <Actions>
            <CancelBtn type="button" onClick={onClose}>
              Cancel
            </CancelBtn>
            <SubmitBtn type="submit" disabled={!title.trim() || !dueDate.trim()}>
              {isEdit ? "Save Changes" : "Add Task"}
            </SubmitBtn>
          </Actions>
        </form>
      </ModalBox>
    </Overlay>
  );
}



