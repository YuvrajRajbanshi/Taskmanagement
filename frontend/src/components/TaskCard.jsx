import React from "react";

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString();
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "priority-high";
      case "Medium":
        return "priority-medium";
      case "Low":
        return "priority-low";
      default:
        return "";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Done":
        return "status-done";
      case "In Progress":
        return "status-progress";
      default:
        return "status-todo";
    }
  };

  const handleStatusChange = (e) => {
    onStatusChange(task._id, e.target.value);
  };

  return (
    <div className={`task-card ${getStatusClass(task.status)}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        {task.dueDate && (
          <span className="due-date">Due: {formatDate(task.dueDate)}</span>
        )}
      </div>

      <div className="task-footer">
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="status-select"
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <div className="task-actions">
          <button className="btn btn-small" onClick={() => onEdit(task)}>
            Edit
          </button>
          <button
            className="btn btn-small btn-danger"
            onClick={() => onDelete(task._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
