import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TodoItem from "./TodoItem";

const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 65vh;
  overflow-y: auto;
  padding: 2px 4px 6px 2px;

  /* Custom subtle scrollbar */
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #e0e0e4;
    border-radius: 4px;
  }
`;

const EmptyState = styled.div`
  width: 100%;
  padding: 40px 12px;
  text-align: center;
  color: #8e8e93;
  font-size: 14px;
  font-weight: 500;
  background: #ffffff;
  border-radius: 18px;
  border: 1px dashed #d1d1d6;
`;

/**
 * TodoList Component
 * Renders a list of draggable todo items wrapped in `@hello-pangea/dnd` DragDropContext and Droppable container.
 * Displays an empty state banner when no tasks exist.
 */
export default function TodoList({
  todos = [],
  onToggle,
  onEdit,
  onDelete,
  onReorder,
}) {
  // Render empty state if there are no todo items
  if (todos.length === 0) {
    return <EmptyState>No tasks in progress. Click + to add one!</EmptyState>;
  }

  /**
   * Called when a drag operation completes.
   * Reorders array elements and notifies parent component via `onReorder`.
   */
  const handleDragEnd = (result) => {
    // Dropped outside a valid drop target
    if (!result.destination) return;
    // Dropped in the same position
    if (result.destination.index === result.source.index) return;

    const reordered = Array.from(todos);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    onReorder(reordered);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todo-list">
        {(provided) => (
          <List ref={provided.innerRef} {...provided.droppableProps}>
            {todos.map((todo, index) => (
              <Draggable
                key={todo.id}
                draggableId={String(todo.id)}
                index={index}
              >
                {(dragProvided, dragSnapshot) => (
                  <TodoItem
                    todo={todo}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    innerRef={dragProvided.innerRef}
                    draggableProps={dragProvided.draggableProps}
                    dragHandleProps={dragProvided.dragHandleProps}
                    isDragging={dragSnapshot.isDragging}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
}
