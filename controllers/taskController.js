const Task = require("../models/taskModel");

exports.createTask = async (req, res) => {
  const { title, dueDate, status, userId } = req.body;
  try {
    const newTask = new Task({ title, dueDate, status, userId });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, dueDate, status, userId } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, dueDate, status, userId },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
