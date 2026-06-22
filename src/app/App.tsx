import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  Sun, Zap, Phone, Mail, MapPin, ArrowRight, Menu, X,
  Building2, Leaf, Wrench, CheckCircle, Award, Globe,
  ChevronRight, TrendingUp, Users, Home as HomeIcon,
} from "lucide-react";

type Page = "home" | "about" | "services" | "projects" | "contact";

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function useCountUp(to: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let current = 0;
    const step = to / 80;
    const id = setInterval(() => {
      current += step;
      if (current >= to) { setVal(to); clearInterval(id); }
      else setVal(Math.floor(current));
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [to, active]);
  return val;
}

// ─── SHARED ───────────────────────────────────────────────────────────────────

function Badge({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 bg-[#DCFCE7] text-[#16A34A] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
      <Icon className="w-3 h-3" />
      {children}
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function NavBar({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (p: Page) => { setPage(p); setOpen(false); };
  const links: [string, Page][] = [
    ["Home", "home"], ["About", "about"], ["Services", "services"],
    ["Projects", "projects"], ["Contact", "contact"],
  ];

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-sm border-b border-[#22C55E]/10" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <button onClick={() => go("home")} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-[#22C55E] rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-105 transition-transform">
              <Sun className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-black text-xl text-[#0F172A] tracking-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              SOLAR<span className="text-[#22C55E]">NOVA</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-7">
            {links.map(([label, p]) => (
              <button
                key={p}
                onClick={() => go(p)}
                className={`text-sm font-semibold transition-colors tracking-wide ${page === p ? "text-[#22C55E]" : "text-[#0F172A] hover:text-[#22C55E]"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go("contact")}
              className="hidden md:flex items-center gap-2 bg-[#22C55E] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#16A34A] transition-colors shadow-lg shadow-green-500/20"
            >
              Free Consultation <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setOpen(!open)} className="md:hidden w-9 h-9 flex items-center justify-center">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-border px-6 py-5 flex flex-col gap-4">
          {links.map(([label, p]) => (
            <button key={p} onClick={() => go(p)} className={`text-left font-semibold text-sm ${page === p ? "text-[#22C55E]" : "text-[#0F172A]"}`}>
              {label}
            </button>
          ))}
          <button onClick={() => go("contact")} className="bg-[#22C55E] text-white px-5 py-3 rounded-xl font-bold text-sm text-center mt-1">
            Free Consultation
          </button>
        </div>
      )}
    </nav>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer({ setPage }: { setPage: (p: Page) => void }) {
  const go = (p: Page) => setPage(p);
  const contactItems = [
    { Icon: Phone, main: "+1 (800) SOLAR-NV", sub: "Mon–Fri, 8am–6pm CST" },
    { Icon: Mail, main: "hello@solarnova.com", sub: "Reply within 2 hours" },
    { Icon: MapPin, main: "1240 Solar Blvd, Austin TX", sub: "Visit our showroom" },
  ];

  return (
    <footer className="bg-[#0F172A] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-[#22C55E] rounded-lg flex items-center justify-center">
                <Sun className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-black text-xl tracking-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                SOLAR<span className="text-[#22C55E]">NOVA</span>
              </span>
            </div>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Making clean solar energy accessible for homes and businesses across the country.
            </p>
            <div className="flex gap-2 mt-5">
              {["X", "in", "ig"].map(s => (
                <div key={s} className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#22C55E] transition-colors cursor-pointer text-xs font-bold">
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-4 text-white">Company</h4>
            <div className="space-y-2.5">
              {(["About", "Services", "Projects", "Contact"] as const).map(label => {
                const p = label.toLowerCase() as Page;
                return (
                  <button key={label} onClick={() => go(p)} className="block text-[#94A3B8] hover:text-[#22C55E] text-sm transition-colors">
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-4 text-white">Services</h4>
            <div className="space-y-2.5">
              {["Residential Solar", "Commercial Solar", "Maintenance", "Energy Audit", "Battery Storage"].map(s => (
                <button key={s} onClick={() => go("services")} className="block text-[#94A3B8] hover:text-[#22C55E] text-sm transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-4 text-white">Contact</h4>
            <div className="space-y-4">
              {contactItems.map(({ Icon, main, sub }) => (
                <div key={main} className="flex items-start gap-2.5">
                  <Icon className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-white font-medium">{main}</div>
                    <div className="text-xs text-[#64748B]">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[#64748B] text-sm">
          <div>© 2024 SolarNova. All rights reserved.</div>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
              <button key={l} className="hover:text-[#22C55E] transition-colors">{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── CTA SECTION (shared) ─────────────────────────────────────────────────────

function CTASection({ setPage }: { setPage: (p: Page) => void }) {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-24 relative overflow-hidden bg-[#16A34A]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#15803d_0%,#22c55e_60%,#4ade80_100%)]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            START YOUR SOLAR<br />JOURNEY TODAY
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Join 500+ homeowners and businesses who have already made the switch to clean, affordable solar energy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setPage("contact")}
              className="bg-white text-[#16A34A] px-8 py-4 rounded-xl font-black text-base hover:shadow-2xl transition-all hover:-translate-y-0.5"
            >
              Get a Free Consultation
            </button>
            <button
              onClick={() => setPage("projects")}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white/10 transition-all"
            >
              See Our Work
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── HOME — HERO ──────────────────────────────────────────────────────────────

function HeroSection({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e07_1px,transparent_1px),linear-gradient(to_bottom,#22c55e07_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute top-10 right-0 w-[700px] h-[700px] bg-[#22C55E]/6 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#22C55E]/4 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20 w-full">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge icon={Leaf}>Clean Energy for Everyone</Badge>

          <h1
            className="text-7xl md:text-8xl lg:text-9xl font-black text-[#0F172A] leading-none tracking-tight mb-6"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            POWER<br />
            YOUR<br />
            <span className="text-[#22C55E]">FUTURE</span>
          </h1>

          <p className="text-lg text-[#475569] leading-relaxed max-w-lg mb-8">
            Solar Nova helps homes and businesses switch to sustainable, affordable solar power. Cut your energy bills by up to 70% while protecting the planet.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={() => setPage("services")}
              className="flex items-center gap-2 bg-[#22C55E] text-white px-7 py-4 rounded-xl font-bold text-sm hover:bg-[#16A34A] transition-all hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5"
            >
              Explore Services <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage("projects")}
              className="flex items-center gap-2 border-2 border-[#0F172A] text-[#0F172A] px-7 py-4 rounded-xl font-bold text-sm hover:border-[#22C55E] hover:text-[#22C55E] transition-all"
            >
              View Projects <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-10 pt-8 border-t border-[#E2E8F0]">
            {[["500+", "Projects Done"], ["70%", "Avg. Savings"], ["25yr", "Warranty"]].map(([num, label]) => (
              <div key={label}>
                <div className="text-3xl font-black text-[#0F172A]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{num}</div>
                <div className="text-xs text-[#64748B] font-semibold uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#DCFCE7]" style={{ aspectRatio: "4/5" }}>
            <img
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=1000&fit=crop&auto=format"
              alt="Solar panels installed on a modern residential rooftop"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-5 right-5 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#22C55E] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-[#64748B] font-medium">Real-time energy output</div>
                  <div className="text-sm font-black text-[#0F172A]">4.7 kW generated today</div>
                </div>
                <div className="text-[#22C55E] font-black text-sm">+12% ↑</div>
              </div>
            </div>
          </div>

          <div className="absolute -top-5 -right-5 w-24 h-24 bg-[#22C55E] rounded-2xl opacity-15 rotate-12" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 border-4 border-[#22C55E] rounded-2xl opacity-25" />
          <div className="absolute top-1/2 -right-3 w-6 h-20 bg-[#22C55E] rounded-full opacity-20" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── HOME — TRUST BAR ─────────────────────────────────────────────────────────

function TrustBar() {
  const items = [
    "✦ Certified Installations",
    "✦ 10+ Years Experience",
    "✦ 500+ Projects Completed",
    "✦ Energy Savings Up to 70%",
    "✦ 25-Year Panel Warranty",
    "✦ Carbon-Neutral Operations",
    "✦ Licensed & Fully Insured",
    "✦ 24/7 System Monitoring",
  ];

  return (
    <div className="bg-[#0F172A] py-4 overflow-hidden">
      <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      <div className="flex whitespace-nowrap" style={{ animation: "ticker 28s linear infinite" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-xs font-bold text-[#22C55E] tracking-widest uppercase mx-10 flex-shrink-0">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── HOME — ABOUT SOLAR ───────────────────────────────────────────────────────

function AboutSolarSection() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="relative rounded-3xl overflow-hidden bg-[#DCFCE7]" style={{ aspectRatio: "4/3" }}>
            <img
              src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=700&h=525&fit=crop&auto=format"
              alt="Large solar panel array generating clean renewable energy"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-5 left-5 bg-white rounded-2xl p-4 shadow-xl">
              <div className="text-3xl font-black text-[#22C55E]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>2.1M</div>
              <div className="text-xs text-[#64748B] font-medium">kWh generated this year</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <Badge icon={Globe}>Why Solar Energy</Badge>
          <h2 className="text-5xl lg:text-6xl font-black text-[#0F172A] mb-5 leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            THE CLEAN ENERGY<br />REVOLUTION IS HERE
          </h2>
          <p className="text-[#475569] text-base leading-relaxed mb-7">
            Solar energy harnesses sunlight — the most abundant resource on Earth — and converts it to clean electricity.
            Every installation reduces fossil fuel dependence and cuts carbon emissions at the source.
          </p>
          <div className="space-y-4">
            {[
              ["Zero Emissions", "Solar power produces no CO₂ during operation, directly fighting climate change."],
              ["Dramatic Cost Savings", "Most homeowners see energy bills drop 50–70% within the first year of installation."],
              ["Energy Independence", "Generate your own power and insulate yourself from grid price volatility."],
            ].map(([title, desc]) => (
              <div key={title} className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#0F172A] text-sm">{title}</div>
                  <div className="text-[#64748B] text-sm">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── HOME — SERVICES PREVIEW ──────────────────────────────────────────────────

const SERVICE_CARDS = [
  { icon: HomeIcon, title: "Residential Solar", desc: "Custom rooftop systems designed for your home's energy needs and aesthetic." },
  { icon: Building2, title: "Commercial Solar", desc: "Scalable solutions for offices, retail spaces, and multi-tenant buildings." },
  { icon: Wrench, title: "Maintenance & Monitoring", desc: "24/7 smart monitoring and preventive maintenance to maximize performance." },
  { icon: Zap, title: "Energy Consultation", desc: "Expert analysis of your usage with a tailored solar adoption roadmap." },
];

function ServicesPreviewSection({ setPage }: { setPage: (p: Page) => void }) {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge icon={Zap}>What We Offer</Badge>
          <h2 className="text-5xl lg:text-6xl font-black text-[#0F172A]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            SOLAR SOLUTIONS<br />FOR EVERY NEED
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICE_CARDS.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setPage("services")}
              className="bg-white rounded-2xl p-6 border border-border hover:border-[#22C55E]/40 hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-[#DCFCE7] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#22C55E] transition-colors duration-300">
                <Icon className="w-6 h-6 text-[#22C55E] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-black text-[#0F172A] text-lg mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{title}</h3>
              <p className="text-[#64748B] text-sm leading-relaxed">{desc}</p>
              <div className="mt-4 flex items-center gap-1 text-[#22C55E] text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button
            onClick={() => setPage("services")}
            className="inline-flex items-center gap-2 border-2 border-[#22C55E] text-[#22C55E] px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#22C55E] hover:text-white transition-all"
          >
            View All Services <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── HOME — PROJECTS PREVIEW ──────────────────────────────────────────────────

const FEATURED = [
  {
    title: "Thornton Family Residence",
    location: "Austin, TX",
    type: "Residential",
    output: "8.4 kW",
    savings: "$2,100/yr",
    img: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&h=400&fit=crop&auto=format",
    alt: "Residential home with rooftop solar panels in Austin Texas",
  },
  {
    title: "Meridian Corporate Center",
    location: "Phoenix, AZ",
    type: "Commercial",
    output: "240 kW",
    savings: "$58,000/yr",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop&auto=format",
    alt: "Modern corporate building with commercial solar installation",
  },
  {
    title: "Solano Industrial Park",
    location: "San Diego, CA",
    type: "Industrial",
    output: "1.2 MW",
    savings: "$310,000/yr",
    img: "https://images.unsplash.com/photo-1466611653911-0265b2aa33a3?w=600&h=400&fit=crop&auto=format",
    alt: "Large industrial solar farm installation",
  },
];

function ProjectsPreviewSection({ setPage }: { setPage: (p: Page) => void }) {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <Badge icon={Award}>Featured Projects</Badge>
            <h2 className="text-5xl lg:text-6xl font-black text-[#0F172A]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              REAL RESULTS,<br />REAL SAVINGS
            </h2>
          </div>
          <button onClick={() => setPage("projects")} className="inline-flex items-center gap-2 text-[#22C55E] font-bold text-sm hover:gap-3 transition-all">
            All Projects <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURED.map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              onClick={() => setPage("projects")}
              className="group rounded-2xl overflow-hidden border border-border hover:border-[#22C55E]/30 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 bg-white cursor-pointer"
            >
              <div className="relative overflow-hidden bg-[#DCFCE7]" style={{ aspectRatio: "3/2" }}>
                <img src={proj.img} alt={proj.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-3 left-3 bg-[#22C55E] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {proj.type}
                </span>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-5">
                  {[["Output", proj.output], ["Savings", proj.savings]].map(([l, v]) => (
                    <div key={l} className="text-white">
                      <div className="text-xs opacity-70">{l}</div>
                      <div className="font-black text-sm">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-black text-[#0F172A] text-base mb-1">{proj.title}</h3>
                <div className="flex items-center gap-1 text-[#64748B] text-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#22C55E]" /> {proj.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HOME — IMPACT STATS ──────────────────────────────────────────────────────

function ImpactStatsSection() {
  const { ref, inView } = useInView();
  const co2 = useCountUp(12400, inView);
  const kwh = useCountUp(2100000, inView);
  const trees = useCountUp(46000, inView);
  const homes = useCountUp(500, inView);

  const stats = [
    { label: "Tons of CO₂ Reduced", value: co2.toLocaleString(), suffix: "t" },
    { label: "kWh Energy Generated", value: kwh.toLocaleString(), suffix: "" },
    { label: "Trees Equivalent Saved", value: trees.toLocaleString(), suffix: "" },
    { label: "Installations Completed", value: homes.toLocaleString(), suffix: "+" },
  ];

  return (
    <section ref={ref} className="py-24 bg-[#0F172A] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e0d_1px,transparent_1px),linear-gradient(to_bottom,#22c55e0d_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#22C55E]/8 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#22C55E]/20 text-[#22C55E] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            <TrendingUp className="w-3 h-3" /> Our Collective Impact
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            NUMBERS THAT MATTER
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map(({ label, value, suffix }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl lg:text-6xl font-black text-[#22C55E] mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {value}{suffix}
              </div>
              <div className="text-[#94A3B8] text-sm font-medium">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <>
      <HeroSection setPage={setPage} />
      <TrustBar />
      <AboutSolarSection />
      <ServicesPreviewSection setPage={setPage} />
      <ProjectsPreviewSection setPage={setPage} />
      <ImpactStatsSection />
      <CTASection setPage={setPage} />
    </>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────

function AboutPage({ setPage }: { setPage: (p: Page) => void }) {
  const { ref: r1, inView: v1 } = useInView();
  const { ref: r2, inView: v2 } = useInView();

  return (
    <>
      <section className="pt-32 pb-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e06_1px,transparent_1px),linear-gradient(to_bottom,#22c55e06_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge icon={Users}>Our Story</Badge>
            <h1 className="text-6xl md:text-8xl font-black text-[#0F172A] mb-6 leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              REDEFINING ENERGY<br />FOR A CLEANER PLANET
            </h1>
            <p className="text-xl text-[#475569] leading-relaxed">
              Founded in 2014, Solar Nova has been at the forefront of the clean energy revolution — helping families and businesses break free from fossil fuels and embrace a sustainable future.
            </p>
          </div>
        </div>
      </section>

      <section ref={r1} className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Sun,
                label: "Mission",
                title: "Accelerate Solar Adoption",
                body: "We make solar energy accessible, affordable, and frictionless for every household and business. Our goal is to install 10,000 systems by 2027, eliminating 100,000 tons of CO₂ annually.",
              },
              {
                icon: Globe,
                label: "Vision",
                title: "A World Powered by the Sun",
                body: "We envision a future where every building generates its own clean energy — where the grid is a backup, not a dependency. Solar Nova will lead that transition.",
              },
            ].map(({ icon: Icon, label, title, body }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={v1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white rounded-2xl p-8 border border-border"
              >
                <div className="w-12 h-12 bg-[#DCFCE7] rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#22C55E]" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#22C55E] mb-2">{label}</div>
                <h3 className="text-2xl font-black text-[#0F172A] mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-3xl overflow-hidden bg-[#DCFCE7]" style={{ aspectRatio: "4/3" }}>
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=700&h=525&fit=crop&auto=format"
              alt="Solar Nova team in a strategy meeting"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <Badge icon={Users}>Our Team</Badge>
            <h2 className="text-4xl font-black text-[#0F172A] mb-5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              ENGINEERS WHO CARE<br />ABOUT THE PLANET
            </h2>
            <p className="text-[#475569] text-base leading-relaxed mb-6">
              Our 80-person team includes certified solar engineers, energy consultants, installation crews, and customer success specialists. Every person shares one obsession: making your solar project a success.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[["80+", "Team Members"], ["12", "States Served"], ["98%", "Satisfaction Rate"]].map(([num, label]) => (
                <div key={label} className="bg-[#F0FDF4] rounded-xl p-4 text-center">
                  <div className="text-2xl font-black text-[#22C55E]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{num}</div>
                  <div className="text-xs text-[#64748B] font-medium mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={r2} className="py-16 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-black text-[#0F172A] mb-12 text-center" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            OUR JOURNEY
          </h2>
          <div className="relative">
            <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-[#DCFCE7]" />
            <div className="space-y-8">
              {[
                { year: "2014", title: "Solar Nova Founded", desc: "Started with a team of 4 engineers and a mission to democratize solar energy in Austin, TX." },
                { year: "2016", title: "100th Installation", desc: "Reached our first major milestone — 100 residential rooftop systems generating clean energy across Texas." },
                { year: "2019", title: "Commercial Expansion", desc: "Launched our commercial division and completed our first 1 MW corporate solar array for Meridian Corp." },
                { year: "2021", title: "National Reach", desc: "Expanded operations to 12 states, serving clients across the Sun Belt and Pacific Coast." },
                { year: "2024", title: "500+ Projects Milestone", desc: "Completed over 500 installations, offsetting 12,400 tons of CO₂ and generating 2.1M kWh annually." },
              ].map(({ year, title, desc }, i) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={v2 ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="w-12 h-12 bg-[#22C55E] rounded-full flex items-center justify-center text-white font-black text-xs flex-shrink-0 z-10 relative shadow-lg shadow-green-500/30" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {year.slice(2)}
                  </div>
                  <div className="pt-2 pb-6">
                    <div className="text-xs font-bold text-[#22C55E] mb-0.5">{year}</div>
                    <h3 className="font-black text-[#0F172A] text-lg mb-1">{title}</h3>
                    <p className="text-[#64748B] text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection setPage={setPage} />
    </>
  );
}

// ─── SERVICES PAGE ────────────────────────────────────────────────────────────

const FULL_SERVICES = [
  {
    icon: HomeIcon,
    title: "Residential Solar Systems",
    tagline: "Power your home with the sun",
    desc: "We design, install, and commission custom rooftop solar systems for homes of all sizes. Our certified engineers handle everything from site assessment and structural analysis to final grid connection and net metering registration.",
    benefits: ["Reduce electricity bills by 50–70%", "25-year panel performance warranty", "Real-time monitoring app included", "Zero-down financing available"],
    price: "From $8,500",
    img: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=640&h=420&fit=crop&auto=format",
    alt: "Residential home rooftop with professionally installed solar panels",
  },
  {
    icon: Building2,
    title: "Commercial Solar Solutions",
    tagline: "Scale your savings, amplify your impact",
    desc: "Large-scale commercial installations engineered for offices, warehouses, retail spaces, and campuses. We handle permitting, utility interconnection, and project financing — you focus on running your business.",
    benefits: ["Systems from 50 kW to 5 MW capacity", "MACRS accelerated depreciation benefits", "Priority 2-hour maintenance SLA", "Custom PPA and lease options"],
    price: "From $45,000",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=640&h=420&fit=crop&auto=format",
    alt: "Modern commercial building with large-scale solar installation",
  },
  {
    icon: Wrench,
    title: "Maintenance & Monitoring",
    tagline: "Keep your system at peak performance",
    desc: "Our 24/7 smart monitoring platform tracks every panel in real time. Annual inspections, professional cleaning, and predictive maintenance keep your system producing at maximum efficiency year after year.",
    benefits: ["Real-time performance dashboard", "Annual physical inspection visit", "Professional panel cleaning included", "Guaranteed 2-hour response time"],
    price: "From $299/yr",
    img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=640&h=420&fit=crop&auto=format",
    alt: "Technician performing solar panel maintenance inspection",
  },
  {
    icon: Zap,
    title: "Energy Consultation",
    tagline: "Know before you commit",
    desc: "Our energy advisors analyze your consumption patterns, property orientation, and financial goals to design the perfect solar strategy. Get a detailed ROI projection, incentive breakdown, and system design recommendation — completely free.",
    benefits: ["Detailed energy usage analysis", "10-year ROI projections & payback period", "Federal & state incentive identification", "Technology and installer recommendations"],
    price: "Free",
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=640&h=420&fit=crop&auto=format",
    alt: "Energy consultant meeting with homeowner to review solar options",
  },
];

function ServicesPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <>
      <section className="pt-32 pb-14 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e06_1px,transparent_1px),linear-gradient(to_bottom,#22c55e06_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <Badge icon={Zap}>What We Offer</Badge>
          <h1 className="text-6xl md:text-7xl font-black text-[#0F172A] mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            OUR SERVICES
          </h1>
          <p className="text-xl text-[#475569] max-w-2xl mx-auto">
            End-to-end solar solutions for residential and commercial clients — from first consultation to lifelong monitoring.
          </p>
        </div>
      </section>

      <section className="pb-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-7">
          {FULL_SERVICES.map(({ icon: Icon, title, tagline, desc, benefits, price, img, alt }, i) => (
            <div
              key={title}
              className={`bg-white rounded-3xl overflow-hidden border border-border shadow-sm flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
            >
              <div className="lg:w-2/5 flex-shrink-0 bg-[#DCFCE7] min-h-64">
                <img src={img} alt={alt} className="w-full h-full object-cover" style={{ minHeight: "260px" }} />
              </div>
              <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center">
                <div className="w-12 h-12 bg-[#DCFCE7] rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#22C55E]" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#22C55E] mb-1">{tagline}</div>
                <h2 className="text-3xl font-black text-[#0F172A] mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{title}</h2>
                <p className="text-[#475569] text-sm leading-relaxed mb-5">{desc}</p>
                <ul className="space-y-2 mb-7">
                  {benefits.map(b => (
                    <li key={b} className="flex items-center gap-2 text-sm text-[#0F172A]">
                      <CheckCircle className="w-4 h-4 text-[#22C55E] flex-shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="text-xs text-[#64748B] font-medium">Starting at</div>
                    <div className="text-3xl font-black text-[#0F172A]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{price}</div>
                  </div>
                  <button
                    onClick={() => setPage("contact")}
                    className="flex items-center gap-2 bg-[#22C55E] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#16A34A] transition-colors"
                  >
                    Get a Quote <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection setPage={setPage} />
    </>
  );
}

// ─── PROJECTS PAGE ────────────────────────────────────────────────────────────

const ALL_PROJECTS = [
  {
    title: "Thornton Family Residence",
    location: "Austin, TX",
    type: "Residential",
    output: "8.4 kW",
    savings: "$2,100/yr",
    panels: 24,
    img: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&h=400&fit=crop&auto=format",
    alt: "Residential solar installation in Austin TX",
  },
  {
    title: "Meridian Corporate Center",
    location: "Phoenix, AZ",
    type: "Commercial",
    output: "240 kW",
    savings: "$58,000/yr",
    panels: 680,
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop&auto=format",
    alt: "Commercial solar installation in Phoenix AZ",
  },
  {
    title: "Solano Industrial Park",
    location: "San Diego, CA",
    type: "Industrial",
    output: "1.2 MW",
    savings: "$310,000/yr",
    panels: 3200,
    img: "https://images.unsplash.com/photo-1466611653911-0265b2aa33a3?w=600&h=400&fit=crop&auto=format",
    alt: "Industrial solar farm in San Diego CA",
  },
  {
    title: "Garcia Vineyard Estate",
    location: "Napa, CA",
    type: "Residential",
    output: "15 kW",
    savings: "$3,800/yr",
    panels: 42,
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop&auto=format",
    alt: "Estate solar installation in Napa CA",
  },
  {
    title: "Lakewood Shopping Center",
    location: "Denver, CO",
    type: "Commercial",
    output: "180 kW",
    savings: "$44,000/yr",
    panels: 510,
    img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&h=400&fit=crop&auto=format",
    alt: "Commercial shopping center solar installation in Denver CO",
  },
  {
    title: "Sunrise Manufacturing Plant",
    location: "Houston, TX",
    type: "Industrial",
    output: "800 kW",
    savings: "$195,000/yr",
    panels: 2200,
    img: "https://images.unsplash.com/photo-1466611653911-0265b2aa33a3?w=600&h=400&fit=crop&auto=format&sat=-30",
    alt: "Industrial manufacturing plant solar array in Houston TX",
  },
];

type FilterType = "All" | "Residential" | "Commercial" | "Industrial";

function ProjectsPage({ setPage }: { setPage: (p: Page) => void }) {
  const [filter, setFilter] = useState<FilterType>("All");
  const filters: FilterType[] = ["All", "Residential", "Commercial", "Industrial"];
  const filtered = filter === "All" ? ALL_PROJECTS : ALL_PROJECTS.filter(p => p.type === filter);

  return (
    <>
      <section className="pt-32 pb-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e06_1px,transparent_1px),linear-gradient(to_bottom,#22c55e06_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <Badge icon={Award}>Portfolio</Badge>
          <h1 className="text-6xl md:text-7xl font-black text-[#0F172A] mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            OUR PROJECTS
          </h1>
          <p className="text-xl text-[#475569] max-w-2xl mx-auto mb-8">
            Real installations. Real results. Explore our portfolio of completed solar projects across the country.
          </p>
          <div className="inline-flex bg-[#F1F5F9] p-1 rounded-xl gap-1">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === f ? "bg-[#22C55E] text-white shadow-md" : "text-[#64748B] hover:text-[#0F172A]"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 bg-[#F8FAFC] pt-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(proj => (
              <div
                key={proj.title}
                className="group bg-white rounded-2xl overflow-hidden border border-border hover:border-[#22C55E]/40 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300"
              >
                <div className="relative overflow-hidden bg-[#DCFCE7]" style={{ aspectRatio: "3/2" }}>
                  <img src={proj.img} alt={proj.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/75 via-[#0F172A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-3 left-3 bg-[#22C55E] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {proj.type}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-5">
                      {[["Output", proj.output], ["Annual Savings", proj.savings], ["Panels", String(proj.panels)]].map(([l, v]) => (
                        <div key={l} className="text-white">
                          <div className="text-xs opacity-70">{l}</div>
                          <div className="font-black text-sm">{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-black text-[#0F172A] text-base mb-1">{proj.title}</h3>
                  <div className="flex items-center gap-1 text-[#64748B] text-sm">
                    <MapPin className="w-3.5 h-3.5 text-[#22C55E]" /> {proj.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection setPage={setPage} />
    </>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", type: "Residential", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = "w-full border border-border rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#22C55E]/30 focus:border-[#22C55E] bg-white transition-all";

  const contactCards = [
    { icon: Phone, title: "Call Us", main: "+1 (800) SOLAR-NV", sub: "Mon–Fri, 8am–6pm CST" },
    { icon: Mail, title: "Email Us", main: "hello@solarnova.com", sub: "We reply within 2 business hours" },
    { icon: MapPin, title: "Visit Us", main: "1240 Solar Blvd, Suite 400", sub: "Austin, TX 78701" },
  ];

  return (
    <>
      <section className="pt-32 pb-10 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e06_1px,transparent_1px),linear-gradient(to_bottom,#22c55e06_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <Badge icon={Phone}>Get In Touch</Badge>
          <h1 className="text-6xl md:text-7xl font-black text-[#0F172A] mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            START YOUR<br />SOLAR JOURNEY
          </h1>
          <p className="text-xl text-[#475569] max-w-xl mx-auto">
            Get a free consultation and custom quote within 24 hours. No pressure, no commitment.
          </p>
        </div>
      </section>

      <section className="py-12 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3 bg-white rounded-3xl border border-border p-8 shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 bg-[#DCFCE7] rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-[#22C55E]" />
                  </div>
                  <h2 className="text-3xl font-black text-[#0F172A] mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Message Received!
                  </h2>
                  <p className="text-[#64748B] text-sm max-w-sm">
                    We will review your project details and get back to you within 24 hours with a custom solar quote tailored to your needs.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-2xl font-black text-[#0F172A] mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    GET YOUR FREE SOLAR ESTIMATE
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-[#0F172A] mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Jane Smith"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#0F172A] mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="jane@example.com"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#0F172A] mb-1.5">Project Type</label>
                    <select
                      value={form.type}
                      onChange={e => setForm({ ...form, type: e.target.value })}
                      className={inputClass}
                    >
                      {["Residential", "Commercial", "Industrial", "Energy Consultation"].map(t => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#0F172A] mb-1.5">Tell us about your project</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe your property, current energy usage, and any specific goals..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#22C55E] text-white py-4 rounded-xl font-bold text-base hover:bg-[#16A34A] transition-all hover:shadow-xl hover:shadow-green-500/20"
                  >
                    Get My Free Solar Estimate →
                  </button>
                  <p className="text-xs text-[#94A3B8] text-center">
                    We respect your privacy. Your information will never be shared with third parties.
                  </p>
                </form>
              )}
            </div>

            <div className="lg:col-span-2 space-y-4">
              {contactCards.map(({ icon: Icon, title, main, sub }) => (
                <div key={title} className="bg-white rounded-2xl border border-border p-6 flex gap-4">
                  <div className="w-11 h-11 bg-[#DCFCE7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#22C55E]" />
                  </div>
                  <div>
                    <div className="font-black text-[#0F172A] text-sm mb-0.5">{title}</div>
                    <div className="text-[#0F172A] text-sm font-medium">{main}</div>
                    <div className="text-[#94A3B8] text-xs">{sub}</div>
                  </div>
                </div>
              ))}

              <div className="relative bg-[#DCFCE7] rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <img
                  src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&h=280&fit=crop&auto=format"
                  alt="SolarNova headquarters building"
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
                      <MapPin className="w-4 h-4 text-[#22C55E]" />
                      SolarNova HQ — Austin, TX
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0F172A] rounded-2xl p-6">
                <h4 className="font-black text-white text-lg mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  WHAT HAPPENS NEXT?
                </h4>
                <div className="space-y-3">
                  {[
                    ["01", "We review your request within 2 hours"],
                    ["02", "A solar advisor calls to discuss your goals"],
                    ["03", "We send a custom system design & quote"],
                    ["04", "You decide — zero pressure, zero commitment"],
                  ].map(([num, text]) => (
                    <div key={num} className="flex items-start gap-3">
                      <span className="text-[#22C55E] font-black text-sm flex-shrink-0" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{num}</span>
                      <span className="text-[#94A3B8] text-sm">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");

  const go = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <NavBar page={page} setPage={go} />
      <main>
        {page === "home" && <HomePage setPage={go} />}
        {page === "about" && <AboutPage setPage={go} />}
        {page === "services" && <ServicesPage setPage={go} />}
        {page === "projects" && <ProjectsPage setPage={go} />}
        {page === "contact" && <ContactPage />}
      </main>
      <Footer setPage={go} />
    </div>
  );
}
