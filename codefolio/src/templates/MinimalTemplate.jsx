import { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { ensureAbsoluteUrl } from "../utils/url";
import { motion } from "motion/react";
import profilepic from "../assets/profilepic.jpeg";
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
  Link
} from "lucide-react";


function MinimalTemplate({ portfolio }) {

  const context = usePortfolio();

  const profile = portfolio || context.profile;
  const projects = portfolio?.projects || context.projects;
  const skills = portfolio?.skills || context.skills;
  
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    if (!profile.email) return;
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Group skills by category safely
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill.name || skill);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans selection:bg-purple-100 selection:text-purple-900 leading-relaxed">
      
      {/* Decorative top accent */}
      <div className="h-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-slate-400 w-full" />

      {/* Floating Action Header inside Portfolio context */}
      <header className="max-w-5xl mx-auto px-6 py-6 flex justify-between items-center border-b border-slate-200/60">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-serif italic text-xl font-medium text-slate-800 tracking-tight"
        >
          {profile.fullName ? profile.fullName.split(" ")[0].toLowerCase() : "portfolio"}
          <span className="text-purple-600 font-bold font-sans not-italic">.</span>
        </motion.div>

        <motion.nav 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-6 text-xs uppercase tracking-widest font-semibold text-slate-500"
        >
          <a href="#about" className="hover:text-purple-600 transition">About</a>
          <a href="#projects" className="hover:text-purple-600 transition">Works</a>
          <a href="#skills" className="hover:text-purple-600 transition">Skills</a>
          <a href="#contact" className="hover:text-purple-600 transition">Contact</a>
        </motion.nav>
      </header>

      {/* Hero Section */}
      <section id="about" className="max-w-5xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100/50 text-purple-700 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
              Available for Opportunities
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-slate-900 tracking-tight leading-[1.1]">
                Hello, I'm <span className="font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900">{profile.fullName || "Your Name"}</span>
              </h1>
              <h2 className="text-xl md:text-2xl font-light text-purple-700/90 font-mono tracking-tight">
                {profile.title || "Full Stack Developer"}
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-light"
            >
              {profile.bio || "Write a beautiful introductory bio showcasing your design aesthetic, coding background, and professional goals."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              {profile.github && (
                <a
                  href={ensureAbsoluteUrl(profile.github)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-bold tracking-wider uppercase transition shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  GitHub Code
                </a>
              )}

              {profile.linkedin && (
                <a
                  href={ensureAbsoluteUrl(profile.linkedin)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold tracking-wider uppercase transition shadow-sm"
                >
                  {/* Inline LinkedIn SVG Icon */}
                  <svg className="w-4 h-4 text-blue-600 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
              )}

              {profile.location && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 font-mono pl-2">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  {profile.location}
                </span>
              )}
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="md:col-span-5 flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-purple-100 to-indigo-100 blur-lg opacity-60 animate-pulse" />
              
              <img
                src={
                  profile.photo ||profilepic
                  }
                alt={profile.fullName || "Portfolio Owner"}
                referrerPolicy="no-referrer"
                className="relative w-64 h-64 sm:w-72 sm:h-72 object-cover rounded-[2rem] border-4 border-white shadow-xl saturate-95 hover:saturate-100 transition-all duration-300 transform hover:scale-[1.02]"
              />

              {profile.experience && (
                <div className="absolute -bottom-4 -right-4 bg-white border border-slate-100 px-4 py-3 rounded-2xl shadow-lg text-center flex flex-col justify-center min-w-28">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Experience</span>
                  <span className="text-xl font-extrabold text-purple-700 font-serif italic mt-0.5">{profile.experience}</span>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </section>

      {/* Featured Works / Projects */}
      <section id="projects" className="bg-white border-y border-slate-200/50 py-24">
        <div className="max-w-5xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-600 block mb-2">Featured Works</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-slate-900 tracking-tight">
                Selected Projects
              </h2>
            </div>
            <p className="text-slate-500 font-light text-sm max-w-xs mt-3 md:mt-0 leading-relaxed">
              Curated web application creations centering clean code architectural styles and premium design interfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-[#faf9f6] rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md hover:border-slate-200 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {project.screenshot ? (
                      <div className="relative aspect-video overflow-hidden border-b border-slate-100/60 bg-slate-100">
                        <img
                          src={project.screenshot}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-slate-50 flex items-center justify-center border-b border-slate-100/60">
                        <span className="text-xs text-slate-400 font-mono font-medium">No screenshot uploaded</span>
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="text-xl font-serif font-medium text-slate-900 group-hover:text-purple-700 transition">
                        {project.title}
                      </h3>

                      <p className="text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed font-light">
                        {project.description}
                      </p>

                      {project.techStack?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {project.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2.5 py-1 rounded bg-slate-100 text-slate-500 font-semibold font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100/60 flex items-center gap-4">
                    {project.github && (
                      <a
                        href={ensureAbsoluteUrl(project.github)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition flex items-center gap-1"
                      >
                        Source
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                        </svg>
                      </a>
                    )}

                    {project.live && (
                      <a
                        href={ensureAbsoluteUrl(project.live)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold uppercase tracking-wider text-purple-700 hover:text-purple-900 transition flex items-center gap-0.5"
                      >
                        Live app
                        <Link className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full border border-dashed border-slate-200 py-12 text-center rounded-2xl">
                <p className="text-slate-400 text-sm">No featured projects found.</p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Skills Bento Grid Section */}
      <section id="skills" className="max-w-5xl mx-auto px-6 py-24">
        <div className="max-w-xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 block mb-2">Technical Arsenal</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-slate-900 tracking-tight">
            Skills &amp; Expertise
          </h2>
          <p className="text-slate-500 text-sm mt-2 font-light">
            A comprehensive overview of developer capabilities divided into logical specialized tiers.
          </p>
        </div>

        {Object.keys(groupedSkills).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(groupedSkills).map(([cat, skList], index) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-slate-100 shadow-sm p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3 mb-4">
                    <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
                    {cat}
                  </div>
                  <ul className="space-y-2.5">
                    {skList.map((skillName, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-700 font-medium font-sans">
                        <ChevronRight className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        {skillName}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-slate-200 py-12 text-center rounded-2xl">
            <p className="text-slate-400 text-sm">No specialized skill listings found.</p>
          </div>
        )}
      </section>

      {/* Detailed contact section */}
      <section id="contact" className="bg-slate-900 text-white py-24 rounded-t-[3.5rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-mono tracking-widest text-purple-400 uppercase font-semibold">Let's Connect</span>
              <h2 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-white leading-none">
                Start a conversation.
              </h2>
              <p className="text-slate-400 font-light text-sm max-w-md leading-relaxed">
                Whether you're planning a new platform build, looking to hire frontend expertise, or simply want to share web designs, feel free to reach out.
              </p>

              <div className="space-y-3 pt-4 text-sm font-mono text-slate-300">
                {profile.location && (
                  <p className="flex items-center gap-3">
                    <span className="text-purple-400">Location:</span>
                    <span>{profile.location}</span>
                  </p>
                )}
                {profile.website && (
                  <p className="flex items-center gap-3">
                    <span className="text-purple-400">Site:</span>
                    <a href={ensureAbsoluteUrl(profile.website)} target="_blank" rel="noreferrer" className="underline hover:text-white transition">
                      {profile.website.replace("https://", "").replace("http://", "")}
                    </a>
                  </p>
                )}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 p-8 rounded-3xl space-y-6">
              <h3 className="text-lg font-bold">Contact Card</h3>
              
              {profile.email ? (
                <div 
                  onClick={copyEmail}
                  className="bg-slate-900 border border-slate-700/60 p-4 rounded-xl cursor-pointer hover:bg-slate-950 transition flex items-center justify-between"
                  title="Click to Copy Email"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-lg">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-mono">EMAIL ADDRESS</p>
                      <p className="text-sm font-semibold font-mono text-slate-200">{profile.email}</p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-white transition p-1">
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              ) : (
                <div className="bg-slate-900 border border-slate-700/60 p-4 rounded-xl text-center text-xs text-slate-500">
                  No email address configured yet.
                </div>
              )}

              <div className="flex gap-3">
                {profile.github && (
                  <a
                    href={ensureAbsoluteUrl(profile.github)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-950 border border-slate-700/50 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition text-slate-300 hover:text-white"
                  >
                    <Link className="w-4 h-4" />
                    GitHub
                  </a>
                )}

                {profile.linkedin && (
                  <a
                    href={ensureAbsoluteUrl(profile.linkedin)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-950 border border-slate-700/50 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition text-slate-300 hover:text-white"
                  >
                    {/* Inline LinkedIn SVG Icon */}
                    <svg className="w-4 h-4 text-blue-400 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </a>
                )}
              </div>
            </div>

          </div>

          <div className="mt-24 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 font-mono">
            &copy; {new Date().getFullYear()} {profile.fullName || "Your Portfolio"}. Powered by CodeFolio.
          </div>
        </div>
      </section>

    </div>
  );
}

export default MinimalTemplate;