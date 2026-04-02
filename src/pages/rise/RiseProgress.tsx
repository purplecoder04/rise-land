import SectionLayout from "@/components/SectionLayout";

const days = ["M", "T", "W", "T", "F", "S", "S"];

const RiseProgress = () => {
  return (
    <SectionLayout section="rise" title="Progress">
      <div className="max-w-sm mx-auto space-y-10 pt-4">
        <div className="text-center space-y-1">
          <p className="font-body text-xs font-medium tracking-widest uppercase text-rise/60">
            Your Journey
          </p>
          <p className="font-display text-lg font-light text-rise-deep">
            Every small step matters
          </p>
        </div>

        {/* Streak */}
        <div className="space-y-4">
          <p className="font-body text-xs text-rise-deep/50 text-center">This Week</p>
          <div className="flex justify-center gap-3">
            {days.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-body ${
                    i < 3
                      ? "bg-rise text-rise-bg"
                      : "border border-rise-muted text-rise-deep/30"
                  }`}
                >
                  {d}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Journal Entries", value: "12" },
            { label: "Day Streak", value: "3" },
            { label: "Prompts Completed", value: "9" },
            { label: "Weeks Active", value: "2" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-rise-muted/30 rounded-2xl p-5 text-center space-y-1"
            >
              <p className="font-display text-2xl font-light text-rise-deep">
                {stat.value}
              </p>
              <p className="font-body text-[10px] text-rise-deep/50 tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionLayout>
  );
};

export default RiseProgress;
