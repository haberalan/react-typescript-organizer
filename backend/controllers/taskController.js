const Task = require('../models/taskModel');

const getAll = async (req, res) => {
  const user_id = req.user._id;

  try {
    const tasks = await Task.find({ user_id });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const createOne = async (req, res) => {
  const user_id = req.user._id;
  const { text, date, done, hierarchy, project_id } = req.body;

  try {
    const task = await Task.create({ user_id, text, date, done, hierarchy, project_id });

    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateOne = async (req, res) => {
  const user_id = req.user._id;
  const { id } = req.params;
  const { text, date, done, hierarchy, project_id } = req.body;

  try {
    const task = await Task.findOneAndUpdate({ _id: id, user_id, project_id }, { text, date, done, hierarchy, project_id });

    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteOne = async (req, res) => {
  const user_id = req.user._id;
  const { id } = req.params;

  try {
    const task = await Task.findOneAndRemove({ _id: id, user_id });

    // delete associated tasks

    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getAll, createOne, updateOne, deleteOne };
