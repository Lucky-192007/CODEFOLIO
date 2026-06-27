import { usePortfolio } from "../../context/PortfolioContext";

function ProjectList() {
  const { projects, setProjects } = usePortfolio();

  const deleteProject = (id) => {
    setProjects(
      projects.filter((project) => project.id !== id)
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">
        My Projects
      </h2>

      {projects.length === 0 ? (
        <p className="text-gray-500">
          No projects added yet.
        </p>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border rounded-lg p-4"
            >
              <h3 className="font-bold text-lg">
                {project.title}
              </h3>

              <p className="text-gray-600 mt-2">
                {project.description}
              </p>

              <p className="text-sm text-purple-600 mt-2">
                {project.techStack}
              </p>

              <button
                onClick={() =>
                  deleteProject(project.id)
                }
                className="mt-3 px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectList;