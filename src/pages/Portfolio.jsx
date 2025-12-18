import React, { useState } from "react";

const Portfolio = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const stats = [
    { label: "Projects Completed", value: "25+" },
    { label: "Happy Clients", value: "40+" },
    { label: "Lines of Code", value: "100K+" },
    { label: "Years Experience", value: "5+" },
  ];

  const projects = [
    {
      title: "AI Task Manager",
      description: "Smart task management with AI-powered prioritization and analytics",
      tech: ["React", "Node.js", "MongoDB", "OpenAI"],
      link: "#",
      gradient: "from-blue-500 to-cyan-500",
      stats: "15K+ Users",
    },
    {
      title: "Design System",
      description: "Comprehensive component library with accessible UI patterns",
      tech: ["React", "Tailwind", "Storybook", "TypeScript"],
      link: "#",
      gradient: "from-purple-500 to-pink-500",
      stats: "500+ Components",
    },
    {
      title: "Real-time Analytics",
      description: "Live data visualization dashboard with WebSocket integration",
      tech: ["Vue", "D3.js", "Firebase", "Chart.js"],
      link: "#",
      gradient: "from-orange-500 to-red-500",
      stats: "1M+ Data Points",
    },
    {
      title: "Mobile App",
      description: "Cross-platform fitness tracking application",
      tech: ["React Native", "Redux", "Firebase", "Expo"],
      link: "#",
      gradient: "from-green-500 to-teal-500",
      stats: "50K+ Downloads",
    },
  ];

  const skills = [
    {
      category: "Frontend",
      items: ["React", "Vue.js", "Tailwind CSS", "TypeScript", "Next.js", "Framer Motion"],
      icon: "💻",
    },
    {
      category: "Backend",
      items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "GraphQL", "REST API"],
      icon: "🚀",
    },
    {
      category: "Tools & DevOps",
      items: ["Git", "Docker", "AWS", "Figma", "CI/CD", "Vercel"],
      icon: "🛠️",
    },
  ];

  const experience = [
    {
      role: "Senior Full Stack Developer",
      company: "Tech Innovations Inc",
      duration: "2022 - Present",
      description: "Leading frontend architecture and mentoring junior developers",
    },
    {
      role: "Full Stack Developer",
      company: "Digital Solutions Co",
      duration: "2020 - 2022",
      description: "Built scalable web applications for enterprise clients",
    },
    {
      role: "Frontend Developer",
      company: "Creative Studios",
      duration: "2019 - 2020",
      description: "Designed and implemented responsive user interfaces",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-black min-h-screen text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none -z-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold">D</div>
            Dev
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-slate-400 hover:text-white transition text-2xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          <div
            className={`absolute md:static top-16 left-0 right-0 md:right-auto bg-slate-950/95 md:bg-transparent md:flex gap-8 ${
              menuOpen ? "flex flex-col" : "hidden"
            } md:flex-row p-6 md:p-0 border-b md:border-0 border-slate-800 backdrop-blur-xl`}
          >
            {["Home", "Projects", "Experience", "Skills", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 hover:text-white transition relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 flex items-center min-h-screen mt-16">
        <div className="w-full">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 text-blue-300 text-sm font-medium backdrop-blur-sm">
              ✨ Welcome to my portfolio
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Creative <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Developer
            </span>
            <br />& Designer
          </h1>
          <p className="text-xl text-slate-400 mb-12 max-w-3xl leading-relaxed">
            I create beautiful, responsive web experiences with cutting-edge technologies. Specializing in React, modern UI/UX, and full-stack development that transforms ideas into reality.
          </p>
          <div className="flex flex-wrap gap-4 mb-16">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition transform hover:scale-105">
              View My Work →
            </button>
            <button className="px-8 py-4 border border-slate-600 rounded-lg font-semibold hover:bg-slate-800 transition backdrop-blur-sm">
              Get in Touch
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold text-blue-400 mb-1">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="mb-16">
          <h2 className="text-5xl font-bold mb-4 flex items-center gap-3">
            <span className="text-3xl">💼</span>
            Featured Projects
          </h2>
          <p className="text-slate-400 text-lg">Innovative solutions I've built</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className="group relative bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600 transition overflow-hidden backdrop-blur-sm cursor-pointer hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition duration-300`}
              ></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -z-10 group-hover:scale-150 transition duration-300"></div>
              
              <div className="relative z-1">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-blue-400 font-medium">{project.stats}</p>
                  </div>
                  <span className="text-slate-400 group-hover:text-blue-400 transition transform group-hover:rotate-45 text-2xl">↗</span>
                </div>
                <p className="text-slate-400 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full border border-slate-600/50 backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="mb-16">
          <h2 className="text-5xl font-bold mb-4 flex items-center gap-3">
            <span className="text-3xl">🎯</span>
            Experience
          </h2>
          <p className="text-slate-400 text-lg">My professional journey</p>
        </div>

        <div className="space-y-6">
          {experience.map((exp, i) => (
            <div
              key={i}
              className="group relative bg-gradient-to-r from-slate-800/30 to-slate-900/30 border border-slate-700/50 rounded-xl p-6 hover:border-slate-600 transition backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                  <p className="text-blue-400 font-medium">{exp.company}</p>
                </div>
                <span className="px-3 py-1 bg-slate-700/50 text-slate-300 text-sm rounded-full w-fit">{exp.duration}</span>
              </div>
              <p className="text-slate-400">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="mb-16">
          <h2 className="text-5xl font-bold mb-4 flex items-center gap-3">
            <span className="text-3xl">⚡</span>
            Skills & Tech Stack
          </h2>
          <p className="text-slate-400 text-lg">Technologies I work with</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <div
              key={i}
              className="group bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600 transition backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <span className="text-2xl">{skill.icon}</span>
                {skill.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, j) => (
                  <span
                    key={j}
                    className="px-3 py-2 bg-slate-700/40 text-slate-300 text-sm rounded-lg hover:bg-blue-500/20 hover:text-blue-300 transition cursor-default border border-slate-600/30"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="relative bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-slate-700/50 rounded-3xl p-12 md:p-20 text-center overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 -z-10"></div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Let's Create Something Amazing</h2>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto text-lg">
            Have a project in mind? I'd love to collaborate and bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition flex items-center justify-center gap-2 hover:scale-105 transform">
              ✉️ Send Me an Email
            </button>
            <button className="px-8 py-4 border border-slate-600 rounded-lg font-semibold hover:bg-slate-800 transition">
              Schedule a Call
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 bg-slate-950/50 mt-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold">D</div>
                DevPortfolio
              </h3>
              <p className="text-slate-400">Building beautiful digital experiences</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-slate-400">
                <a href="#projects" className="block hover:text-white transition">Projects</a>
                <a href="#experience" className="block hover:text-white transition">Experience</a>
                <a href="#skills" className="block hover:text-white transition">Skills</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-3">
                <button className="w-12 h-12 rounded-lg bg-slate-800/50 hover:bg-blue-500/20 transition flex items-center justify-center text-slate-400 hover:text-blue-400 border border-slate-700/50 font-bold">
                  GH
                </button>
                <button className="w-12 h-12 rounded-lg bg-slate-800/50 hover:bg-blue-500/20 transition flex items-center justify-center text-slate-400 hover:text-blue-400 border border-slate-700/50 font-bold">
                  LI
                </button>
                <button className="w-12 h-12 rounded-lg bg-slate-800/50 hover:bg-blue-500/20 transition flex items-center justify-center text-slate-400 hover:text-blue-400 border border-slate-700/50 font-bold">
                  ✉️
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm gap-4">
            <p>© 2024 DevPortfolio. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;