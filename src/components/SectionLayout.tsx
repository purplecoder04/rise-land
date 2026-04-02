import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Sparkles, BookOpen, TrendingUp, User } from "lucide-react";

interface SectionLayoutProps {
  section: "rise" | "land";
  title: string;
  children: ReactNode;
}

const navItems = [
  { path: "", label: "Prompt", icon: Sparkles },
  { path: "/journal", label: "Journal", icon: BookOpen },
  { path: "/progress", label: "Progress", icon: TrendingUp },
  { path: "/profile", label: "Profile", icon: User },
];

const SectionLayout = ({ section, title, children }: SectionLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const basePath = `/${section}`;

  const bgClass = section === "rise" ? "bg-rise-bg" : "bg-land-bg";
  const textClass = section === "rise" ? "text-rise-deep" : "text-land-deep";
  const activeClass = section === "rise" ? "text-rise-deep" : "text-land-deep";
  const mutedClass = section === "rise" ? "text-rise-deep/45" : "text-land-deep/45";
  const borderClass = section === "rise" ? "border-rise-muted" : "border-land-muted";

  return (
    <div className={`min-h-screen flex flex-col ${bgClass}`}>
      {/* Top bar */}
      <header className={`flex items-center justify-between px-6 py-4 border-b ${borderClass}`}>
        <button
          onClick={() => navigate("/")}
          className={`${mutedClass} hover:${textClass} transition-colors`}
        >
          <Home className="w-5 h-5" />
        </button>
        <h1 className={`font-display text-xl font-light tracking-wide ${textClass}`}>
          {title}
        </h1>
        <div className="w-5" />
      </header>

      {/* Content */}
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 px-6 py-8 overflow-auto"
      >
        {children}
      </motion.main>

      {/* Bottom Navigation */}
      <nav className={`flex items-center justify-around py-3 border-t ${borderClass} ${bgClass}`}>
        {navItems.map((item) => {
          const fullPath = basePath + item.path;
          const isActive = location.pathname === fullPath;
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(fullPath)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? activeClass : mutedClass
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-body font-medium tracking-wide">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default SectionLayout;
