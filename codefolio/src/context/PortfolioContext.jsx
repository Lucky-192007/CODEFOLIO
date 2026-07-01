import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import heroPhoto from "../assets/hero.png";
import { useAuth } from "./AuthContext";

const API = import.meta.env.VITE_API || "https://codefolio-dtdk.onrender.com/api";

const PortfolioContext = createContext();

const initialProfile = {
  fullName: "Laxman Singh",
  title: "Full Stack Engineer",
  bio: "Passionate software builder creating beautiful, performant web applications with modern technologies like React, Tailwind CSS, and Node.js.",
  email: "laxman.singh@example.com",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/in/",
  website: "https://example.com",
  resume: "",
  photo: heroPhoto,
  location: "Hyderabad, India",
  experience: "5+ Years",
};

const initialProjects = [
  {
    title: "CodeFolio Builder",
    description:
      "An intuitive web application allowing developers to build, customize, and deploy their professional portfolios in seconds.",
    techStack: ["React", "Tailwind CSS", "Vite", "LocalStorage"],
    github: "https://github.com",
    live: "https://example.com/live",
    screenshot:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop",
  },
  {
    title: "EcoSphere Mobile App",
    description:
      "A crowd-sourced environmental tracker helping local communities map pollution levels and coordinate community cleanups.",
    techStack: ["React Native", "Express", "MongoDB", "Maps API"],
    github: "https://github.com",
    live: "https://example.com/environmental",
    screenshot:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=500&auto=format&fit=crop",
  },
];

const initialSkills = [
  { category: "Frontend", name: "React" },
  { category: "Frontend", name: "TypeScript" },
  { category: "Frontend", name: "Tailwind CSS" },
  { category: "Backend", name: "Node.js" },
  { category: "Backend", name: "Express" },
  { category: "Database", name: "PostgreSQL" },
  { category: "DevOps", name: "Docker" },
];

export function PortfolioProvider({ children }) {
  const { user } = useAuth();

  const [templateId, setTemplateId] = useState(
    localStorage.getItem("templateId") || "minimal"
  );

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("profile");
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem("skills");
    return saved ? JSON.parse(saved) : initialSkills;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("dashboard_theme") || "light";
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem("sidebar_collapsed") === "true";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const views = profile.views || 0;
  const lastViewed = profile.lastViewed || null;
  const isPro = profile.isPro || false;

  useEffect(() => {
    localStorage.setItem("dashboard_theme", theme);

    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(
      "sidebar_collapsed",
      sidebarCollapsed ? "true" : "false"
    );
  }, [sidebarCollapsed]);

  useEffect(() => {
    localStorage.setItem("templateId", templateId);
  }, [templateId]);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);

  const loadPortfolio = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("dashboard_user"));

      if (!currentUser) return;

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API}/auth/profile/${currentUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

     setProfile({
  fullName: data.user.fullName,
  title: data.user.title,
  experience: data.user.experience,
  location: data.user.location,
  bio: data.user.bio,
  email: data.user.email,
  github: data.user.github,
  linkedin: data.user.linkedin,
  website: data.user.website,
  resume: data.user.resume || "",
  photo: data.user.photo || "",
  customDomain: data.user.customDomain || "",
  views: data.user.views || 0,
  lastViewed: data.user.lastViewed || null,
  isPro: data.user.isPro || false,
});

setTemplateId(data.user.templateId || "minimal");
setProjects(data.user.projects || []);
setSkills(data.user.skills || []);

      
    } catch (err) {
      console.error(err.message);
    }
  };

  const savePortfolioData = async (overrides = {}) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("dashboard_user"));

      if (!currentUser) {
        alert("Please login first.");
        return;
      }

      const token = localStorage.getItem("token");

      const payload = {
        userId: currentUser.id,
        fullName: profile.fullName,
        title: profile.title,
        experience: profile.experience,
        location: profile.location,
        bio: profile.bio,
        github: profile.github,
        linkedin: profile.linkedin,
        website: profile.website,
        templateId,
        resume: profile.resume,
        photo: profile.photo,
        customDomain: profile.customDomain,
        // Overrides win over current React state — needed when saving
        // immediately after a setState call (e.g. picking a theme), since
        // the state update hasn't landed yet when this runs.
        ...overrides,
      };

      const response = await fetch(
        `${API}/auth/update-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log("Profile saved successfully");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    if (user?.id) {
      loadPortfolio();
    }
  }, [user?.id]);

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        setProfile,
        projects,
        setProjects,
        skills,
        setSkills,
        templateId,
        setTemplateId,
        views,
        lastViewed,
        isPro,
        theme,
        setTheme,
        toggleTheme,
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        loadPortfolio,
        savePortfolioData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}