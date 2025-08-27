import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
const cx = (...classes) => classes.filter(Boolean).join(" ");

const shimmer = {
  backgroundImage:
    "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.25) 50%, rgba(255,255,255,0) 100%)",
};
const CODING_PUNS = [
  "I like my code like my coffee: strong()",
  "throw new Error('Hire me!')",
  "Commit early, push often ☕",
  "Array.from(ideas) → product",
  "Ship happens 🚀",
  "404: Bug not found (yet)",
  "let passion = true;",
  "while(alive){ build(); }",
  "<div>loper</div>",
  "sudo make awesome",
];

const PROFILE = {
  name: "Shivank",
  headline: "Software Developer · Support Engineer · AI/ML Enthusiast",
  about:
    "I did my B.Tech from SRM, Chennai and I’m really into data-driven problem solving, ML, and designing clean, simple UIs. I’m comfortable working with Python, JavaScript, and the usual frontend stuff. I enjoy collaborating with people, learning along the way, and tackling challenging problems that push me to grow.",
  email: "officialshivaank001@gmail.com",
  location: "Bengaluru, India",
  experience: [
    {
      company: "Capillary Technologies",
      location: "Bengaluru, Karnataka",
      role: "Product Support Engineer",
      duration: "June 2024 – August 2025",
      bullets: [
        "Resolved over 200 client-reported technical issues by analyzing application logs and debugging Java/Node.js code, reducing average ticket resolution time by 15%.",

        "Engineered and deployed 50+ hotfixes for critical bugs in production environments, collaborating with a team of 10 developers to ensure 99.9% application uptime.",

        "Documented technical specifications and troubleshooting guides for 7 core product modules, improving knowledge transfer efficiency for new team members by 25%.",
      ],
    },
  ],
  quick: [
    { k: "Python", v: "Intermediate" },
    { k: "Javascript", v: "Experienced" },
    { k: "React", v: "Intermediate" },
    { k: "Machine Learning", v: "Intermediate" },
    { k: "Jira", v: "Experienced" },
    { k: "Kafka", v: "Basic" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/iamshivank" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shivank-5374b21b7/" },
    { label: "X", href: "https://twitter.com/theshivaank" },
  ],
  highlightProjects: [
    {
      title: "Pixie: A smart Jira assistant",
      summary:
        "Developed a Python-based Slack bot integrated with Jira REST API to automate issue management and tracking directly from Slack.",
      link: "https://github.com/iamshivank/Slack-Bot-for-Jira",
      tag: "AI/ML",
    },
    {
      title: "E-commerce Store",
      summary: "Developed a full-stack e-commerce dashboard with React, Tailwind, and REST API featuring reusable components.",
      link: "https://github.com/iamshivank/comfy-store",
      tag: "FSD",
    },
    {
      title: "Pneumonia Detection (CNN)",
      summary: "Binary image‑classification CNN trained on chest X‑rays.",
      link: "https://github.com/iamshivank",
      tag: "DL",
    },
  ],
};

// ------------------------- Components -------------------------
function GlassCard({ className = "", children }) {
  return (
    <div
      className={cx(
        "relative rounded-3xl p-6 md:p-8",
        "bg-white/10 backdrop-blur-xl border border-white/15",
        "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.35)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function SectionTitle({ overline, title, kicker }) {
  return (
    <div className="mb-6">
      {overline && (
        <div className="uppercase tracking-[0.25em] text-xs text-white/60 mb-2">{overline}</div>
      )}
      <h2 className="text-2xl md:text-4xl font-bold leading-tight">
        {title}
        {kicker && <span className="text-white/60"> {kicker}</span>}
      </h2>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/20 px-3 py-1 text-xs md:text-sm">
      {children}
    </span>
  );
}

function Dot({ className = "" }) {
  return <span className={cx("mx-1 inline-block h-1.5 w-1.5 rounded-full bg-white/40", className)} />;
}

// Floaty sparkles near cursor
function CursorSparkle() {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const onMove = (e) => {
      const { clientX, clientY } = e.touches?.[0] ?? e;
      x.set(clientX);
      y.set(clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
    };
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ left: sx, top: sy }}
      className="pointer-events-none fixed z-[60] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[2px]"
    />
  );
}

// Movable pun orbs — draggable chips that bounce around
function PunOrbs() {
  const [puns] = useState(CODING_PUNS);
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {puns.map((pun, i) => (
        <motion.div
          key={pun}
          drag
          dragConstraints={containerRef}
          dragElastic={0.8}
          dragMomentum
          initial={{ x: Math.random() * 300 - 150, y: Math.random() * 200 - 100, scale: 0.8, rotate: 0 }}
          animate={{
            y: [null, (Math.random() * 2 - 1) * 20],
            transition: { repeat: Infinity, repeatType: "mirror", duration: 4 + Math.random() * 4 },
          }}
          whileTap={{ scale: 1.05 }}
          className={cx(
            "pointer-events-auto select-none",
            "absolute left-1/2 top-1/3",
            "rounded-full border border-white/20 bg-white/5 backdrop-blur-md",
            "px-4 py-2 text-xs md:text-sm shadow-lg hover:bg-white/10"
          )}
          style={{
            x: (Math.random() * window.innerWidth) / 6,
            y: (Math.random() * window.innerHeight) / 6,
          }}
        >
          <span className="whitespace-nowrap">{pun}</span>
        </motion.div>
      ))}
    </div>
  );
}

