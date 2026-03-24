import React from "react";

const Analytics = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="analytics">
      <h2>Statistics</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.totalTasks}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.completedTasks}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.pendingTasks}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.completionPercentage}%</div>
          <div className="stat-label">Completion</div>
        </div>
      </div>

      {stats.byStatus && (
        <div className="stats-breakdown">
          <h3>By Status</h3>
          <div className="breakdown-items">
            <span>Todo: {stats.byStatus.Todo || 0}</span>
            <span>In Progress: {stats.byStatus["In Progress"] || 0}</span>
            <span>Done: {stats.byStatus.Done || 0}</span>
          </div>
        </div>
      )}

      {stats.byPriority && (
        <div className="stats-breakdown">
          <h3>By Priority</h3>
          <div className="breakdown-items">
            <span className="priority-high">
              High: {stats.byPriority.High || 0}
            </span>
            <span className="priority-medium">
              Medium: {stats.byPriority.Medium || 0}
            </span>
            <span className="priority-low">
              Low: {stats.byPriority.Low || 0}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
