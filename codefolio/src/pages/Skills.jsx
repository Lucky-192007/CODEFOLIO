import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { usePortfolio } from "../context/PortfolioContext";
import { useAuth } from "../context/AuthContext";

function Skills() {
  const { skills, setSkills, theme } = usePortfolio();
  const { user } = useAuth();
  const [isSyncing, setIsSyncing] = useState(false);

  const [skillData, setSkillData] = useState({
    category: "Programming Languages",
    name: "",
  });

  // 1. INITIAL RETRIEVAL LIFECYCLE FROM MONGODB TIER
  useEffect(() => {
    const fetchUserSkills = async () => {
      if (!user?.id) return;
      try {
        const response = await fetch(`http://localhost:5000/api/auth/profile/${user.id}`);
        const data = await response.json();
        if (response.ok && data.user?.skills) {
          setSkills(data.user.skills);
        }
      } catch (err) {
        console.error("Error retrieving user tech-stack items:", err);
      }
    };

    fetchUserSkills();
  }, [user?.id, setSkills]);

  // 2. LIVE PUSH ADDITION METHOD CONNECTED TO SERVER API
  const addSkill = async () => {
    if (!skillData.name.trim()) return;
    if (!user?.id) {
      alert("Error: Active user session not found.");
      return;
    }

    setIsSyncing(true);

    const payload = {
      userId: user.id,
      skill: {
        category: skillData.category,
        name: skillData.name.trim(),
      }
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/add-skill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to commit tech item to database.");
      }

      setSkills(data.skills || []);
      setSkillData({
        category: skillData.category,
        name: "",
      });

    } catch (err) {
      alert(err.message);
    } finally {
      setIsSyncing(false);
    }
  };

  // 3. DATABASE ACTION METHOD REMOVING SKILL ELEMENTS 
  const removeSkill = async (indexToRemove, skillId) => {
    if (!user?.id) return;

    const targetIdentifier = skillId || indexToRemove;

    try {
      const response = await fetch("http://localhost:5000/api/auth/delete-skill", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          skillIdentifier: targetIdentifier,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to scrub item from user record layout.");
      }

      setSkills(data.skills || []);

    } catch (err) {
      alert(err.message);
    }
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
        isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-100 text-slate-900"
      }`}>

        <h2 className="text-2xl font-black mb-6 tracking-tight">
          Skills Management
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <select
            value={skillData.category}
            onChange={(e) => setSkillData({ ...skillData, category: e.target.value })}
            className={`border p-3 rounded-xl transition font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none ${
              isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="e.g. React"
            disabled={isSyncing}
            value={skillData.name}
            onChange={(e) => setSkillData({ ...skillData, name: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
            className={`border p-3 rounded-xl transition focus:ring-2 focus:ring-purple-500 focus:outline-none ${
              isDark ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500" : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"
            }`}
          />

          <button
            onClick={addSkill}
            disabled={isSyncing}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition duration-150 py-3 shadow-md shadow-purple-600/10 disabled:opacity-50"
          >
            {isSyncing ? "Saving..." : "Add Skill"}
          </button>
        </div>

        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category} className={`pb-6 border-b last:border-0 last:pb-0 ${isDark ? "border-slate-800/65" : "border-slate-100"}`}>
              <h3 className={`text-base font-bold mb-3 ${isDark ? "text-slate-300" : "text-slate-800"}`}>
                {category}
              </h3>

              <div className="flex flex-wrap gap-3">
                {(skills || [])
                  .filter((skill) => skill && skill.category === category)
                  .map((skill, index) => (
                    <div
                      key={skill._id || index}
                      className={`px-4 py-2 rounded-xl flex items-center gap-2 border font-medium text-sm transition ${
                        isDark ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-slate-50 border-slate-100 text-slate-800"
                      }`}
                    >
                      <span>{skill.name}</span>
                      <button
                        onClick={() => removeSkill((skills || []).indexOf(skill), skill._id)}
                        className="text-red-500 hover:text-red-400 font-extrabold focus:outline-none pl-1 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                {(skills || []).filter((s) => s && s.category === category).length === 0 && (
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