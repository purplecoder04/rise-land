import { useNavigate } from "react-router-dom";
import SectionLayout from "@/components/SectionLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { getPromptForDate } from "@/lib/journalPrompts";

const LandPrompt = () => {
  const navigate = useNavigate();
  const today = new Date();
  const promptText = getPromptForDate("Land", today);

  return (
    <SectionLayout section="land" title="Land">
      <div className="max-w-sm mx-auto space-y-8 pt-6">
        <div className="text-center space-y-2">
          <p className="font-body text-xs font-medium tracking-widest uppercase text-land/70">
            Daily Prompt
          </p>
          <p className="font-body text-xs text-land-deep/50">
            {today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl bg-land-muted/30 border border-land-muted/50 px-5 py-8"
        >
          <blockquote className="font-display text-xl font-light leading-relaxed text-land-deep text-center italic">
            "{promptText}"
          </blockquote>
        </motion.div>

        <p className="font-body text-sm text-center text-land-deep/65 leading-relaxed px-2">
          Take your time. When you're ready, begin your reflection.
        </p>

        <div className="flex justify-center">
          <Button
            variant="land"
            size="default"
            onClick={() => navigate("/land/journal")}
            className="text-xs px-5 py-2.5 gap-2"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Reflect Now
          </Button>
        </div>
      </div>
    </SectionLayout>
  );
};

export default LandPrompt;
