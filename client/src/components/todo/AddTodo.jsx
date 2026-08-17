/**
 * AddTodo Component
 * Renders a form for adding or editing a todo item.
 * Includes fields for task title and due date with form validation.
 */

import { useState, useRef } from "react";
import styled from "styled-components";

/**
 * Panel - Styled form container
 * Serves as the main form wrapper with flex layout and spacing
 */
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

/**
 * Row - Flex container for horizontal layout
 * Used to arrange form elements in a row with consistent spacing
 */
const Row = styled.div`
  display: flex;
  gap: 8px;
`;

/**
 * Label - Styled form label
 * Displays field labels with small font size and subtle color
 */
const Label = styled.label`
  font-size: 10px;
  color: #8e8e93;
`;

/**
 * Input - Styled text input field
 * Provides consistent styling for text and date inputs
 * Includes focus state for better UX
 */
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

/**
 * Actions - Container for form action buttons
 * Positioned at the end of the form with consistent spacing
 */
const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

/**
 * CancelBtn - Styled cancel button
 * Transparent background with hover effects
 */
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

/**
 * SubmitBtn - Styled submit button
 * Dark background with hover and disabled states
 */
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

/**
 * AddTodo Component
 *
 * Props:
 * @param {Function} onAdd - Callback function when form is submitted
 * @param {Function} onCancel - Callback function when cancel button is clicked
 * @param {string} [initialTitle=""] - Initial value for the title input (for edit mode)
 * @param {string} [initialDueDate=""] - Initial value for the due date input (for edit mode)
 * @param {string} [submitLabel="Add Task"] - Text displayed on the submit button
 * @param {boolean} [isEdit=false] - Flag indicating if this is an edit form
 */
export default function AddTodo({
  onAdd,
  onCancel,
  initialTitle = "",
  initialDueDate = "",
  submitLabel = "Add Task",
  isEdit = false,
}) {
  // State for task title input
  const [title, setTitle] = useState(initialTitle || "");

  // State for due date input, defaults to today if not in edit mode
  const [dueDate, setDueDate] = useState(initialDueDate);

  // Ref to the input element (can be used for focus management)
  const inputRef = useRef(null);

  /**
   * Handles form submission
   * Validates that both title and due date are filled before calling onAdd callback
   * Resets form fields only when in add mode (not edit mode)
   */
  const handleSubmit = (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Validate that both fields are non-empty
    if (!title.trim() || !dueDate.trim()) return;

    // Call parent's onAdd callback with trimmed values
    onAdd(title.trim(), dueDate.trim());

    // Reset form only in add mode (not edit mode)
    if (!isEdit) {
      setTitle("");
      setDueDate("");
    }
  };

  return (
    <Panel onSubmit={handleSubmit}>
      {/* Task Title Field */}
      <Label>Task Title *</Label>
      <Input
        ref={inputRef}
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* Due Date Field */}
      <Label>Due Date *</Label>
      <Row>
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </Row>

      {/* Form Action Buttons */}
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
