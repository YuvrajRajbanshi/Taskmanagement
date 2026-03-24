import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTasks,
  fetchStats,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  setFilters,
  clearError,
} from "../store/slices/taskSlice";
import Header from "../components/Header";
import Filters from "../components/Filters";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Analytics from "../components/Analytics";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks, stats, pagination, loading, error, filters } = useSelector(
    (state) => state.tasks
  );

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Apply dark mode
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Fetch tasks when filters change
  const loadTasks = useCallback(() => {
    const params = { page: filters.page, limit: filters.limit };
    if (filters.status) params.status = filters.status;
    if (filters.priority) params.priority = filters.priority;
    if (filters.search) params.search = filters.search;
    if (filters.sortBy) {
      params.sortBy = filters.sortBy;
      params.order = filters.order;
    }
    dispatch(fetchTasks(params));
  }, [dispatch, filters]);

  // Initial load
  useEffect(() => {
    loadTasks();
    dispatch(fetchStats());
  }, [loadTasks, dispatch]);

  // Handle filter changes from Filters component
  const handleFiltersChange = (newFilters) => {
    dispatch(setFilters({ ...newFilters, page: 1 }));
  };

  // Search handler
  const handleSearch = () => {
    dispatch(setFilters({ page: 1 }));
    loadTasks();
  };

  // Create/Update task
  const handleSubmit = async (formData) => {
    try {
      if (editingTask) {
        await dispatch(updateTask({ id: editingTask._id, taskData: formData })).unwrap();
      } else {
        await dispatch(createTask(formData)).unwrap();
      }
      setShowForm(false);
      setEditingTask(null);
      loadTasks();
      dispatch(fetchStats());
    } catch (err) {
      console.error("Task operation failed:", err);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await dispatch(deleteTask(id)).unwrap();
      loadTasks();
      dispatch(fetchStats());
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Update status
  const handleStatusChange = async (id, status) => {
    try {
      await dispatch(updateTaskStatus({ id, status })).unwrap();
      loadTasks();
      dispatch(fetchStats());
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  // Edit task
  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // Page change
  const handlePageChange = (page) => {
    dispatch(setFilters({ page }));
  };

  // Clear error
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearError()), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  return (
    <div className="dashboard">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="main-content">
        <div className="dashboard-header">
          <div className="actions">
            <button
              className="btn btn-primary"
              onClick={() => {
                setEditingTask(null);
                setShowForm(true);
              }}
            >
              + New Task
            </button>
            <button
              className={`btn ${showStats ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setShowStats(!showStats)}
            >
              {showStats ? "Hide Stats" : "Show Stats"}
            </button>
          </div>
        </div>

        {showStats && <Analytics stats={stats} />}

        <Filters
          filters={filters}
          setFilters={handleFiltersChange}
          onSearch={handleSearch}
        />

        {error && <div className="error-message">{error}</div>}

        <TaskList
          tasks={tasks}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </main>

      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
