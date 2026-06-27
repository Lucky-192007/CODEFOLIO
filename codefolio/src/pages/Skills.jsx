import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { usePortfolio } from "../context/PortfolioContext";

function Skills() {
  const { skills, setSkills, theme } = usePortfolio();

  const [skillData, setSkillData] = useState({
    category: "Programming Languages",
    name: "",
  });

  const addSkill = () => {
    if (!skillData.name.trim()) return;

    setSkills([
      ...skills,
      {
        category: skillData.category,
        name: skillData.name,
      },
    ]);

    setSkillData({
      category: "Programming Languages",
      name: "",
    });
  };

  const removeSkill = (indexToRemove) => {
    setSkills(
      skills.filter(
        (_, index) => index !== indexToRemove
      )
    );
  };

  const categories = [
    "Programming Languages",
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
  ];

  const isDark = theme === "dark";

  return (
    <DashboardLayout>
      <div className={`p-8 rounded-2xl border transition-all duration-300 shadow-sm ${
        isDark
          ? "bg-slate-900 border-slate-800 text-white"
          : "bg-white border-slate-100 text-slate-900"
      }`}>

        <h2 className="text-2xl font-black mb-6 tracking-tight">
          Skills Management
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <select
            value={skillData.category}
            onChange={(e) =>
              setSkillData({
                ...skillData,
                category: e.target.value,
              })
            }
            className={`border p-3 rounded-xl transition font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none ${
              isDark
                ? "bg-slate-805 border-slate-700 text-white"
                : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            <option>Programming Languages</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Database</option>
            <option>DevOps</option>
          </select>

          <input
            type="text"
            placeholder="e.g. React"
            value={skillData.name}
            onChange={(e) =>
              setSkillData({
                ...skillData,
                name: e.target.value,
              })
            }
            className={`border p-3 rounded-xl transition focus:ring-2 focus:ring-purple-500 focus:outline-none ${
              isDark
                ? "bg-slate-805 border-slate-700 text-white placeholder-slate-500"
                : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"
            }`}
          />

          <button
            onClick={addSkill}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition duration-150 py-3 shadow-md shadow-purple-600/10"
          >
            Add Skill
          </button>
        </div>

        <div className="space-y-6">
          {categories.map((category) => (
            <div
              key={category}
              className={`pb-6 border-b last:border-0 last:pb-0 ${
                isDark ? "border-slate-800/65" : "border-slate-100"
              }`}
            >
              <h3 className={`text-base font-bold mb-3 ${
                isDark ? "text-slate-300" : "text-slate-805"
              }`}>
                {category}
              </h3>

              <div className="flex flex-wrap gap-3">
                {skills
                  .filter(
                    (skill) =>
                      skill.category === category
                  )
                  .map((skill, index) => (
                    <div
                      key={index}
                      className={`px-4 py-2 rounded-xl flex items-center gap-2 border font-medium text-sm transition ${
                        isDark
                          ? "bg-slate-800 border-slate-700 text-slate-200"
                          : "bg-slate-50 border-slate-100 text-slate-800"
                      }`}
                    >
                      <span>
                        {skill.name}
                      </span>

                      <button
                        onClick={() =>
                          removeSkill(
                            skills.indexOf(skill)
                          )
                        }
                        className="text-red-500 hover:text-red-400 font-extrabold focus:outline-none pl-1"
                        aria-label={`Remove ${skill.name}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}

                {skills.filter(s => s.category === category).length === 0 && (
                  <p className="text-xs text-slate-400 italic">No skills added in this category.</p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Skills;
