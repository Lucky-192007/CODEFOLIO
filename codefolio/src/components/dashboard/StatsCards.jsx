import { usePortfolio } from "../../context/PortfolioContext";
import { FolderGit2, Sparkles, Globe, CheckCircle2 } from "lucide-react";

function StatsCards() {
  const { profile, projects, skills, theme } = usePortfolio();

  // Calculate profile completion percentage
  const getCompletionPercentage = () => {
    let score = 0;
    
    // Profile weight: 60% (approx 6% per filled text field)
    const profileFields = [
      "fullName", "title", "bio", "email", "location", 
      "github", "linkedin", "photo"
    ];
    const filledFields = profileFields.filter(field => !!profile[field]);
    score += (filledFields.length / profileFields.length) * 60;

    // Projects weight: 20%
    if (projects.length >= 1) score += 10;
    if (projects.length >= 2) score += 10;

    // Skills weight: 20%
    if (skills.length >= 3) score += 10;
    if (skills.length >= 5) score += 10;

    return Math.min(Math.round(score), 100);
  };

  const completionRate = getCompletionPercentage();

  // Calculate connected links
  const links = [profile.github, profile.linkedin, profile.website, profile.resume];
  const connectedLinksCount = links.filter(Boolean).length;

  const stats = [
    {
      title: "Created Projects",
      value: projects.length,
      icon: <FolderGit2 className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />,
      colorClass: "bg-indigo-50 dark:bg-indigo-950/45",
    },
    {
      title: "Core Skills",
      value: skills.length,
      icon: <Sparkles className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
      colorClass: "bg-amber-50 dark:bg-amber-950/45",
    },
    {
      title: "Connected Links",
      value: `${connectedLinksCount} Connected`,
      icon: <Globe className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />,
      colorClass: "bg-emerald-50 dark:bg-emerald-950/45",
    },
    {
      title: "Setup Completion",
      value: `${completionRate}%`,
      icon: <CheckCircle2 className="w-5 h-5 text-purple-500 dark:text-purple-400" />,
      colorClass: "bg-purple-50 dark:bg-purple-950/45",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {stats.map((item) => (
        <div
          key={item.title}
          className={`p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800 text-white shadow-xl hover:border-slate-700"
              : "bg-white border-slate-200/60 shadow-sm hover:shadow-md text-slate-900"
          }`}
        >
          <div>
            <p className={`text-xs font-bold tracking-wider uppercase ${
              theme === "dark" ? "text-slate-400" : "text-slate-500"
            }`}>
              {item.title}
            </p>
            <h2 className="text-2xl font-extrabold mt-1.5 leading-tight">
              {item.value}
            </h2>
          </div>
          <div className={`p-3 rounded-xl transition-colors duration-300 ${item.colorClass}`}>
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
