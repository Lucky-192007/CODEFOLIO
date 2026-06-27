import { usePortfolio } from "../../context/PortfolioContext";
import { Link } from "react-router-dom";
import { Briefcase, ArrowRight, Star } from "lucide-react";

function RecentProjects() {
  const { projects, theme } = usePortfolio();
  const displayProjects = projects.slice(0, 3);

  const isDark = theme === "dark";

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between shadow-sm ${
      isDark
        ? "bg-slate-900 border-slate-800 text-white"
        : "bg-white border-slate-200/60 text-slate-900"
    }`}>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-lg font-bold flex items-center gap-2 ${
            isDark ? "text-slate-100" : "text-slate-800"
          }`}>
            <Briefcase className="w-5 h-5 text-purple-500" />
            Recent Projects
          </h2>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
            isDark ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"
          }`}>
            {projects.length} Total
          </span>
        </div>

        {displayProjects.length > 0 ? (
          <div className="space-y-4">
            {displayProjects.map((project, index) => (
              <div
                key={index}
                className={`group border p-4 rounded-xl transition ${
                  isDark
                    ? "border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-705"
                    : "border-slate-100 hover:bg-slate-50 hover:border-slate-200"
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <h3 className={`font-semibold transition text-sm ${
                    isDark
                      ? "text-slate-200 group-hover:text-purple-400"
                      : "text-slate-800 group-hover:text-purple-600"
                  }`}>
                    {project.title}
                  </h3>
                  <div className="flex gap-1 flex-wrap justify-end">
                    {project.techStack?.slice(0, 2).map((tech, i) => (
                      <span
                        key={i}
                        className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                          isDark
                            ? "bg-purple-950/50 text-purple-300 border border-purple-900/30"
                            : "bg-purple-50 text-purple-600 border border-purple-100"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <p className={`text-xs mt-1.5 line-clamp-2 ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}>
                  {project.description || "No description provided."}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-400">
            <Star className="w-8 h-8 mx-auto mb-2 opacity-45" />
            <p className="text-sm">No projects added yet.</p>
            <p className="text-xs mt-1">Start by adding a project in the Projects section.</p>
          </div>
        )}
      </div>

      <div className={`mt-6 pt-4 border-t ${isDark ? "border-slate-800/60" : "border-slate-100"}`}>
        <Link
          to="/projects"
          className={`w-full py-2.5 px-4 rounded-xl transition text-center text-xs font-bold flex items-center justify-center gap-1.5 ${
            isDark
              ? "bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 border border-purple-900/30"
              : "bg-purple-50 hover:bg-purple-100 text-purple-700"
          }`}
        >
          Manage Projects
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default RecentProjects;
