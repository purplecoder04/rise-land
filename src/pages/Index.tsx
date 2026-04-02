import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, Heart, Shield, Leaf, Mountain } from "lucide-react";

const RiseCard = ({ icon: Icon, label, delay }: { icon: any; label: string; delay: number }) => (
  <motion.button
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-rise-muted/40 border border-rise-muted/60 text-left transition-all active:scale-[0.97]"
  >
    <div className="w-7 h-7 rounded-lg bg-rise/10 flex items-center justify-center shrink-0">
      <Icon className="w-3.5 h-3.5 text-rise" />
    </div>
    <span className="font-body text-[11px] font-medium text-rise-deep/70">{label}</span>
  </motion.button>
);

const LandCard = ({ icon: Icon, label, delay }: { icon: any; label: string; delay: number }) => (
  <motion.button
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-land-muted/40 border border-land-muted/60 text-left transition-all active:scale-[0.97]"
  >
    <div className="w-7 h-7 rounded-lg bg-land/10 flex items-center justify-center shrink-0">
      <Icon className="w-3.5 h-3.5 text-land" />
    </div>
    <span className="font-body text-[11px] font-medium text-land-deep/70">{label}</span>
  </motion.button>
);

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center py-3">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display text-lg md:text-3xl font-light tracking-wide text-foreground"
        >
          Rise <span className="font-light opacity-40">&</span> Land
        </motion.h1>
      </header>

      {/* Split Screen - always side by side */}
      <div className="flex-1 flex flex-row relative">
        {/* Rise Side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="flex-1 flex flex-col items-center justify-between px-3 md:px-8 pt-16 pb-8 bg-rise-bg relative"
        >
          {/* Top content */}
          <div className="max-w-[150px] md:max-w-xs text-center space-y-3 md:space-y-6 mt-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-display text-4xl md:text-6xl font-light text-rise-deep tracking-wide"
            >
              Rise
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="font-body text-[13px] md:text-base font-light leading-relaxed text-rise-deep/80"
            >
              Her individual
              <br />
              inner work.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Button
                variant="rise"
                size="default"
                onClick={() => navigate("/rise")}
                className="text-xs md:text-sm px-4 md:px-6 py-2 md:py-3"
              >
                Enter Rise
              </Button>
            </motion.div>
          </div>

          {/* Bottom preview cards */}
          <div className="w-full max-w-[150px] space-y-2">
            <RiseCard icon={Sparkles} label="Daily Prompt" delay={1.1} />
            <RiseCard icon={Heart} label="Mood Check-In" delay={1.2} />
            <RiseCard icon={BookOpen} label="Journal" delay={1.3} />
          </div>
        </motion.div>

        {/* Soft Seam */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 md:w-16 z-[1] pointer-events-none"
          style={{
            background: "linear-gradient(to right, hsl(18 50% 95% / 0.6), hsl(30 20% 95% / 0.8), hsl(40 20% 95% / 0.6))",
            filter: "blur(6px)",
          }}
        />

        {/* Land Side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="flex-1 flex flex-col items-center justify-between px-3 md:px-8 pt-16 pb-8 bg-land-bg relative"
        >
          {/* Top content */}
          <div className="max-w-[150px] md:max-w-xs text-center space-y-3 md:space-y-6 mt-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-display text-4xl md:text-6xl font-light text-land-deep tracking-wide"
            >
              Land
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="font-body text-[13px] md:text-base font-light leading-relaxed text-land-deep/80"
            >
              His individual
              <br />
              inner work.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Button
                variant="land"
                size="default"
                onClick={() => navigate("/land")}
                className="text-xs md:text-sm px-4 md:px-6 py-2 md:py-3"
              >
                Enter Land
              </Button>
            </motion.div>
          </div>

          {/* Bottom preview cards */}
          <div className="w-full max-w-[150px] space-y-2">
            <LandCard icon={Sparkles} label="Daily Prompt" delay={1.15} />
            <LandCard icon={Shield} label="Trust Reflection" delay={1.25} />
            <LandCard icon={Mountain} label="Grounding" delay={1.35} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
