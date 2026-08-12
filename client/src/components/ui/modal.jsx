import styled from "styled-components";
import { X } from "lucide-react";
import AddTodo from "../todo/AddTodo";

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

/**
 * TaskModal Component
 * Pop-up modal dialog for creating a new task or editing an existing task.
 * When `isCreate` is true the modal renders the `AddTodo` form inside.
 */
export default function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  initialTitle = "",
  initialDueDate = "",
  isEdit = false,
  modalTitle = "Edit Task",
  submitLabel = "Save Changes",
}) {
  const handleAdd = (t, d) => {
    onSubmit(t, d);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{modalTitle}</Title>
          <CloseBtn onClick={onClose}>
            <X size={18} />
          </CloseBtn>
        </Header>

        <AddTodo
          onAdd={handleAdd}
          onCancel={onClose}
          initialTitle={initialTitle}
          initialDueDate={initialDueDate}
          submitLabel={submitLabel}
          isEdit={isEdit}
        />
      </ModalBox>
    </Overlay>
  );
}
