import { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { ensureAbsoluteUrl } from "../utils/url";
import { motion } from "framer-motion"; // Adjusted to standard package name
import ContactForm from "../components/shared/ContactForm";
import {
  Globe,
  Mail,
  MapPin,
  Briefcase,
  FileText,
  Copy,
  Check,
  ChevronRight,
  Sparkles,
  Search,
  Link,
  Terminal,
  Zap,       // Added missing icon imports
  Cpu,       // Added missing icon imports
  Activity,  // Added missing icon imports
  Shield     // Added missing icon imports
} from "lucide-react";

function CyberpunkTemplate({ portfolio }) {
  const context = usePortfolio();

  const profile = portfolio || context.profile;
  const projects = portfolio?.projects || context.projects;
  const skills = portfolio?.skills || context.skills;

  const [copied, setCopied] = useState(false);

  // Group skills by category safely
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "MODULES";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill.name || skill);
    return acc;
  }, {});

  const copyEmail = () => {
    if (!profile.email) return;
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#07010f] text-cyan-400 font-mono relative overflow-hidden selection:bg-pink-500 selection:text-white">
      
      {/* Laser grids backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1330_1px,transparent_1px),linear-gradient(to_bottom,#1f1330_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      
      {/* CRT Scanline effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(18,10,36,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none z-50 opacity-15" />

      {/* Cyber top status bar */}
      <div className="border-b border-cyan-800/60 bg-purple-950/20 backdrop-blur-md relative z-10 px-6 py-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs tracking-widest text-cyan-500/80">
          <div className="flex items-center gap-2 font-black text-cyan-400">
            <Terminal className="w-4 h-4 animate-pulse text-pink-500" />
            <span>NEURAL_PORT_v2.8</span>
          </div>

          <div className="flex items-center gap-4 text-[10px]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              Core online
            </span>
            <span className="text-pink-500/80">MATRIX_STREAMS: ON</span>
            <span className="hidden sm:inline-block">LOC: {profile.location ? profile.location.toUpperCase() : "GRID_COORDINATES"}</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 border border-pink-500/40 bg-pink-500/10 text-pink-400 px-3 py-1 text-xs tracking-widest uppercase font-black shadow-[0_0_15px_rgba(236,72,153,0.15)]"
            >
              <Zap className="w-3.5 h-3.5 fill-pink-400" />
              GRID OWNER INTEL
            </motion.div>

            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white leading-none uppercase"
              >
                {profile.fullName || "CYBER_RUNNER"}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 animate-pulse">
                  {profile.title || "Full Stack Architect"}
                </span>
              </motion.h1>

              {profile.location && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xs text-cyan-500 tracking-wider flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-pink-500" />
                  SECTOR: {profile.location.toUpperCase()}
                </motion.p>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="border-l-4 border-cyan-400 bg-cyan-950/10 p-4 rounded-r-xl max-w-xl text-sm leading-relaxed text-cyan-300 font-sans tracking-wide"
            >
              {profile.bio || "Input custom operative bio details into your portfolio manager to update database matrices."}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              {profile.github && (
                <a
                  href={ensureAbsoluteUrl(profile.github)}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 border-2 border-cyan-400 bg-cyan-400/5 hover:bg-cyan-400 hover:text-black font-extrabold tracking-widest uppercase text-xs transition duration-200 flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                >
                  <Link className="w-4 h-4" />
                  INITIATE_GitHub
                </a>
              )}

              {profile.linkedin && (
                <a
                  href={ensureAbsoluteUrl(profile.linkedin)}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 border-2 border-pink-500 bg-pink-500/5 hover:bg-pink-500 hover:text-black font-extrabold tracking-widest uppercase text-xs transition duration-200 flex items-center gap-2 shadow-[0_0_15px_rgba(236,72,153,0.2)]"
                >
                  <Globe className="w-4 h-4" />
                  LINKEDIN_GRID
                </a>
              )}
            </motion.div>
          </div>

          {/* Profile Picture Mockup container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="md:col-span-5 flex justify-center"
          >
            <div className="relative group">
              {/* Futuristic framing brackets */}
              <span className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
              <span className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
              <span className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-cyan-400" />
              <span className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-400" />
              
              <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-400 blur-lg opacity-40 group-hover:opacity-75 transition-all duration-300" />

              <img
                src={
                  profile.photo ||
                  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop"
                }
                alt="GRID OPERATIVE"
                referrerPolicy="no-referrer"
                className="relative w-64 h-64 sm:w-72 sm:h-72 object-cover border-2 border-cyan-500 bg-[#0e031f] saturate-150 brightness-95 group-hover:brightness-100 transition-all duration-300"
              />

              {profile.experience && (
                <div className="absolute bottom-4 right-4 bg-slate-950 border border-cyan-500 text-cyan-400 px-3.5 py-2 text-center flex flex-col justify-center min-w-24 font-mono shadow-[0_0_10px_rgba(34,211,238,0.25)]">
                  <span className="text-[9px] text-pink-500 uppercase tracking-widest font-black">EXP_CYCLE</span>
                  <span className="text-base font-black italic mt-0.5">{profile.experience.toUpperCase()}</span>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </section>

      {/* Projects terminal panel */}
      <section className="bg-slate-950/80 border-y border-purple-900/60 py-24 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          
          <div className="border-b border-purple-800/40 pb-8 mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-pink-500 text-xs font-black tracking-widest block mb-2">// DETECTED_OPERATIONS</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase text-white">
                PROJECT_FILES
              </h2>
            </div>
            <p className="text-cyan-500/60 text-xs max-w-xs uppercase leading-relaxed tracking-wider font-semibold">
              INSPECTING ACTIVE REPOSITORIES AND FUNCTIONAL APPLICATION SCHEMAS INSTALLED IN THIS GRID.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-[#0e0618] border border-cyan-500/30 rounded-lg overflow-hidden hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] flex flex-col justify-between"
                >
                  {/* Glowing header line */}
                  <div className="h-1 bg-gradient-to-r from-pink-500 via-cyan-400 to-indigo-600 block" />

                  <div>
                    {project.screenshot ? (
                      <div className="relative aspect-video overflow-hidden border-b border-cyan-950/80">
                        <div className="absolute inset-0 bg-cyan-950/20 mix-blend-color group-hover:opacity-0 transition duration-300" />
                        <img
                          src={project.screenshot}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter saturate-125"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-[#0b0314] flex items-center justify-center border-b border-purple-950/80">
                        <Cpu className="w-8 h-8 text-cyan-800 animate-pulse" />
                      </div>
                    )}

                    <div className="p-6 space-y-4">
                      <div>
                        {/* Terminal title mockup */}
                        <div className="text-[10px] text-pink-500/70 font-bold mb-1">// INDEX_FILE_{index + 1}</div>
                        <h3 className="text-lg font-black tracking-tight text-white group-hover:text-cyan-400 transition">
                          {project.title.toUpperCase()}
                        </h3>
                      </div>

                      <p className="text-xs text-cyan-200/80 font-sans leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {project.techStack?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {project.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="text-[9px] px-2 py-0.5 rounded border border-pink-500/30 bg-pink-500/5 text-pink-400 font-extrabold uppercase"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-[#11081d] border-t border-purple-950/50 flex justify-between items-center text-xs">
                    <div className="flex gap-4">
                      {project.github && (
                        <a
                          href={ensureAbsoluteUrl(project.github)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-400 hover:text-white transition-colors flex items-center gap-1 font-black"
                        >
                          SRC //
                        </a>
                      )}

                      {project.live && (
                        <a
                          href={ensureAbsoluteUrl(project.live)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-pink-400 hover:text-white transition-colors flex items-center gap-1 font-black"
                        >
                          EXE //
                        </a>
                      )}
                    </div>

                    <span className="text-[9px] text-cyan-700 font-bold uppercase tracking-widest bg-cyan-950/50 border border-cyan-800/40 px-2 py-0.5">
                      ACTIVE_X
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full border border-dashed border-cyan-800/50 py-12 text-center rounded-lg">
                <p className="text-cyan-600 text-xs">No cybernetic projects compiled yet.</p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Defensive/Core systems skills panel */}
      <section className="max-w-5xl mx-auto px-6 py-24 relative z-10">
        <div className="max-w-xl mb-12">
          <span className="text-pink-500 text-xs font-black tracking-widest block mb-2">// INTELLECT_CAPS</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase text-white">
            HARDWARE_MODULES
          </h2>
          <p className="text-cyan-500/70 text-xs mt-2 uppercase tracking-wide">
            Operative skillset structures currently loaded and actively cached in developer matrices.
          </p>
        </div>

        {Object.keys(groupedSkills).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(groupedSkills).map(([cat, skList], index) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#0b0314] border-2 border-cyan-950/80 p-6 rounded-xl flex flex-col justify-between hover:border-cyan-500/50 duration-200 transition"
              >
                <div>
                  <div className="text-xs font-black tracking-widest text-pink-400 uppercase border-b border-cyan-950/60 pb-3 mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-pink-500 animate-pulse" />
                    {cat.toUpperCase()} /
                  </div>
                  <ul className="space-y-2.5">
                    {skList.map((skillName, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-cyan-300 font-bold uppercase tracking-wider">
                        <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0" />
                        {skillName}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-cyan-800 py-12 text-center rounded-lg">
            <p className="text-cyan-600 text-xs">No active terminal tech stacks recognized.</p>
          </div>
        )}
      </section>

      {/* Cybernetic Contact Terminal */}
      <section className="bg-slate-950 py-24 border-t border-cyan-500/40 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[#0d011c]/20 mix-blend-color pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-black tracking-widest text-pink-500 uppercase">// OUTGOING_STREAM</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter">
              ESTABLISH_UPLINK
            </h2>
            <p className="text-cyan-500/80 font-sans text-sm max-w-lg mx-auto leading-relaxed">
              Ping neural servers, inspect active repository streams, or request private software operability coordinates below.
            </p>
          </div>

          <div className="max-w-md mx-auto pt-6 text-left">
            <ContactForm username={profile.username} variant="cyberpunk" />
          </div>

          <div className="flex justify-center gap-6 pt-4">
            {profile.github && (
              <a
                href={ensureAbsoluteUrl(profile.github)}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-black tracking-widest text-cyan-500 hover:text-white transition uppercase border-b-2 border-cyan-500/30 hover:border-cyan-400 pb-1"
              >
                // GitHub
              </a>
            )}

            {profile.linkedin && (
              <a
                href={ensureAbsoluteUrl(profile.linkedin)}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-black tracking-widest text-pink-400 hover:text-white transition uppercase border-b-2 border-pink-500/30 hover:border-pink-500 pb-1"
              >
                // LINKEDIN
              </a>
            )}

            {profile.website && (
              <a
                href={ensureAbsoluteUrl(profile.website)}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-black tracking-widest text-cyan-300 hover:text-white transition uppercase border-b-2 border-cyan-300/30 hover:border-cyan-300 pb-1"
              >
                // WEB_HOST
              </a>
            )}
          </div>

          <div className="pt-16 text-[10px] text-cyan-700/80 tracking-widest uppercase">
            &copy; {new Date().getFullYear()} {profile.fullName ? profile.fullName.toUpperCase() : "YOUR OPERATIVE ID"}. MATRIX UPLINKS PROTECTED.
          </div>
        </div>
      </section>

    </div>
  );
}

export default CyberpunkTemplate;