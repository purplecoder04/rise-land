import { useState } from "react";
import SectionLayout from "@/components/SectionLayout";
import { Button } from "@/components/ui/button";

const RiseJournal = () => {
  const [entry, setEntry] = useState("");

  return (
    <SectionLayout section="rise" title="Journal">
      <div className="max-w-sm mx-auto space-y-6 pt-4">
        <div className="text-center space-y-1">
          <p className="font-body text-xs font-medium tracking-widest uppercase text-rise/60">
            Reflection
          </p>
          <p className="font-display text-lg font-light text-rise-deep">
            What's on your heart today?
          </p>
        </div>

        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Begin writing..."
          className="w-full h-64 bg-transparent border border-rise-muted rounded-2xl p-5 font-body text-sm text-rise-deep placeholder:text-rise/30 focus:outline-none focus:border-rise/40 resize-none leading-relaxed transition-colors"
        />

        <div className="flex justify-end">
          <Button variant="rise" size="default" disabled={!entry.trim()}>
            Save Entry
          </Button>
        </div>
      </div>
    </SectionLayout>
  );
};

export default RiseJournal;
