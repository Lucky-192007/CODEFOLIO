import { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { ensureAbsoluteUrl } from "../utils/url";
import { motion } from "motion/react";
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
  ShieldCheck,
  Building2,
  ExternalLink,
  Layers
} from "lucide-react";

function CorporateTemplate() {
  const { profile, projects, skills } = usePortfolio();
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans leading-relaxed selection:bg-blue-100 selection:text-blue-900">
      
      {/* Executive top accents */}
      <div className="h-2 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 w-full" />

      {/* Corporate Professional Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="h-9 w-9 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-sm">
              {profile.fullName ? profile.fullName.charAt(0) : "C"}
            </div>
            <div>
              <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg block leading-none">
                {profile.fullName || "Corporate Professional"}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block mt-0.5">
                Executive Portfolio
              </span>
            </div>
          </motion.div>

          <motion.nav 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:flex items-center gap-8 text-xs uppercase tracking-wider font-bold text-slate-500"
          >
            <a href="#about" className="hover:text-blue-700 transition">Overview</a>
            <a href="#projects" className="hover:text-blue-700 transition">Case Studies</a>
            <a href="#skills" className="hover:text-blue-700 transition">Expertise</a>
            <a href="#contact" className="hover:text-blue-700 transition">Credentials</a>
          </motion.nav>
        </div>
      </header>

      {/* Hero Showcase Hero */}
      <section id="about" className="bg-gradient-to-b from-white to-slate-100/50 py-16 md:py-24 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-12 xl:col-span-8 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-800 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Verified Professional Portfolio
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                  Hi, I am <span className="text-blue-900">{profile.fullName || "Your Full Name"}</span>
                </h1>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-700 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-slate-400" />
                  {profile.title || "Enterprise Software Architect"}
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 max-w-3xl font-normal leading-relaxed"
              >
                {profile.bio || "Crafting robust, high-performance web systems. Driven by scalability, high reliability, and professional excellence."}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 pt-4"
              >

               

                {profile.linkedin && (
                  <a
                    href={ensureAbsoluteUrl(profile.linkedin)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-bold uppercase tracking-wider transition shadow-sm"
                  >
                    <svg className="w-4 h-4 text-blue-600 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    Connect On LinkedIn
                  </a>
                )}

                {profile.github && (
                  <a
                    href={ensureAbsoluteUrl(profile.github)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-bold uppercase tracking-wider transition shadow-sm"
                  >
                    <svg className="w-4 h-4 text-slate-900 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                    GitHub Org
                  </a>
                )}

                {profile.location && (
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-500 font-mono tracking-tight ml-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    {profile.location}
                  </span>
                )}

                {profile.experience && (
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-500 font-mono tracking-tight ml-4 border-l pl-4 border-slate-200">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    {profile.experience} Experience
                  </span>
                )}
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-12 xl:col-span-4 flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-blue-300 to-indigo-500/20 blur-md opacity-30" />
                <img
                  src={
                    profile.photo ||
                    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop"
                  }
                  alt={profile.fullName}
                  className="w-56 h-56 md:w-64 md:h-64 rounded-2xl object-cover border-4 border-white shadow-xl bg-slate-100"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Projects Timeline (Case Studies) */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-slate-200">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-800">Portfolio Work</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Case Studies &amp; Projects
            </h2>
          </div>
          <p className="text-slate-500 text-sm max-w-sm mt-3 md:mt-0 font-medium">
            Production-grade systems, enterprise web applications, and architectural showcases.
          </p>
        </div>

        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((proj, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col group hover:border-blue-300"
              >
                {proj.screenshot ? (
                  <div className="h-48 overflow-hidden bg-slate-50 relative border-b border-slate-100">
                    <img
                      src={proj.screenshot}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-slate-100 flex items-center justify-center border-b border-slate-200 text-slate-400">
                    <Building2 className="w-10 h-10 stroke-1" />
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 truncate group-hover:text-blue-950">
                      {proj.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-3 font-normal mb-4">
                      {proj.description}
                    </p>
                    
                    {proj.techStack && proj.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {proj.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200/50 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    {proj.github && (
                       <a
                         href={ensureAbsoluteUrl(proj.github)}
                         target="_blank"
                         rel="noreferrer"
                         className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                       >
                         <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                           <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                         </svg>
                         Repository
                       </a>
                     )}
                    {proj.live && (
                       <a
                         href={ensureAbsoluteUrl(proj.live)}
                         target="_blank"
                         rel="noreferrer"
                         className="text-xs font-bold text-blue-800 hover:text-blue-900 flex items-center gap-1 ml-auto"
                       >
                         Launch Deployment
                         <ExternalLink className="w-3.5 h-3.5" />
                       </a>
                     )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white border rounded-2xl p-12 text-center text-slate-400 max-w-md mx-auto">
            <Layers className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <p className="text-sm">No professional project studies listed yet.</p>
          </div>
        )}
      </section>

      {/* Expertise & Technical Skills */}
      <section id="skills" className="bg-slate-900 text-white py-16 md:py-24 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12 pb-4 border-b border-slate-800 text-center md:text-left">
            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400">Skillset Framework</span>
            <h2 className="text-3xl font-black tracking-tight text-white mt-1">
              Core Technical Competencies
            </h2>
          </div>

          {Object.keys(groupedSkills).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(groupedSkills).map(([cat, skList], cIdx) => (
                <div key={cIdx} className="bg-slate-800 p-6 rounded-2xl border border-slate-800 shadow-lg">
                  <h3 className="text-sm uppercase tracking-wider font-extrabold text-blue-400 mb-4 flex items-center gap-2 pb-2 border-b border-slate-800">
                    <ChevronRight className="w-4 h-4 text-blue-500" />
                    {cat}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skList.map((skName, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-medium px-3 py-1.5 bg-slate-800 text-slate-200 border border-slate-700/50 rounded-xl flex items-center gap-1 hover:border-blue-500 hover:text-white transition duration-150"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        {skName}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-center py-6 text-sm">No structured skills logged in Dashboard CMS.</p>
          )}
        </div>
      </section>

      {/* Corporate Professional Credentials & Footer Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="bg-white border border-slate-200 shadow-lg rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
          <Mail className="w-10 h-10 text-blue-900 mx-auto mb-4" />
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Request Professional Consult</h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
            Get in touch to request structured technical consulting, enterprise projects validation, or freelance collaboration inquiries.
          </p>

          {profile.email ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <span className="text-base font-bold text-slate-800 font-mono px-4 py-2 bg-slate-100 rounded-xl">
                {profile.email}
              </span>
              <button
                onClick={copyEmail}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-sm w-full sm:w-auto"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" /> Copied Email!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy Email Address
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="p-4 bg-amber-50 text-amber-800 inline-block rounded-xl border border-amber-200 text-xs font-bold leading-normal">
              ⚠️ Email credentials not assigned. Create in the Dashboard Profile!
            </div>
          )}
        </div>
      </section>

      {/* Standard Footer */}
      <footer className="bg-slate-950 text-slate-500 py-12 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold tracking-wider uppercase">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-extrabold tracking-tight">{profile.fullName || "Corporate Professional"}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500">Portfolio</span>
          </div>
          <div>
            © {new Date().getFullYear()} All rights reserved. Registered Enterprise System.
          </div>
        </div>
      </footer>

    </div>
  );
}

export default CorporateTemplate;