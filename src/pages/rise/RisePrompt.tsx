import SectionLayout from "@/components/SectionLayout";

const prompts = [
  "What emotion are you carrying today that you haven't named yet?",
  "Where in your body do you feel tension right now?",
  "What would you tell your younger self today?",
];

const RisePrompt = () => {
  const today = new Date();
  const promptIndex = today.getDate() % prompts.length;

  return (
    <SectionLayout section="rise" title="Rise">
      <div className="max-w-sm mx-auto space-y-10 pt-8">
        <div className="text-center space-y-2">
          <p className="font-body text-xs font-medium tracking-widest uppercase text-rise/60">
            Daily Prompt
          </p>
          <p className="font-body text-xs text-rise-deep/40">
            {today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>

        <blockquote className="font-display text-2xl font-light leading-relaxed text-rise-deep text-center italic px-4">
          "{prompts[promptIndex]}"
        </blockquote>

        <div className="flex justify-center">
          <div className="w-8 h-px bg-rise/30" />
        </div>

        <p className="font-body text-sm text-center text-rise-deep/50 leading-relaxed">
          Sit with this. There's no rush. When you're ready, open your journal.
        </p>
      </div>
    </SectionLayout>
  );
};

export default RisePrompt;