// Individual draggable repo node that handles both drag and click interactions
function RepoNode({ repo, initialX, initialY, dragConstraints }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);

  const handleDragStart = (event, info) => {
    setIsDragging(true);
    setDragDistance(0);
  };

  const handleDrag = (event, info) => {
    // Calculate total drag distance
    const distance = Math.sqrt(info.offset.x * info.offset.x + info.offset.y * info.offset.y);
    setDragDistance(distance);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleClick = (e) => {
    // Prevent navigation if user was dragging (more than 5px threshold)
    if (dragDistance > 5) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Otherwise, allow normal link behavior
  };

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      drag
      dragConstraints={dragConstraints}
      dragElastic={0.6}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      className={cx(
        "group absolute -translate-x-1/2 -translate-y-1/2 cursor-grab select-none",
        "rounded-2xl border border-white/20 bg-white/5 px-3 py-2",
        "hover:bg-white/10 hover:shadow-lg transition-all duration-200",
        isDragging && "cursor-grabbing shadow-2xl z-10"
      )}
      style={{ left: initialX, top: initialY }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      whileDrag={{
        scale: 1.1,
        rotate: 5,
        boxShadow: "0 10px 30px -5px rgba(0,0,0,0.5)"
      }}
    >
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold">{repo.name}</span>
        <Dot />
        <span className="text-[10px] text-white/60">★ {repo.stargazers_count}</span>
      </div>
      {repo.description && (
        <div className="mt-1 max-w-[220px] text-[11px] text-white/70 line-clamp-2">
          {repo.description}
        </div>
      )}

      {/* Subtle drag indicator */}
      <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-60 transition-opacity">
        <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
      </div>
    </motion.a>
  );
}

// Fetch GitHub repos and lay them out in a gentle orbit/constellation
function useGithubRepos(username, count = 9) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const resp = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
        if (!resp.ok) throw new Error(`GitHub: ${resp.status}`);
        const data = await resp.json();
        if (!alive) return;
        const filtered = data
          .filter((r) => !r.fork)
          .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
          .slice(0, count);
        setRepos(filtered);
      } catch (e) {
        setError(e.message);
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => {
      alive = false;
    };
  }, [username, count]);

  return { repos, loading, error };
}

