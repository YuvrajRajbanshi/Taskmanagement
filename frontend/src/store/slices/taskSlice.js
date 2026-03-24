import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { taskApi } from "../../services/api";

const initialState = {
  tasks: [],
  currentTask: null,
  stats: null,
  pagination: null,
  loading: false,
  error: null,
  filters: {
    status: "",
    priority: "",
    search: "",
    sortBy: "",
    order: "desc",
    page: 1,
    limit: 10,
  },
};

// Async thunks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (params, { rejectWithValue }) => {
    try {
      const data = await taskApi.getTasks(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchTask = createAsyncThunk(
  "tasks/fetchTask",
  async (id, { rejectWithValue }) => {
    try {
      const data = await taskApi.getTask(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const data = await taskApi.createTask(taskData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, taskData }, { rejectWithValue }) => {
    try {
      const data = await taskApi.updateTask(id, taskData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      await taskApi.deleteTask(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateTaskStatus = createAsyncThunk(
  "tasks/updateTaskStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const data = await taskApi.updateStatus(id, status);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchStats = createAsyncThunk(
  "tasks/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const data = await taskApi.getStats();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        status: "",
        priority: "",
        search: "",
        sortBy: "",
        order: "desc",
        page: 1,
        limit: 10,
      };
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentTask: (state) => {
      state.currentTask = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single task
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.currentTask = action.payload;
      })
      // Create task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (t) => t._id === action.payload._id,
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      })
      // Update status
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (t) => t._id === action.payload._id,
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      // Fetch stats
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters, clearError, clearCurrentTask } =
  taskSlice.actions;
export default taskSlice.reducer;
