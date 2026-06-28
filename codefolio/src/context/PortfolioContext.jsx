import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import heroPhoto from "../assets/hero.png";

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
    description: "An intuitive web application allowing developers to build, customize, and deploy their professional portfolios in seconds.",
    techStack: ["React", "Tailwind CSS", "Vite", "LocalStorage"],
    github: "https://github.com",
    live: "https://example.com/live",
    screenshot: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop"
  },
  {
    title: "EcoSphere Mobile App",
    description: "A crowd-sourced environmental tracker helping local communities map pollution levels and coordinate community cleanups.",
    techStack: ["React Native", "Express", "MongoDB", "Maps API"],
    github: "https://github.com",
    live: "https://example.com/environmental",
    screenshot: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=500&auto=format&fit=crop"
  }
];

const initialSkills = [
  { category: "Frontend", name: "React" },
  { category: "Frontend", name: "TypeScript" },
  { category: "Frontend", name: "Tailwind CSS" },
  { category: "Backend", name: "Node.js" },
  { category: "Backend", name: "Express" },
  { category: "Database", name: "PostgreSQL" },
  { category: "DevOps", name: "Docker" }
];

export function PortfolioProvider({ children }) {
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

  // Dynamic real-time/persistent simulated visitor count
  const [views, setViews] = useState(() => {
    const saved = localStorage.getItem("portfolio_views");
    if (saved) return parseInt(saved, 10);
    const initialViews = 1424; // belief-anchored beginning views count
    localStorage.setItem("portfolio_views", initialViews.toString());
    return initialViews;
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

  const incrementViews = useCallback(() => {
    setViews((prev) => {
      const next = prev + 1;
      localStorage.setItem("portfolio_views", next.toString());
      return next;
    });
  }, []);

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
    localStorage.setItem("sidebar_collapsed", sidebarCollapsed ? "true" : "false");
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
    const user = JSON.parse(localStorage.getItem("dashboard_user"));

    if (!user) return;

    const response = await fetch(
      `http://localhost:5000/api/auth/profile/${user.id}`
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
      github: data.user.githubUrl,
      linkedin: data.user.linkedinUrl,
      website: data.user.websiteUrl,
      photo: data.user.photo || "",
    });

    setProjects(data.user.projects || []);
    setSkills(data.user.skills || []);
  } catch (err) {
    console.log(err.message);
  }
};

const savePortfolioData = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("dashboard_user"));

    if (!user) {
      alert("Please login first.");
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/auth/update-profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          fullName: profile.fullName,
          title: profile.title,
          experience: profile.experience,
          location: profile.location,
          bio: profile.bio,
          github: profile.github,
          linkedin: profile.linkedin,
          website: profile.website,
        }),
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
  const user = localStorage.getItem("dashboard_user");

  if (user) {
    loadPortfolio();
  }
}, []);
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
        incrementViews,
        theme,
        setTheme,
        toggleTheme,
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        loadPortfolio,
        savePortfolioData
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
