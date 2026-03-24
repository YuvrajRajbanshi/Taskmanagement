const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Helper to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Generic fetch wrapper
const request = async (endpoint, options = {}) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// Auth API calls
export const authApi = {
  signup: (userData) =>
    request("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  login: (credentials) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  getMe: () => request("/auth/me"),
};

// Task API calls
export const taskApi = {
  getTasks: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return request(`/tasks${queryString ? `?${queryString}` : ""}`);
  },

  getTask: (id) => request(`/tasks/${id}`),

  createTask: (taskData) =>
    request("/tasks", {
      method: "POST",
      body: JSON.stringify(taskData),
    }),

  updateTask: (id, taskData) =>
    request(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(taskData),
    }),

  deleteTask: (id) =>
    request(`/tasks/${id}`, {
      method: "DELETE",
    }),

  updateStatus: (id, status) =>
    request(`/tasks/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  getStats: () => request("/tasks/stats"),
};
