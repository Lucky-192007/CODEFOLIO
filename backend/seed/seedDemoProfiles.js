// One-off script to seed demo showcase profiles.
//
// Run with:  node seed/seedDemoProfiles.js
//
// Safe to re-run — it upserts by username instead of inserting duplicates,
// so running it again just refreshes the demo data instead of erroring out
// on the unique username/email index.

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

const DEMO_PASSWORD = "Demo@1234"; // not meant to be secure, these are public showcase accounts

const demoProfiles = [
  {
    username: "demo1",
    email: "demo1@codefolio.dev",
    password: DEMO_PASSWORD,
    fullName: "Rahul",
    title: "Full Stack Developer",
    experience: "4+ years",
    location: "kolkata ,West Bengal",
    bio: "I build clean, fast web apps. Currently focused on React, Node, and developer tooling.",
    github: "https://github.com/demo",
    linkedin: "https://linkedin.com/in/demo",
    website: "https://demo.dev",
    templateId: "minimal",
    isPro: false,
    skills: [
      { category: "Programming Languages", name: "JavaScript" },
      { category: "Programming Languages", name: "TypeScript" },
      { category: "Frontend", name: "React" },
      { category: "Frontend", name: "Tailwind CSS" },
      { category: "Backend", name: "Node.js" },
      { category: "Backend", name: "Express" },
      { category: "Database", name: "MongoDB" },
      { category: "DevOps", name: "Docker" },
    ],
    projects: [
      {
        title: "CodeFolio",
        description: "A no-code portfolio builder for developers — dynamic templates, vanity URLs, and SEO out of the box.",
        techStack: ["React", "Node.js", "Express", "MongoDB"],
        github: "https://github.com/demo",
        live: "https://demo.example.com",
        screenshot: "",
      },
      {
        title: "TaskFlow",
        description: "A drag-and-drop kanban board with real-time sync across collaborators using websockets.",
        techStack: ["React", "Socket.io", "PostgreSQL"],
        github: "https://github.com/demo/taskflow",
        live: "",
        screenshot: "",
      },
      {
        title: "WeatherLens",
        description: "A minimalist weather dashboard with 7-day forecasts and saved locations.",
        techStack: ["JavaScript", "OpenWeather API"],
        github: "https://github.com/demo/weatherlens",
        live: "https://weatherlens.example.com",
        screenshot: "",
      },
    ],
  },
  {
    username: "demo2",
    email: "demo2@codefolio.dev",
    password: DEMO_PASSWORD,
    fullName: "Ace",
    title: "Backend Engineer",
    experience: "6+ years",
    location: "Tokyo, Japan",
    bio: "Distributed systems and infrastructure. I like making things fast, observable, and hard to break. Open source contributor in my free time.",
    github: "https://github.com/Ace",
    linkedin: "https://linkedin.com/in/a",
    website: "https://Ace.dev",
    templateId: "cyberpunk",
    isPro: true,
    skills: [
      { category: "Programming Languages", name: "Go" },
      { category: "Programming Languages", name: "Python" },
      { category: "Backend", name: "gRPC" },
      { category: "Backend", name: "Kafka" },
      { category: "Database", name: "PostgreSQL" },
      { category: "Database", name: "Redis" },
      { category: "DevOps", name: "Kubernetes" },
      { category: "DevOps", name: "Terraform" },
    ],
    projects: [
      {
        title: "Pulsegrid",
        description: "A self-hosted metrics and alerting platform built for high cardinality time-series data.",
        techStack: ["Go", "PostgreSQL", "gRPC"],
        github: "https://github.com/Ace/pulsegrid",
        live: "",
        screenshot: "",
      },
      {
        title: "Forge CLI",
        description: "A Terraform wrapper that adds drift detection and Slack approval gates to infra changes.",
        techStack: ["Go", "Terraform", "Kubernetes"],
        github: "https://github.com/Ace/forge-cli",
        live: "",
        screenshot: "",
      },
      {
        title: "EventStream",
        description: "A lightweight Kafka-compatible event bus written for edge deployments with limited resources.",
        techStack: ["Python", "Kafka"],
        github: "https://github.com/Ace/eventstream",
        live: "https://eventstream.example.com",
        screenshot: "",
      },
    ],
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");

    for (const profile of demoProfiles) {
      const existing = await User.findOne({ username: profile.username });

      if (existing) {
        // Update everything except password (so re-running the script
        // doesn't re-hash an already-hashed password through the pre-save
        // hook, which would break login).
        const { password, ...rest } = profile;
        Object.assign(existing, rest);
        await existing.save();
        console.log(`Updated existing demo profile: /${profile.username}`);
      } else {
        const user = new User(profile);
        await user.save();
        console.log(`Created demo profile: /${profile.username}`);
      }
    }

    console.log("\nDone. Demo profiles are live at:");
    demoProfiles.forEach((p) => console.log(`  /${p.username}`));
  } catch (error) {
    console.error("Seed failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
