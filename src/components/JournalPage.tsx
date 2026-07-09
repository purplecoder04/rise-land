import { useCallback, useEffect, useMemo, useState } from "react";
import SectionLayout from "@/components/SectionLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { JournalEntry, PathType, supabase } from "@/integrations/supabase/client";
import { getPromptForDate } from "@/lib/journalPrompts";

interface JournalPageProps {
  section: "rise" | "land";
}

const copy = {
  rise: {
    pathType: "Rise" as PathType,
    label: "Reflection",
    title: "What's on your heart today?",
    emptyText: "Your saved Rise reflections will appear here.",
    buttonVariant: "rise" as const,
    accentText: "text-rise/60",
    mutedText: "text-rise-deep/50",
    bodyText: "text-rise-deep",
    border: "border-rise-muted",
    focusBorder: "focus:border-rise/40",
    placeholder: "placeholder:text-rise/30",
    panel: "bg-rise-muted/30 border-rise-muted/50",
    hoverPanel: "hover:bg-rise-muted/30",
  },
  land: {
    pathType: "Land" as PathType,
    label: "Reflection",
    title: "What's weighing on you today?",
    emptyText: "Your saved Land reflections will appear here.",
    buttonVariant: "land" as const,
    accentText: "text-land/60",
    mutedText: "text-land-deep/50",
    bodyText: "text-land-deep",
    border: "border-land-muted",
    focusBorder: "focus:border-land/40",
    placeholder: "placeholder:text-land/30",
    panel: "bg-land-muted/30 border-land-muted/50",
    hoverPanel: "hover:bg-land-muted/30",
  },
};

const entryFields = "id,user_id,path_type,prompt_text,journal_text,created_at,updated_at";

const formatEntryDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));

const JournalPage = ({ section }: JournalPageProps) => {
  const styles = copy[section];
  const { user } = useAuth();
  const { toast } = useToast();
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [loadingEntries, setLoadingEntries] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const promptText = useMemo(() => getPromptForDate(styles.pathType), [styles.pathType]);

  const loadEntries = useCallback(async () => {
    if (!supabase || !user) {
      setLoadingEntries(false);
      return;
    }

    setLoadingEntries(true);
    setLoadError(null);

    const { data, error } = await supabase
      .from("journal_entries")
      .select(entryFields)
      .eq("user_id", user.id)
      .eq("path_type", styles.pathType)
      .order("created_at", { ascending: false });

    if (error) {
      setLoadError(error.message);
      setEntries([]);
    } else {
      setEntries((data ?? []) as JournalEntry[]);
    }

    setLoadingEntries(false);
  }, [styles.pathType, user]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const handleSave = async () => {
    const trimmedEntry = entry.trim();

    if (!trimmedEntry || !supabase || !user) {
      return;
    }

    setSaving(true);

    const { data, error } = await supabase
      .from("journal_entries")
      .insert({
        user_id: user.id,
        path_type: styles.pathType,
        prompt_text: promptText,
        journal_text: trimmedEntry,
      })
      .select(entryFields)
      .single();

    setSaving(false);

    if (error) {
      toast({
        title: "Entry was not saved",
        description: error.message,
      });
      return;
    }

    const savedEntry = data as JournalEntry;
    setEntries((currentEntries) => [savedEntry, ...currentEntries]);
    setSelectedEntry(savedEntry);
    setEntry("");
    toast({
      title: "Entry saved",
      description: `${styles.pathType} reflection added to your journal.`,
    });
  };

  return (
    <SectionLayout section={section} title="Journal">
      <div className="max-w-sm mx-auto space-y-7 pt-4">
        <div className="text-center space-y-1">
          <p className={`font-body text-xs font-medium tracking-widest uppercase ${styles.accentText}`}>
            {styles.label}
          </p>
          <p className={`font-display text-lg font-light ${styles.bodyText}`}>{styles.title}</p>
        </div>

        <div className={`rounded-2xl border px-4 py-4 space-y-2 ${styles.panel}`}>
          <p className={`font-body text-[10px] font-medium tracking-widest uppercase ${styles.accentText}`}>
            Today's Prompt
          </p>
          <p className={`font-body text-sm leading-relaxed ${styles.bodyText}`}>{promptText}</p>
        </div>

        <textarea
          value={entry}
          onChange={(event) => setEntry(event.target.value)}
          placeholder="Begin writing..."
          className={`w-full h-64 bg-transparent border rounded-2xl p-5 font-body text-sm ${styles.bodyText} ${styles.placeholder} ${styles.border} ${styles.focusBorder} focus:outline-none resize-none leading-relaxed transition-colors`}
        />

        <div className="flex justify-end">
          <Button variant={styles.buttonVariant} size="default" disabled={!entry.trim() || saving} onClick={handleSave}>
            {saving ? "Saving..." : "Save Entry"}
          </Button>
        </div>

        <section className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <p className={`font-body text-xs font-medium tracking-widest uppercase ${styles.accentText}`}>
              Journal History
            </p>
            <p className={`font-body text-xs ${styles.mutedText}`}>{entries.length} saved</p>
          </div>

          {loadingEntries ? (
            <p className={`font-body text-sm ${styles.mutedText}`}>Loading saved entries...</p>
          ) : loadError ? (
            <p className="font-body text-sm text-destructive">{loadError}</p>
          ) : entries.length === 0 ? (
            <p className={`font-body text-sm leading-relaxed ${styles.mutedText}`}>{styles.emptyText}</p>
          ) : (
            <div className="space-y-2">
              {entries.map((savedEntry) => (
                <button
                  key={savedEntry.id}
                  type="button"
                  onClick={() => setSelectedEntry(savedEntry)}
                  className={`w-full rounded-2xl border ${styles.border} ${styles.hoverPanel} px-4 py-3 text-left transition-colors`}
                >
                  <p className={`font-body text-[11px] ${styles.mutedText}`}>{formatEntryDate(savedEntry.created_at)}</p>
                  <p className={`mt-1 font-body text-sm leading-relaxed ${styles.bodyText}`}>{savedEntry.prompt_text}</p>
                  <p className={`mt-2 line-clamp-2 font-body text-xs leading-relaxed ${styles.mutedText}`}>
                    {savedEntry.journal_text}
                  </p>
                </button>
              ))}
            </div>
          )}
        </section>

        {selectedEntry && (
          <section className={`rounded-2xl border px-5 py-5 space-y-4 ${styles.panel}`}>
            <div className="space-y-1">
              <p className={`font-body text-[11px] ${styles.mutedText}`}>{formatEntryDate(selectedEntry.created_at)}</p>
              <p className={`font-body text-sm leading-relaxed ${styles.bodyText}`}>{selectedEntry.prompt_text}</p>
            </div>
            <p className={`whitespace-pre-wrap font-body text-sm leading-relaxed ${styles.bodyText}`}>
              {selectedEntry.journal_text}
            </p>
          </section>
        )}
      </div>
    </SectionLayout>
  );
};

export default JournalPage;
