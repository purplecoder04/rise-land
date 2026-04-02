import { useState } from "react";
import SectionLayout from "@/components/SectionLayout";
import { Button } from "@/components/ui/button";

const LandJournal = () => {
  const [entry, setEntry] = useState("");

  return (
    <SectionLayout section="land" title="Journal">
      <div className="max-w-sm mx-auto space-y-6 pt-4">
        <div className="text-center space-y-1">
          <p className="font-body text-xs font-medium tracking-widest uppercase text-land/60">
            Reflection
          </p>
          <p className="font-display text-lg font-light text-land-deep">
            What's weighing on you today?
          </p>
        </div>

        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Begin writing..."
          className="w-full h-64 bg-transparent border border-land-muted rounded-2xl p-5 font-body text-sm text-land-deep placeholder:text-land/30 focus:outline-none focus:border-land/40 resize-none leading-relaxed transition-colors"
        />

        <div className="flex justify-end">
          <Button variant="land" size="default" disabled={!entry.trim()}>
            Save Entry
          </Button>
        </div>
      </div>
    </SectionLayout>
  );
};

export default LandJournal;
