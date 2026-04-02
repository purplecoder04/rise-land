import { useNavigate } from "react-router-dom";
import SectionLayout from "@/components/SectionLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const prompts = [
  "What emotion are you carrying today that you haven't named yet?",
  "Where in your body do you feel tension right now?",
  "What would you tell your younger self today?",
];

const RisePrompt = () => {
  const navigate = useNavigate();
  const today = new Date();
  const promptIndex = today.getDate() % prompts.length;

  return (
    <SectionLayout section="rise" title="Rise">
      <div className="max-w-sm mx-auto space-y-8 pt-6">
        <div className="text-center space-y-2">
          <p className="font-body text-xs font-medium tracking-widest uppercase text-rise/70">
            Daily Prompt
          </p>
          <p className="font-body text-xs text-rise-deep/50">
            {today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl bg-rise-muted/30 border border-rise-muted/50 px-5 py-8"
        >
          <blockquote className="font-display text-xl font-light leading-relaxed text-rise-deep text-center italic">
            "{prompts[promptIndex]}"
          </blockquote>
        </motion.div>

        <p className="font-body text-sm text-center text-rise-deep/65 leading-relaxed px-2">
          Sit with this. There's no rush. When you're ready, begin your reflection.
        </p>

        <div className="flex justify-center">
          <Button
            variant="rise"
            size="default"
            onClick={() => navigate("/rise/journal")}
            className="text-xs px-5 py-2.5 gap-2"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Open Journal
          </Button>
        </div>
      </div>
    </SectionLayout>
  );
};

export default RisePrompt;
