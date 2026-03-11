import { useState, useEffect } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "REST APIs", "GraphQL"] },
  { category: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "Prisma"] },
  { category: "DevOps", items: ["Docker", "AWS", "CI/CD", "Git"] },
];

const PROJECTS = [
  {
    title: "Project Alpha",
    desc: "A full-stack web application with real-time features and a sleek dashboard UI. Built with React, Node.js, and WebSockets.",
    tags: ["React", "Node.js", "WebSockets"],
    year: "2024",
    link: "#",
  },
  {
    title: "Project Beta",
    desc: "An e-commerce platform with advanced filtering, payments integration, and an admin panel for managing inventory.",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    year: "2024",
    link: "#",
  },
  {
    title: "Project Gamma",
    desc: "A developer productivity tool that automates repetitive workflows and integrates with popular APIs and services.",
    tags: ["TypeScript", "Docker", "AWS"],
    year: "2023",
    link: "#",
  },
];

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  useScrollReveal();

  const handleSubmit = () => {
    if (formState.name && formState.email && formState.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen font-mono">

      {/* Noise overlay */}
      <div className="noise-bg" />

      {/* Background glows */}
      <div className="glow-dot" style={{ width: 500, height: 500, background: "#f97316", top: -100, right: -100 }} />
      <div className="glow-dot" style={{ width: 400, height: 400, background: "#6366f1", bottom: 200, left: -100 }} />

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5"
        style={{ backdropFilter: "blur(12px)", background: "rgba(9,9,11,0.75)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span className="display text-xl text-zinc-100 tracking-tight">S<span style={{ color: "#f97316" }}>.</span></span>

        {/* Desktop */}
        <div className="hidden md:flex gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link text-zinc-400 text-xs tracking-widest uppercase">{l}</a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="block w-5 h-px bg-zinc-300" style={{ transform: menuOpen ? "rotate(45deg) translateY(4px)" : "none", transition: "transform 0.2s" }} />
          <span className="block w-5 h-px bg-zinc-300" style={{ opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s" }} />
          <span className="block w-5 h-px bg-zinc-300" style={{ transform: menuOpen ? "rotate(-45deg) translateY(-4px)" : "none", transition: "transform 0.2s" }} />
        </button>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="animate-fade-in-down absolute top-full left-0 right-0 bg-zinc-950 border-b border-zinc-800 px-6 py-4 flex flex-col gap-4 md:hidden">
            {NAV_LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                className="text-zinc-300 text-sm tracking-widest uppercase nav-link">{l}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-24 pb-16 overflow-hidden">
        <div className="max-w-5xl relative z-10">
          <p className="section-label mb-6">Available for opportunities</p>
          <h1 className="hero-name mb-4">
            Saurabh<br />
            <span style={{ fontStyle: "italic" }}>Sharma.</span>
          </h1>
          <div className="flex items-center gap-3 mb-8 mt-6">
            <span className="accent-line" />
            <span className="mono text-zinc-400 text-sm md:text-base">Full-Stack Developer · Problem Solver · Builder</span>
          </div>
          <p className="mono text-zinc-500 text-sm md:text-base max-w-xl leading-relaxed mb-10">
            I craft fast, scalable web applications from idea to deployment — with clean code and an obsession for detail.
            <span className="cursor-blink ml-1 text-orange-500">_</span>
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary">VIEW WORK</a>
            <a href="#contact" style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#a1a1aa", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, letterSpacing: "0.08em", fontSize: "0.8rem", padding: "0.85rem 2rem", textDecoration: "none", borderRadius: "4px", transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.target.style.borderColor = "#f97316"; e.target.style.color = "#f97316"; }}
              onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; e.target.style.color = "#a1a1aa"; }}>
              CONTACT ME
            </a>
          </div>
        </div>

        {/* Decorative grid number */}
        <div className="absolute bottom-10 right-10 mono text-zinc-800 text-7xl font-bold select-none hidden lg:block">01</div>
      </section>

      <div className="grid-line mx-6 md:mx-16" />

      {/* ── ABOUT ── */}
      <section id="about" className="relative py-24 px-6 md:px-16 lg:px-24 overflow-hidden">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-4 reveal">About Me</p>
            <h2 className="display text-4xl md:text-5xl text-zinc-100 leading-tight mb-6 reveal reveal-delay-1">
              Turning ideas into<br /><span style={{ color: "#f97316", fontStyle: "italic" }}>reality.</span>
            </h2>
            <p className="mono text-zinc-400 text-sm leading-relaxed mb-4 reveal reveal-delay-2">
              Hey! I'm Saurabh — a passionate full-stack developer who loves building things that live on the internet. I thrive at the intersection of engineering and design, making sure my work is both functional and beautiful.
            </p>
            <p className="mono text-zinc-400 text-sm leading-relaxed reveal reveal-delay-3">
              With experience across the entire web stack, I enjoy tackling complex problems and shipping products that make a difference. When I'm not coding, I'm exploring new tech, contributing to open source, or learning something new.
            </p>
          </div>

          {/* Stats card */}
          <div className="reveal reveal-delay-2">
            <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px", padding: "2rem", background: "rgba(255,255,255,0.02)" }}>
              {[
                { label: "Years of Experience", value: "3+" },
                { label: "Projects Shipped", value: "20+" },
                { label: "Technologies Mastered", value: "15+" },
                { label: "Open Source Contributions", value: "10+" },
              ].map((stat, i) => (
                <div key={i} className={`flex justify-between items-center py-4 ${i < 3 ? "border-b border-zinc-800" : ""}`}>
                  <span className="mono text-zinc-500 text-xs">{stat.label}</span>
                  <span className="display text-2xl" style={{ color: "#f97316" }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 right-10 mono text-zinc-800 text-7xl font-bold select-none hidden lg:block">02</div>
      </section>

      <div className="grid-line mx-6 md:mx-16" />

      {/* ── SKILLS ── */}
      <section id="skills" className="relative py-24 px-6 md:px-16 lg:px-24 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <p className="section-label mb-4 reveal">Skills</p>
          <h2 className="display text-4xl md:text-5xl text-zinc-100 leading-tight mb-14 reveal reveal-delay-1">
            My <span style={{ color: "#f97316", fontStyle: "italic" }}>toolkit.</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILLS.map((group, gi) => (
              <div key={gi} className={`skill-card reveal reveal-delay-${gi + 1}`}
                style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px", padding: "1.5rem", background: "rgba(255,255,255,0.02)", transition: "border-color 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#f97316"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}>
                <p className="section-label mb-4">{group.category}</p>
                <div className="flex flex-col gap-3">
                  {group.items.map((skill, si) => (
                    <div key={si}>
                      <div className="flex justify-between mb-1">
                        <span className="mono text-zinc-300 text-xs">{skill}</span>
                      </div>
                      <div className="h-px bg-zinc-800 rounded-full overflow-hidden">
                        <div className="skill-bar-fill h-full rounded-full"
                          style={{ width: `${85 - si * 5}%`, background: "rgba(249,115,22,0.5)", transition: "background 0.3s, width 0.8s ease" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-10 right-10 mono text-zinc-800 text-7xl font-bold select-none hidden lg:block">03</div>
      </section>

      <div className="grid-line mx-6 md:mx-16" />

      {/* ── PROJECTS ── */}
      <section id="projects" className="relative py-24 px-6 md:px-16 lg:px-24 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <p className="section-label mb-4 reveal">Projects</p>
          <h2 className="display text-4xl md:text-5xl text-zinc-100 leading-tight mb-14 reveal reveal-delay-1">
            Selected <span style={{ color: "#f97316", fontStyle: "italic" }}>work.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {PROJECTS.map((project, i) => (
              <a key={i} href={project.link}
                className={`project-card reveal reveal-delay-${i + 1} block no-underline`}
                style={{ borderRadius: "8px", padding: "1.75rem", background: "rgba(255,255,255,0.02)", textDecoration: "none" }}>
                <div className="flex justify-between items-start mb-4">
                  <span className="mono text-zinc-600 text-xs">{project.year}</span>
                  <span style={{ color: "#f97316", fontSize: "1.2rem" }}>↗</span>
                </div>
                <h3 className="display text-xl text-zinc-100 mb-3">{project.title}</h3>
                <p className="mono text-zinc-500 text-xs leading-relaxed mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, ti) => (
                    <span key={ti} className="mono text-xs px-2 py-1 rounded"
                      style={{ background: "rgba(249,115,22,0.1)", color: "#f97316", border: "1px solid rgba(249,115,22,0.2)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="absolute bottom-10 right-10 mono text-zinc-800 text-7xl font-bold select-none hidden lg:block">04</div>
      </section>

      <div className="grid-line mx-6 md:mx-16" />

      {/* ── CONTACT ── */}
      <section id="contact" className="relative py-24 px-6 md:px-16 lg:px-24 overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <p className="section-label mb-4 reveal">Contact</p>
          <h2 className="display text-4xl md:text-5xl text-zinc-100 leading-tight mb-4 reveal reveal-delay-1">
            Let's <span style={{ color: "#f97316", fontStyle: "italic" }}>work together.</span>
          </h2>
          <p className="mono text-zinc-500 text-sm mb-12 reveal reveal-delay-2">
            Have a project in mind, or just want to say hi? Drop me a message and I'll get back to you.
          </p>

          {submitted ? (
            <div className="reveal revealed" style={{ border: "1px solid rgba(249,115,22,0.3)", borderRadius: "8px", padding: "2rem", background: "rgba(249,115,22,0.05)", textAlign: "center" }}>
              <p className="display text-2xl mb-2" style={{ color: "#f97316" }}>Message sent!</p>
              <p className="mono text-zinc-400 text-sm">Thanks for reaching out. I'll be in touch soon.</p>
            </div>
          ) : (
            <div className="reveal reveal-delay-2 flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="mono text-xs text-zinc-500 mb-2 block">Name</label>
                  <input className="input-field" placeholder="Your name"
                    value={formState.name} onChange={e => setFormState({ ...formState, name: e.target.value })} />
                </div>
                <div>
                  <label className="mono text-xs text-zinc-500 mb-2 block">Email</label>
                  <input className="input-field" placeholder="your@email.com" type="email"
                    value={formState.email} onChange={e => setFormState({ ...formState, email: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="mono text-xs text-zinc-500 mb-2 block">Message</label>
                <textarea className="input-field" rows={5} placeholder="Tell me about your project..."
                  value={formState.message} onChange={e => setFormState({ ...formState, message: e.target.value })}
                  style={{ resize: "vertical" }} />
              </div>
              <div>
                <button className="btn-primary" onClick={handleSubmit}>SEND MESSAGE →</button>
              </div>
            </div>
          )}
        </div>
        <div className="absolute bottom-10 right-10 mono text-zinc-800 text-7xl font-bold select-none hidden lg:block">05</div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 md:px-16 py-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="display text-zinc-600 text-sm">© 2024 Saurabh Sharma</span>
        <div className="flex gap-6">
          {["LinkedIn", "GitHub", "Twitter"].map((s) => (
            <a key={s} href="#" className="mono text-zinc-600 text-xs tracking-widest hover:text-orange-500 transition-colors">{s}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}