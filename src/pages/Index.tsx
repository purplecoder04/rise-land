import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center py-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display text-2xl md:text-3xl font-light tracking-wide text-foreground"
        >
          Rise <span className="font-light opacity-40">&</span> Land
        </motion.h1>
      </header>

      {/* Split Screen */}
      <div className="flex-1 flex flex-col md:flex-row relative">
        {/* Rise Side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="flex-1 flex flex-col items-center justify-center px-8 py-24 bg-rise-bg relative"
        >
          <div className="max-w-xs text-center space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-display text-5xl md:text-6xl font-light text-rise-deep tracking-wide"
            >
              Rise
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="font-body text-base font-light leading-relaxed text-rise-deep/70"
            >
              Her individual inner work.
              <br />
              <span className="text-sm opacity-70">
                Healing, soft, warm, restorative.
              </span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Button
                variant="rise"
                size="lg"
                onClick={() => navigate("/rise")}
                className="mt-2"
              >
                Enter Rise
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Soft Seam - visible on desktop */}
        <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-16 z-[1] pointer-events-none"
          style={{
            background: "linear-gradient(to right, hsl(18 50% 95% / 0.6), hsl(30 20% 95% / 0.8), hsl(40 20% 95% / 0.6))",
            filter: "blur(8px)",
          }}
        />

        {/* Soft Seam - mobile horizontal */}
        <div className="md:hidden h-8 w-full z-[1] pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, hsl(18 50% 95% / 0.6), hsl(30 20% 95% / 0.8), hsl(40 20% 95% / 0.6))",
            filter: "blur(4px)",
          }}
        />

        {/* Land Side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="flex-1 flex flex-col items-center justify-center px-8 py-24 bg-land-bg relative"
        >
          <div className="max-w-xs text-center space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-display text-5xl md:text-6xl font-light text-land-deep tracking-wide"
            >
              Land
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="font-body text-base font-light leading-relaxed text-land-deep/70"
            >
              His individual inner work.
              <br />
              <span className="text-sm opacity-70">
                Grounded, calm, secure, steady.
              </span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Button
                variant="land"
                size="lg"
                onClick={() => navigate("/land")}
                className="mt-2"
              >
                Enter Land
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
