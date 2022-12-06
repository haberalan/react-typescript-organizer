const Project = require('../models/projectModel');
const Task = require('../models/taskModel');

const getAll = async (req, res) => {
  const user_id = req.user._id;

  try {
    const projects = await Project.find({ user_id }).sort({ updatedAt: -1 });

    res.status(200).json(projects);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const createOne = async (req, res) => {
  const user_id = req.user._id;
  const { title } = req.body;

  try {
    const project = await Project.create({ title, user_id });

    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateOne = async (req, res) => {
  const user_id = req.user._id;
  const { id } = req.params;
  const { title } = req.body;

  try {
    const project = await Project.findOneAndUpdate({ _id: id, user_id }, { title });

    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteOne = async (req, res) => {
  const user_id = req.user._id;
  const { id } = req.params;

  try {
    const project = await Project.findOneAndRemove({ _id: id, user_id });

    await Task.deleteMany({ project_id: id });

    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getAll, createOne, updateOne, deleteOne };
