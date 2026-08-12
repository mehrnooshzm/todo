import styled, { css } from "styled-components";
import {
  Check,
  Trash2,
  GripVertical,
  Pencil,
  Clock,
  Calendar,
} from "lucide-react";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 14px;
  padding: 12px 14px;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  transition:
    box-shadow 0.15s ease,
    transform 0.15s ease;

  &:hover {
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  }

  ${({ $isDragging }) =>
    $isDragging &&
    css`
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
    `}
`;

const MainRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const DueDateRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: 6px;
  margin-top: 6px;
  border-top: 1px solid #f2f2f5;
`;

const Handle = styled.div`
  display: flex;
  align-items: center;
  color: #d1d1d6;
  cursor: grab;
  touch-action: none;
  flex-shrink: 0;

  &:active {
    cursor: grabbing;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
`;

const TitleText = styled.span`
  width: 100%;
  font-size: 15px;
  font-weight: 600;
  color: ${({ $completed }) => ($completed ? "#a0a0a5" : "#1c1c1e")};
  text-decoration: ${({ $completed }) =>
    $completed ? "line-through" : "none"};
  word-break: break-word;
  cursor: pointer;
  text-align: left;
`;

/**
 * Computes due date urgency color:
 * - Red (`#ff3b30`) if due date is Today, Tomorrow, or Past Due
 * - Yellow (`#eab308`) if due date is further in the future
 */
const getDueDateColor = (dueDateStr) => {
  if (!dueDateStr) return "#eab308";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const endOfTomorrow = new Date(tomorrow);
  endOfTomorrow.setHours(23, 59, 59, 999);

  const parts = dueDateStr.split("-");
  let targetDate;
  if (parts.length === 3) {
    targetDate = new Date(
      parseInt(parts[0], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[2], 10),
    );
  } else {
    targetDate = new Date(dueDateStr);
  }
  targetDate.setHours(0, 0, 0, 0);

  // If due date is Today, Tomorrow, or Past Due -> RED
  if (targetDate <= endOfTomorrow) {
    return "#ff3b30";
  }

  // Future due date -> YELLOW
  return "#eab308";
};

const DueDateTag = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ $color }) => $color || "#8e8e93"};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`;

const Checkbox = styled.button`
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1.5px solid
    ${({ $completed, $iconColor }) =>
      $completed ? "#34c759" : $iconColor || "#c7c7cc"};
  background: ${({ $completed }) => ($completed ? "#34c759" : "transparent")};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ $completed, $iconColor }) =>
      $completed ? "#30b753" : $iconColor || "#8e8e93"};
  }
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: #a0a0a5;
  cursor: pointer;
  display: flex;
  padding: 5px;
  border-radius: 6px;
  transition: all 0.12s ease;

  &:hover {
    background: ${({ $hoverBg }) => $hoverBg || "rgba(0, 0, 0, 0.05)"};
    color: ${({ $hoverColor }) => $hoverColor || "#1c1c1e"};
  }
`;

/**
 * ToDoItem Component
 * Renders an individual task card with an upper main row (Handle, Title, Actions)
 * and an independent bottom row for due date display.
 * Clicking edit or double-clicking title triggers `onEdit(todo)` to open the edit modal.
 */
export default function ToDoItem({
  todo,
  onToggle,
  onEdit,
  onDelete,
  innerRef,
  draggableProps,
  dragHandleProps,
  isDragging,
}) {
  // Extract due date string if present
  const dueDate = todo.dueDate || todo.due_date;
  // Compute color based on urgency (Red if Today/Tomorrow/Past Due, Yellow if Future)
  const dueDateColor = getDueDateColor(dueDate);

  return (
    <Card ref={innerRef} {...draggableProps} $isDragging={isDragging}>
      {/* Top Main Row: Drag Handle, Title, and Action Buttons */}
      <MainRow>
        <Handle {...dragHandleProps}>
          <GripVertical size={16} />
        </Handle>

        <ContentWrapper>
          <TitleText
            $completed={todo.completed}
            onDoubleClick={() => onEdit(todo)}
            title="Double-click or click edit button to edit task & due date"
          >
            {todo.title}
          </TitleText>
        </ContentWrapper>

        <ActionGroup>
          <IconButton
            type="button"
            onClick={() => onEdit(todo)}
            aria-label="Edit task"
            title="Edit task & due date"
            $hoverBg="rgba(0, 0, 0, 0.05)"
            $hoverColor="#1c1c1e"
          >
            <Pencil size={15} />
          </IconButton>

          <IconButton
            type="button"
            onClick={() => onDelete(todo.id)}
            aria-label="Delete task"
            $hoverBg="rgba(255, 59, 48, 0.08)"
            $hoverColor="#ff3b30"
          >
            <Trash2 size={15} />
          </IconButton>

          {/* Checkbox button toggles task completion status */}
          <Checkbox
            type="button"
            $completed={todo.completed}
            $iconColor={dueDateColor}
            onClick={() => onToggle(todo)}
            aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
            title={
              !todo.completed && dueDate
                ? `Due Date: ${dueDate}`
                : todo.completed
                  ? "Completed"
                  : "In Progress"
            }
          >
            {todo.completed ? (
              <Check size={12} strokeWidth={3} color="#fff" />
            ) : (
              <Clock size={12} strokeWidth={2.2} color={dueDateColor} />
            )}
          </Checkbox>
        </ActionGroup>
      </MainRow>

      {/* Independent Bottom Row: Displays Due Date if task is in progress */}
      {!todo.completed && dueDate && (
        <DueDateRow>
          <DueDateTag $color={dueDateColor} title={`Due Date: ${dueDate}`}>
            <Calendar size={12} strokeWidth={2} color={dueDateColor} />
            Due: {dueDate}
          </DueDateTag>
        </DueDateRow>
      )}
    </Card>
  );
}
