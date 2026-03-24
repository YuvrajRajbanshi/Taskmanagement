import React from "react";

const Filters = ({ filters, setFilters, onSearch }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      priority: "",
      search: "",
      sortBy: "",
      order: "asc",
    });
    onSearch();
  };

  return (
    <div className="filters">
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="btn btn-secondary">
          Search
        </button>
      </form>

      <div className="filter-group">
        <select name="status" value={filters.status} onChange={handleChange}>
          <option value="">All Status</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <select
          name="priority"
          value={filters.priority}
          onChange={handleChange}
        >
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select name="sortBy" value={filters.sortBy} onChange={handleChange}>
          <option value="">Sort By</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>

        <select name="order" value={filters.order} onChange={handleChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={clearFilters}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Filters;
