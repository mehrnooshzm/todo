import styled, { keyframes } from "styled-components";
import TodoList from "@/components/todo/TodoList";
import TaskModal from "@/components/ui/modal";
import { useState, useEffect } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "@/services/toDo";
import { Clock, CheckCircle2, Plus, Inbox, Loader } from "lucide-react";
import toast from "react-hot-toast";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 40px 16px;
  background-color: #ebebee;
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
`;

const CardContainer = styled.div`
  width: min(94vw, 360px);
  border: 1px solid #e4e4e7;
  border-radius: 24px;
  padding: 16px 16px 14px 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.035);
  display: flex;
  flex-direction: column;
  background: #f4f4f6;
`;

const LoadingState = styled.div`
  width: 100%;
  padding: 40px 12px;
  text-align: center;
  color: #8e8e93;
  font-size: 14px;
  font-weight: 500;
  background: #ffffff;
  border-radius: 18px;
  border: 1px dashed #d1d1d6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const LoadingSpinner = styled.div`
  animation: ${spin} 1s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  padding: 0 4px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ColumnTitle = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #1c1c1e;
`;

const CountBadge = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #8e8e93;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const HeaderIconButton = styled.button`
  background: transparent;
  border: none;
  color: #1c1c1e;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 6px;
  transition: background 0.12s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.06);
  }
`;

const PageTitle = styled.h1`
  margin-bottom: 50px;
  padding: 0 4px;
  color: #1c1c1e;
  font-size: 35px;
  font-weight: 700;
  text-align: center;
`;

/**
 * Main Application Component
 * Manages central Todo state, modal visibility (create & edit modes), optimistic UI updates, and API sync.
 */
function App() {
  // State for controlling Task Modal visibility
  const [modalOpen, setModalOpen] = useState(false);
  // State holding task object currently being edited (null when adding a new task)
  const [editingTodo, setEditingTodo] = useState(null);
  // Main todo list items state array
  const [todos, setTodos] = useState([]);
  // Initial loading indicator state
  const [loading, setLoading] = useState(true);

  // Fetch todo list items from Express backend on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await getTodos();
        setTodos(res.data);
      } catch (err) {
        console.error("Failed to fetch todos:", err);
        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  /** Open modal in Add Task mode */
  const handleOpenAddModal = () => {
    setEditingTodo(null);
    setModalOpen(true);
  };

  /** Open modal in Edit Task mode populated with existing task data */
  const handleOpenEditModal = (todo) => {
    setEditingTodo(todo);
    setModalOpen(true);
  };

  /** Form submission handler from TaskModal (handles both Create and Edit) */
  const handleModalSubmit = async (title, dueDate) => {
    if (editingTodo) {
      // Edit existing task
      const prevTodos = todos;
      setTodos((prev) =>
        prev.map((t) =>
          t.id === editingTodo.id
            ? { ...t, title: title.trim(), dueDate: dueDate || null }
            : t,
        ),
      );
      try {
        const res = await updateTodo(editingTodo.id, {
          title: title.trim(),
          dueDate: dueDate || null,
        });
        setTodos((prev) =>
          prev.map((t) => (t.id === editingTodo.id ? res.data : t)),
        );
        toast.success("Task updated successfully!");
        setModalOpen(false);
      } catch (err) {
        console.error("Failed to update todo:", err);
        setTodos(prevTodos);
        toast.error("Failed to update task");
      }
    } else {
      // Create new task
      try {
        const res = await createTodo(title, dueDate);
        setTodos((prev) => [...prev, res.data]);
        toast.success("Task added successfully!");
        setModalOpen(false);
      } catch (err) {
        console.error("Failed to create todo:", err);
        toast.error("Failed to add task");
      }
    }
  };

  /**
   * Toggle task completion status handler
   * Applies optimistic state update immediately, reverting if the API request fails.
   */
  const handleToggle = async (todo) => {
    // Optimistic UI update: instantly flip completion status in state
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t,
      ),
    );
    try {
      await updateTodo(todo.id, {
        completed: !todo.completed,
        title: todo.title,
        dueDate: todo.dueDate,
      });
      const statusText = !todo.completed ? "completed" : "reopened";
      toast.success(`Task ${statusText}!`);
    } catch (err) {
      console.error("Failed to update todo status:", err);
      // Revert state on network/server error
      setTodos((prev) =>
        prev.map((t) =>
          t.id === todo.id ? { ...t, completed: todo.completed } : t,
        ),
      );
      toast.error("Failed to update task status");
    }
  };

  /**
   * Delete task handler
   * Optimistically removes item from state, reverting if API deletion fails.
   */
  const handleDelete = async (id) => {
    const prevTodos = todos;
    setTodos((prev) => prev.filter((t) => t.id !== id));
    try {
      await deleteTodo(id);
      toast.success("Task deleted successfully!");
    } catch (err) {
      console.error("Failed to delete todo:", err);
      setTodos(prevTodos);
      toast.error("Failed to delete task");
    }
  };

  /**
   * Drag-and-drop reorder handler
   * Updates local state ordering following a drag drop operation.
   */
  const handleReorder = (reordered) => {
    setTodos(reordered);
  };

  // Dynamic header status calculation (active vs completed count)
  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;
  const isAllCompleted = todos.length > 0 && activeCount === 0;
  const isEmpty = todos.length === 0;

  const titleText = isEmpty ? "" : isAllCompleted ? "Completed" : "In Progress";
  const displayCount = isEmpty
    ? ""
    : isAllCompleted
      ? completedCount
      : activeCount;

  return (
    <Page>
      <PageTitle>My ToDo List</PageTitle>
      <CardContainer>
        {/* Header section displaying list status, count badge, and add task trigger */}
        <HeaderRow>
          {isEmpty ? (
            <HeaderLeft>
              <Inbox size={16} strokeWidth={2.2} color="#8e8e93" />
            </HeaderLeft>
          ) : (
            <HeaderLeft>
              {isAllCompleted ? (
                <CheckCircle2 size={16} strokeWidth={2.2} color="#34c759" />
              ) : (
                <Clock size={16} strokeWidth={2.2} color="#8e8e93" />
              )}
              <ColumnTitle>{titleText}</ColumnTitle>
              <CountBadge>{displayCount}</CountBadge>
            </HeaderLeft>
          )}

          <HeaderActions>
            <HeaderIconButton
              type="button"
              onClick={handleOpenAddModal}
              title="Add Task"
            >
              <Plus size={16} strokeWidth={2.2} />
            </HeaderIconButton>
          </HeaderActions>
        </HeaderRow>

        {/* Loading State or Todo Items List Component */}
        {loading ? (
          <LoadingState>
            <LoadingSpinner>
              <Loader size={24} strokeWidth={2.2} color="#8e8e93" />
            </LoadingSpinner>
            <span>Loading tasks...</span>
          </LoadingState>
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggle}
            onEdit={handleOpenEditModal}
            onDelete={handleDelete}
            onReorder={handleReorder}
          />
        )}
      </CardContainer>

      {/* Task Modal Component (Handles both Create and Edit modes) */}
      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialTitle={editingTodo ? editingTodo.title : ""}
        initialDueDate={editingTodo ? editingTodo.dueDate : ""}
        isEdit={!!editingTodo}
        isCreate={!editingTodo}
        modalTitle={editingTodo ? "Edit Task" : "Add Task"}
        submitLabel={editingTodo ? "Save Changes" : "Add Task"}
        key={editingTodo ? editingTodo.id : "new-task"}
      />
    </Page>
  );
}

export default App;
