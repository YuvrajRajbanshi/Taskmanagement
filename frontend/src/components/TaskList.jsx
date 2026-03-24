import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({
  tasks,
  loading,
  onEdit,
  onDelete,
  onStatusChange,
  pagination,
  onPageChange,
}) => {
  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks found. Create your first task!</p>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>

      {pagination && pagination.pages > 1 && (
        <div className="pagination">
          <button
            className="btn btn-small"
            disabled={pagination.page <= 1}
            onClick={() => onPageChange(pagination.page - 1)}
          >
            Previous
          </button>
          <span className="page-info">
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            className="btn btn-small"
            disabled={pagination.page >= pagination.pages}
            onClick={() => onPageChange(pagination.page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
