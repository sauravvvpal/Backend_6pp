import errorHandler from "../middlewares/error.js";
import { Task } from "../models/Task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfulluy",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTasks = async (req, res, next) => {
  try {
    const userid = req.user._id;
    const tasks = await Task.find({ user: userid });

    res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTasks = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new errorHandler("Invalid Id", 404));
    task.isCompleted = !task.isCompleted;
    await task.save();

    res.json({
      success: true,
      message: "Task Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTasks = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new errorHandler("Invalid Id", 404));
    await task.deleteOne();

    res.json({
      success: true,
      message: "Task Deleted",
    });
  } catch (error) {
    next(error);
  }
};