function RepoConstellation({ username = "iamshivank" }) {
  const { repos, loading, error } = useGithubRepos(username, 12);
  const radius = 180;
  const containerRef = useRef(null);

  return (
    <GlassCard className="relative overflow-hidden">
      <SectionTitle overline="Projects" title="Repo Constellation" kicker="· latest from GitHub" />
      <p className="mb-6 text-white/70 text-sm md:text-base">
        A playful, non‑traditional layout. Repos orbit softly; drag to inspect. Click to open.
      </p>

      <div ref={containerRef} className="relative mx-auto h-[420px] w-full max-w-3xl">
        <div className="absolute inset-0">
          {/* Orbit rings */}
          <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
        </div>

        <AnimatePresence>
          {loading && (
            <motion.div
              className="absolute inset-0 grid place-items-center text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Loading latest repos…
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="text-sm text-red-300">Couldn't load GitHub repos: {error}</div>
        )}

        {/* Nodes */}
        <div className="absolute left-1/2 top-1/2">
          {repos.map((r, i) => {
            const angle = (i / repos.length) * Math.PI * 2;
            const ring = i % 3; // distribute across rings
            const dist = 120 + ring * 50;
            const x = Math.cos(angle) * dist;
            const y = Math.sin(angle) * dist;

            return (
              <RepoNode
                key={r.id}
                repo={r}
                initialX={x}
                initialY={y}
                dragConstraints={containerRef}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2 text-white/70 text-xs">
        <Badge>Non‑traditional</Badge>
        <Badge>Draggable</Badge>
        <Badge>Auto‑updates from GitHub</Badge>
      </div>
    </GlassCard>
  );
}

function Hero() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0e0f1a] via-[#13162b] to-[#1a1e34] p-6 md:p-10">
      <div className="absolute inset-0 opacity-[0.08] [background:radial-gradient(600px_200px_at_10%_-10%,_#fff,_transparent_60%),radial-gradient(800px_300px_at_110%_10%,_#fff,_transparent_50%)]" />

      <div className="relative grid items-center gap-8 md:grid-cols-2">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Available for opportunities
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {PROFILE.name}
          </h1>
          <p className="mt-2 text-white/70">{PROFILE.headline}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {PROFILE.socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                target="_blank"
                rel="noreferrer"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="relative min-h-[240px]">
          {/* Big decorative orb */}
          <motion.div
            className="absolute right-4 top-4 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-400/30 to-sky-500/30 blur-2xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          <GlassCard className="relative z-10">
            <SectionTitle overline="About" title="Hello, I’m Shivank" />
            <p className="text-white/80 text-sm md:text-base">{PROFILE.about}</p>

            <div className="mt-4 flex flex-wrap gap-2 text-white/80 text-xs">
              {PROFILE.quick.map((q) => (
                <Badge key={q.k}>
                  {q.k}: <span className="ml-1 text-white/70">{q.v}</span>
                </Badge>
              ))}
            </div>

            <div className="mt-4 text-sm text-white/70">
              <span className="font-medium">Contact:</span> {PROFILE.email}
            </div>
          </GlassCard>
        </div>
      </div>

      <PunOrbs />
    </div>
  );
}

function Timeline() {
  return (
    <GlassCard>
      <SectionTitle overline="My Journey" title="Experience" />
      <div className="relative pl-6">
        <div className="absolute left-3 top-0 bottom-0 w-px bg-white/15" />
        <ul className="space-y-6">
          {PROFILE.experience.map((e, idx) => (
            <li key={idx} className="relative">
              <span className="absolute -left-[16px] top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <div className="font-semibold">{e.role} · {e.company}</div>
              <div className="text-sm text-white/70">{e.location} · {e.duration}</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-white/80">
                {e.bullets.map((b, i) => (
                  <li key={i} className="mb-4">{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </GlassCard>
  );
}

function HighlightProjects() {
  return (
    <GlassCard>
      <SectionTitle overline="Spotlight" title="Selected Projects" />
      <div className="grid gap-4 md:grid-cols-3">
        {PROFILE.highlightProjects.map((p) => (
          <motion.a
            key={p.title}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-4 hover:bg-white/10"
            whileHover={{ y: -4 }}
          >
            <div className="mb-2 flex items-center gap-2 text-xs text-white/70">
              <Badge>{p.tag}</Badge>
              <Dot />
              <span className="opacity-80">GitHub</span>
            </div>
            <div className="text-lg font-semibold">{p.title}</div>
            <div className="mt-1 text-sm text-white/80">{p.summary}</div>
            <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400/20 to-sky-500/20 blur-2xl transition-all group-hover:scale-125" />
          </motion.a>
        ))}
      </div>
    </GlassCard>
  );
}

function Footer() {
  return (
    <div className="mt-10 flex flex-col items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-white/70">
      <div className="text-sm">© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</div>
      {/* <div className="text-xs">Built with React, Tailwind & Framer Motion.</div> */}
    </div>
  );
}

export default function ShivankPortfolio() {
  return (
    <main className="min-h-screen bg-[#090a12] text-white">
      <CursorSparkle />

      {/* Page max width */}
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-400" />
            <span className="font-semibold tracking-wide">Shivank • Portfolio</span>
          </div>
          <nav className="hidden gap-4 md:flex">
            <a className="rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/10" href="#about">About</a>
            <a className="rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/10" href="#projects">Projects</a>
            <a className="rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/10" href="#contact">Contact</a>
          </nav>
        </header>

        {/* Hero / About */}
        <section id="about" className="space-y-8">
          <Hero />
          <div className="grid gap-6 md:grid-cols-2">
            <Timeline />
            <HighlightProjects />
          </div>
        </section>

        {/* Projects as Constellation */}
        <section id="projects" className="mt-10">
          <RepoConstellation username="iamshivank" />
        </section>

        {/* Contact */}
        <section id="contact" className="mt-10">
          <GlassCard>
            <SectionTitle overline="Contact" title="Let’s build something cool" />
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
              <Badge>Email</Badge>
              <a className="rounded-full border border-white/20 bg-white/5 px-3 py-1 hover:bg-white/10" href={`mailto:${PROFILE.email}`}>
                {PROFILE.email}
              </a>
              <Dot />
              <Badge>Location</Badge>
              <span>{PROFILE.location}</span>
              <Dot />
              {PROFILE.socials.map((s) => (
                <a key={s.href} className="rounded-full border border-white/20 bg-white/5 px-3 py-1 hover:bg-white/10" href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          </GlassCard>
        </section>

        <Footer />
      </div>
    </main>
  );
}
