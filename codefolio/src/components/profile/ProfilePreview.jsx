import { usePortfolio } from "../../context/PortfolioContext";
import { ensureAbsoluteUrl } from "../../utils/url";

function ProfilePreview() {
  const { profile, projects } = usePortfolio();

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

      {/* Navbar */}
      <div className="flex justify-between items-center px-8 py-5 border-b">
        <h2 className="font-bold text-xl">
          {profile.fullName || "Your Name"}
        </h2>

        <div className="flex gap-6 text-sm font-medium">
          <span>About</span>
          <span>Projects</span>
          <span>Skills</span>
          <span>Contact</span>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="grid md:grid-cols-2 gap-10 p-10">

        <div className="flex flex-col justify-center">

          <p className="text-gray-500 mb-3">
            Hey, I'm
          </p>

          <h1 className="text-5xl font-bold">
            {profile.fullName || "Your Name"}
          </h1>

          <h2 className="text-2xl text-purple-600 mt-3">
            {profile.title || "Frontend Developer"}
          </h2>

          <p className="text-gray-600 mt-5">
            {profile.bio ||
              "I build exceptional digital experiences using modern technologies."}
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            {profile.github && (
              <a
                href={ensureAbsoluteUrl(profile.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border rounded-lg hover:bg-slate-50 transition block font-medium text-sm text-slate-700"
              >
                GitHub
              </a>
            )}

            {profile.linkedin && (
              <a
                href={ensureAbsoluteUrl(profile.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border rounded-lg text-blue-600 hover:bg-slate-50 transition block font-medium text-sm"
              >
                LinkedIn
              </a>
            )}

            {profile.website && (
              <a
                href={ensureAbsoluteUrl(profile.website)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border rounded-lg hover:bg-slate-50 transition block font-medium text-sm text-slate-700"
              >
                Website
              </a>
            )}
          </div>

          {profile.resume && (
            <div className="mt-6">
              <a
                href={ensureAbsoluteUrl(profile.resume)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition inline-block font-bold text-sm"
              >
                Download Resume
              </a>
            </div>
          )}

        </div>

        <div className="relative flex justify-center items-center">

          <div className="absolute w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-40"></div>

          {profile.photo ? (
            <img
              src={profile.photo}
              alt="Profile"
              className="relative w-72 h-72 rounded-full object-cover shadow-lg"
            />
          ) : (
            <div className="relative w-72 h-72 rounded-full bg-slate-200 flex items-center justify-center text-7xl shadow-lg">
              👤
            </div>
          )}

        </div>

      </div>

      {/* ABOUT SECTION */}
      <section className="p-10 border-t">

        <h2 className="text-3xl font-bold mb-6">
          About Me
        </h2>

        <p className="text-gray-600 leading-relaxed mb-8">
          {profile.bio ||
            "Passionate developer focused on building modern web applications and creating exceptional user experiences."}
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-slate-50 p-5 rounded-xl">
            <h3 className="font-semibold mb-2">
              📍 Location
            </h3>

            <p>
              {profile.location || "Your Location"}
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl">
            <h3 className="font-semibold mb-2">
              💼 Experience
            </h3>

            <p>
              {profile.experience || "0 Years"}
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl">
            <h3 className="font-semibold mb-2">
              📧 Contact
            </h3>

            <p>
              {profile.email || "your@email.com"}
            </p>
          </div>

        </div>

      </section>

      {/* PROJECTS SECTION */}
      <section className="p-10 bg-slate-50 border-t">

        <h2 className="text-3xl font-bold mb-8">
          Projects
        </h2>

        {projects.length === 0 ? (
          <p className="text-gray-500">
            No projects added yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition"
              >

                <div className="h-48 bg-gradient-to-r from-purple-500 to-indigo-500"></div>

                <div className="p-6">

                  <h3 className="text-xl font-bold">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 mt-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">

                    {project.techStack
                      ?.split(",")
                      .map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                        >
                          {tech.trim()}
                        </span>
                      ))}

                  </div>

                  <div className="flex gap-3 mt-6">

                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-slate-900 text-white rounded-lg"
                      >
                        Live Demo
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 border rounded-lg"
                      >
                        GitHub
                      </a>
                    )}

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  );
}

export default ProfilePreview;