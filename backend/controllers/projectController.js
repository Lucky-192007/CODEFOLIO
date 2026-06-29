const User = require('../models/User');

const addProject = async (req, res) => {
  try {
    const { userId, project } = req.body;
    if (!userId || !project?.title) return res.status(400).json({ message: "Missing required project attributes." });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User profile not found." });
    if (!user.projects) user.projects = [];
    user.projects.push(project);
    await user.save();
    res.status(200).json({ message: "Project created", projects: user.projects });
  } catch (err) {
    res.status(500).json({ message: "Internal server error.", error: err.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { userId, projectIdentifier, project } = req.body;
    if (!userId || !projectIdentifier) return res.status(400).json({ message: "Missing matching transaction arguments." });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User profile context not found." });

    let targetIndex = -1;
    if (typeof projectIdentifier === 'string' && projectIdentifier.length === 24) {
      targetIndex = user.projects.findIndex(p => p._id.toString() === projectIdentifier);
    } else {
      targetIndex = Number(projectIdentifier);
    }

    if (targetIndex === -1 || !user.projects[targetIndex]) {
      return res.status(404).json({ message: "Target project not found in matrix stack." });
    }

    user.projects[targetIndex].title       = project.title       || user.projects[targetIndex].title;
    user.projects[targetIndex].description = project.description !== undefined ? project.description : user.projects[targetIndex].description;
    user.projects[targetIndex].techStack   = project.techStack   || user.projects[targetIndex].techStack;
    user.projects[targetIndex].github      = project.github      !== undefined ? project.github      : user.projects[targetIndex].github;
    user.projects[targetIndex].live        = project.live        !== undefined ? project.live        : user.projects[targetIndex].live;
    user.projects[targetIndex].screenshot  = project.screenshot  !== undefined ? project.screenshot  : user.projects[targetIndex].screenshot;

    await user.save();
    res.status(200).json({ message: "Project record modified safely", projects: user.projects });
  } catch (err) {
    res.status(500).json({ message: "Internal update layer malfunction.", error: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { userId, projectIdentifier } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User profile not found." });
    if (typeof projectIdentifier === 'string' && projectIdentifier.length === 24) {
      user.projects = user.projects.filter(p => p._id.toString() !== projectIdentifier);
    } else {
      user.projects.splice(Number(projectIdentifier), 1);
    }
    await user.save();
    res.status(200).json({ message: "Project removed", projects: user.projects });
  } catch (err) {
    res.status(500).json({ message: "Internal server error.", error: err.message });
  }
};

module.exports = { addProject, updateProject, deleteProject };