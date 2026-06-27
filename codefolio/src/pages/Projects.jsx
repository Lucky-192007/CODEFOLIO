import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { usePortfolio } from "../context/PortfolioContext";
import { useAuth } from "../context/AuthContext"; // ◄--- Import useAuth for logged-in session details
import { Plus, Trash, GitBranch, ExternalLink, Award, Upload, Image as ImageIcon, X, Link as LinkIcon } from "lucide-react";

function Projects() {
  const { projects, setProjects, theme } = usePortfolio();
  const { user } = useAuth(); // ◄--- Target the active logged-in user context
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [project, setProject] = useState({
    title: "",
    description: "",
    techStack: "",
    github: "",
    live: "",
    screenshot: "",
  });

  // 1. FETCH ACTUAL PERSISTED PROJECTS ON COMPONENT MOUNT
  useEffect(() => {
    const fetchUserProjects = async () => {
      if (!user?.id) return;
      try {
        const response = await fetch(`http://localhost:5000/api/auth/profile/${user.id}`);
        const data = await response.json();
        if (response.ok && data.user?.projects) {
          setProjects(data.user.projects);
        }
      } catch (err) {
        console.error("Error retrieving persisted portfolio projects:", err);
      }
    };

    fetchUserProjects();
  }, [user?.id, setProjects]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProject((prev) => ({
          ...prev,
          screenshot: reader.result // Base64 data URL string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSelectedScreenshot = () => {
    setProject((prev) => ({
      ...prev,
      screenshot: ""
    }));
  };

  // 2. CONNECT SUBMIT ACTION TO THE BACKEND DB PIPELINE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!project.title.trim()) return;
    if (!user?.id) {
      alert("Error: Active user session not found.");
      return;
    }

    setIsSubmitting(true);

    // Split techStack raw input string by comma and clean whitespace layers
    const techStackArray = project.techStack
      ? project.techStack.split(",").map((t) => t.trim()).filter((t) => !!t)
      : [];

    const payload = {
      userId: user.id,
      project: {
        title: project.title.trim(),
        description: project.description.trim(),
        techStack: techStackArray,
        github: project.github.trim(),
        live: project.live.trim(),
        screenshot: project.screenshot,
      }
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/add-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to push new showcase card to cloud.");
      }

      // Sync the updated collection directly from the server response
      setProjects(data.projects);

      // Clear the local state form buffer fields safely
      setProject({
        title: "",
        description: "",
        techStack: "",
        github: "",
        live: "",
        screenshot: "",
      });

    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. CONNECT DELETE ACTION TO THE BACKEND DB PIPELINE
  const handleDelete = async (indexToDelete, projectId) => {
    if (!user?.id) return;

    // Use a confirmed DB project entry ID if available, otherwise fallback onto index matching
    const targetIdentifier = projectId || indexToDelete;

    if (!window.confirm("Are you sure you want to permanently delete this project from your showcase cabinet?")) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/delete-project", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          projectIdentifier: targetIdentifier,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to scrub project from database tier.");
      }

      // Update state instantly using the returned cloud array tracking layer
      setProjects(data.projects);

    } catch (err) {
      alert(err.message);
    }
  };

  const isDark = theme === "dark";

  return (
    <DashboardLayout>
      <div className="space-y-8 transition-colors duration-300">
        {/* Top Header Panel */}
        <div className={`flex justify-between items-center p-6 rounded-2xl border shadow-sm transition ${
          isDark
            ? "bg-slate-900 border-slate-800 text-white"
            : "bg-white border-slate-200/60 text-slate-900"
        }`}>
          <div>
            <h1 className="text-2xl font-black tracking-tight">
              Manage Projects
            </h1>
            <p className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Add, inspect, and organize the projects showcased in your public portfolio.
            </p>
          </div>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
            isDark ? "bg-purple-950/60 text-purple-300 border border-purple-900/30" : "bg-purple-50 text-purple-700"
          }`}>
            {projects.length} Total Projects
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add project form */}
          <div className={`p-6 rounded-2xl border shadow-sm h-fit transition ${
            isDark
              ? "bg-slate-900 border-slate-800 text-white"
              : "bg-white border-slate-200/60 text-slate-900"
          }`}>
            <h2 className="text-base font-bold mb-4 flex items-center gap-1.5 border-b pb-3 border-transparent">
              <Plus className="w-5 h-5 text-purple-500" />
              Add New Project
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}>
                  Project Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. My Portfolio Workspace"
                  required
                  value={project.title}
                  onChange={(e) =>
                    setProject({
                      ...project,
                      title: e.target.value,
                    })
                  }
                  className={`w-full border p-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/10 transition ${
                    isDark
                      ? "bg-slate-800 border-slate-700 text-white placeholder-slate-600 focus:border-purple-500"
                      : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500"
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}>
                  Description
                </label>
                <textarea
                  placeholder="Summarize key features and core purpose..."
                  value={project.description}
                  onChange={(e) =>
                    setProject({
                      ...project,
                      description: e.target.value,
                    })
                  }
                  className={`w-full border p-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/10 transition h-24 resize-none ${
                    isDark
                      ? "bg-slate-800 border-slate-700 text-white placeholder-slate-600 focus:border-purple-500"
                      : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500"
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}>
                  Technologies (Comma Separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. React, Tailwind CSS, TypeScript"
                  value={project.techStack}
                  onChange={(e) =>
                    setProject({
                      ...project,
                      techStack: e.target.value,
                    })
                  }
                  className={`w-full border p-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/10 transition ${
                    isDark
                      ? "bg-slate-805 border-slate-700 text-white placeholder-slate-600 focus:border-purple-500"
                      : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500"
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}>
                  GitHub Repository URL
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/yourusername/app"
                  value={project.github}
                  onChange={(e) =>
                    setProject({
                      ...project,
                      github: e.target.value,
                    })
                  }
                  className={`w-full border p-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/10 transition ${
                    isDark
                      ? "bg-slate-800 border-slate-700 text-white placeholder-slate-600 focus:border-purple-500"
                      : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500"
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}>
                  Live Website URL
                </label>
                <input
                  type="url"
                  placeholder="https://yourdeployedapp.com"
                  value={project.live}
                  onChange={(e) =>
                    setProject({
                      ...project,
                      live: e.target.value,
                    })
                  }
                  className={`w-full border p-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/10 transition ${
                    isDark
                      ? "bg-slate-800 border-slate-700 text-white placeholder-slate-600 focus:border-purple-500"
                      : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500"
                  }`}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span className={isDark ? "text-slate-400" : "text-slate-600"}>Project Screenshot</span>
                  {project.screenshot && (
                    <button
                      type="button"
                      onClick={removeSelectedScreenshot}
                      className="text-[10px] text-rose-500 hover:text-rose-400 hover:underline flex items-center gap-0.5 font-bold focus:outline-none"
                    >
                      <X className="w-3.5 h-3.5" /> Remove
                    </button>
                  )}
                </label>

                {project.screenshot ? (
                  <div className={`relative border rounded-xl p-2.5 flex items-center gap-3 transition ${
                    isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}>
                    <img
                      src={project.screenshot}
                      alt="Thumbnail img"
                      className="w-16 h-12 object-cover rounded border border-transparent shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold truncate ${isDark ? "text-slate-200" : "text-slate-800"}`}>Screenshot loaded</p>
                      <p className="text-[10px] text-slate-400">Successfully synced</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <label className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition group ${
                      isDark
                        ? "border-slate-800 bg-slate-900/30 hover:border-purple-500 hover:bg-slate-800/10"
                        : "border-slate-200 bg-slate-50/50 hover:border-purple-500 hover:bg-slate-50"
                    }`}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Upload className="w-5 h-5 text-slate-400 group-hover:text-purple-500 group-hover:scale-110 transition duration-150 mb-1" />
                      <span className={`text-xs font-bold ${isDark ? "text-slate-300" : "text-slate-600"}`}>Choose Image File</span>
                      <span className="text-[9px] text-slate-400 mt-0.5">Click or drag &amp; drop</span>
                    </label>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LinkIcon className="h-3.5 w-3.5 text-slate-500" />
                      </div>
                      <input
                        type="url"
                        placeholder="Or paste screenshot image URL..."
                        value={project.screenshot}
                        onChange={(e) =>
                          setProject({
                            ...project,
                            screenshot: e.target.value,
                          })
                        }
                        className={`w-full border pl-9 p-2 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/15 focus:border-purple-500 transition-all font-mono ${
                          isDark
                            ? "bg-slate-900 border-slate-800 text-white placeholder-slate-600 focus:border-purple-500"
                            : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500"
                        }`}
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-extrabold shadow transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                {isSubmitting ? "Syncing to Cloud..." : "Add to Showcase"}
              </button>
            </form>
          </div>

          {/* Project List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className={`text-lg font-bold flex items-center gap-2 ${
              isDark ? "text-slate-200" : "text-slate-800"
            }`}>
              <Award className="w-5 h-5 text-indigo-500" />
              Active Showcase ({projects.length})
            </h2>

            {projects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projects.map((item, index) => (
                  <div
                    key={item._id || index} // ◄--- Prefer DB entry unique object IDs
                    className={`rounded-2xl border shadow-sm overflow-hidden transition duration-200 flex flex-col justify-between ${
                      isDark
                        ? "bg-slate-900 border-slate-800 hover:border-slate-700 hover:shadow-lg"
                        : "bg-white border-slate-200/60 hover:border-slate-300 hover:shadow-md"
                    }`}
                  >
                    <div>
                      {item.screenshot ? (
                        <img
                          src={item.screenshot}
                          alt={item.title}
                          className={`w-full h-40 object-cover border-b ${
                            isDark ? "border-slate-800/80" : "border-slate-100"
                          }`}
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className={`w-full h-40 flex items-center justify-center border-b ${
                          isDark ? "bg-slate-950 border-slate-800/80" : "bg-slate-50 border-slate-100"
                        }`}>
                          <span className="text-xs text-slate-400 font-bold italic">
                            No Preview Screenshot
                          </span>
                        </div>
                      )}

                      <div className="p-5">
                        <h3 className={`font-extrabold text-base leading-snug ${
                          isDark ? "text-slate-100" : "text-slate-900"
                        }`}>
                          {item.title}
                        </h3>

                        <p className={`text-xs mt-2 line-clamp-3 leading-relaxed ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}>
                          {item.description || "No project description provided."}
                        </p>

                        {item.techStack?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-4">
                            {item.techStack.map((tech, idx) => (
                              <span
                                key={idx}
                                className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                                  isDark
                                    ? "bg-slate-800 text-slate-300 border border-slate-700/60"
                                    : "bg-slate-100 text-slate-600 border border-slate-200/40"
                                }`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={`px-5 py-4 border-t flex items-center justify-between ${
                      isDark ? "bg-slate-950/40 border-slate-800/60" : "bg-slate-50 border-slate-100"
                    }`}>
                      <div className="flex gap-2">
                        {item.github && (
                          <a
                            href={item.github}
                            target="_blank"
                            rel="noreferrer"
                            className={`p-2 rounded-xl border transition ${
                              isDark
                                ? "border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                                : "border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-white"
                            }`}
                            title="GitHub Repository"
                          >
                            <GitBranch className="w-4 h-4" />
                          </a>
                        )}

                        {item.live && (
                          <a
                            href={item.live}
                            target="_blank"
                            rel="noreferrer"
                            className={`p-2 rounded-xl border transition ${
                              isDark
                                ? "border-slate-800 text-slate-400 hover:text-purple-400 hover:bg-slate-800"
                                : "border-slate-200 text-slate-500 hover:text-purple-600 hover:bg-white"
                            }`}
                            title="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => handleDelete(index, item._id)} // ◄--- Pass index and explicit MongoDB unique Object ID
                        className={`p-2 rounded-xl border transition ${
                          isDark
                            ? "border-rose-950/40 text-rose-400 hover:text-rose-300 hover:bg-rose-950/20"
                            : "border-rose-100 text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                        }`}
                        title="Delete Project"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`p-12 text-center rounded-2xl border shadow-sm ${
                isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
              }`}>
                <p className="text-sm font-bold text-slate-400">
                  Your portfolio project cabinet is currently empty.
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Fill in the details on the left, and push 'Add to Showcase' to start displaying projects!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Projects;