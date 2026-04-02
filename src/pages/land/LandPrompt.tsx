import SectionLayout from "@/components/SectionLayout";

const prompts = [
  "What responsibility have you been avoiding, and why?",
  "What does being 'strong' cost you emotionally?",
  "When was the last time you let yourself be fully honest?",
];

const LandPrompt = () => {
  const today = new Date();
  const promptIndex = today.getDate() % prompts.length;

  return (
    <SectionLayout section="land" title="Land">
      <div className="max-w-sm mx-auto space-y-10 pt-8">
        <div className="text-center space-y-2">
          <p className="font-body text-xs font-medium tracking-widest uppercase text-land/60">
            Daily Prompt
          </p>
          <p className="font-body text-xs text-land-deep/40">
            {today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>

        <blockquote className="font-display text-2xl font-light leading-relaxed text-land-deep text-center italic px-4">
          "{prompts[promptIndex]}"
        </blockquote>

        <div className="flex justify-center">
          <div className="w-8 h-px bg-land/30" />
        </div>

        <p className="font-body text-sm text-center text-land-deep/50 leading-relaxed">
          Take your time. When you're ready, open your journal.
        </p>
      </div>
    </SectionLayout>
  );
};

export default LandPrompt;
