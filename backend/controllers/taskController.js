import Task from "../models/Task.js";

// @desc    Create a new task
// @route   POST /api/tasks
const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      userId: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tasks for logged-in user
// @route   GET /api/tasks
const getTasks = async (req, res, next) => {
  try {
    const {
      status,
      priority,
      search,
      sortBy,
      order,
      page = 1,
      limit = 10,
    } = req.query;

    // Build query
    const query = { userId: req.user._id };

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    // Search by title (case-insensitive)
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // Build sort object
    const sortOptions = {};
    if (sortBy === "dueDate") {
      sortOptions.dueDate = order === "desc" ? -1 : 1;
    } else if (sortBy === "priority") {
      // Custom sort for priority (High > Medium > Low)
      sortOptions.priority = order === "desc" ? -1 : 1;
    } else {
      // Default sort by createdAt
      sortOptions.createdAt = -1;
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const tasks = await Task.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    const total = await Task.countDocuments(query);

    res.json({
      tasks,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
const getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
const updateTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title, description, status, priority, dueDate },
      { new: true, runValidators: true },
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task status
// @route   PATCH /api/tasks/:id/status
const updateTaskStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status || !["Todo", "In Progress", "Done"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { status },
      { new: true },
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// @desc    Get task statistics
// @route   GET /api/tasks/stats
const getTaskStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const totalTasks = await Task.countDocuments({ userId });
    const completedTasks = await Task.countDocuments({
      userId,
      status: "Done",
    });
    const pendingTasks = totalTasks - completedTasks;
    const completionPercentage =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Get counts by status
    const statusCounts = await Task.aggregate([
      { $match: { userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // Get counts by priority
    const priorityCounts = await Task.aggregate([
      { $match: { userId } },
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      completionPercentage,
      byStatus: statusCounts.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {}),
      byPriority: priorityCounts.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {}),
    });
  } catch (error) {
    next(error);
  }
};

export {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  getTaskStats,
};
