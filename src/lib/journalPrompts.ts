import type { PathType } from "@/integrations/supabase/client";

export const journalPrompts: Record<PathType, string[]> = {
  Rise: [
    "What emotion are you carrying today that you haven't named yet?",
    "Where in your body do you feel tension right now?",
    "What would you tell your younger self today?",
  ],
  Land: [
    "What responsibility have you been avoiding, and why?",
    "What does being 'strong' cost you emotionally?",
    "When was the last time you let yourself be fully honest?",
  ],
};

export const getPromptForDate = (pathType: PathType, date = new Date()) => {
  const prompts = journalPrompts[pathType];
  return prompts[date.getDate() % prompts.length];
};
