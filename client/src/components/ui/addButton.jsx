import React from "react";
import styled from "styled-components";
import { Plus } from "lucide-react";

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: #1c1c1e;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 4px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.12s ease, opacity 0.12s ease;
  margin-top: 4px;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  &:active {
    background: rgba(0, 0, 0, 0.08);
  }
`;

export default function AddButton({ onClick, label = "Add task" }) {
  return (
    <Button onClick={onClick}>
      <Plus size={16} strokeWidth={2.2} />
      {label}
    </Button>
  );
}
