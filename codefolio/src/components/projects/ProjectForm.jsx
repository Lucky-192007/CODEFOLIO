import { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";

function ProjectForm() {
  const { projects, setProjects } = usePortfolio();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    github: "",
    liveDemo: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!formData.title) return;

    const newProject = {
      id: Date.now(),
      ...formData,
    };

    setProjects([...projects, newProject]);

    setFormData({
      title: "",
      description: "",
      techStack: "",
      github: "",
      liveDemo: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">
        Add Project
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Project Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mb-3"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mb-3"
      />

      <input
        type="text"
        name="techStack"
        placeholder="Tech Stack"
        value={formData.techStack}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mb-3"
      />

      <input
        type="text"
        name="github"
        placeholder="GitHub URL"
        value={formData.github}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mb-3"
      />

      <input
        type="text"
        name="liveDemo"
        placeholder="Live Demo URL"
        value={formData.liveDemo}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mb-4"
      />

      <button
        onClick={handleSubmit}
        className="bg-purple-600 text-white px-5 py-3 rounded-lg"
      >
        Add Project
      </button>
    </div>
  );
}

export default ProjectForm;