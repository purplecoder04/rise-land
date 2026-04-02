import SectionLayout from "@/components/SectionLayout";

const RiseProfile = () => {
  return (
    <SectionLayout section="rise" title="Profile">
      <div className="max-w-sm mx-auto space-y-8 pt-4">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-rise-muted/50 flex items-center justify-center">
            <span className="font-display text-2xl text-rise-deep/60">R</span>
          </div>
          <p className="font-display text-xl font-light text-rise-deep">Rise</p>
          <p className="font-body text-xs text-rise-deep/40">Your private space</p>
        </div>

        {/* Settings list */}
        <div className="space-y-1">
          {["Notifications", "Reminder Time", "Theme", "Privacy", "About Rise & Land"].map(
            (item) => (
              <button
                key={item}
                className="w-full text-left px-4 py-3.5 rounded-xl font-body text-sm text-rise-deep/70 hover:bg-rise-muted/30 transition-colors"
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>
    </SectionLayout>
  );
};

export default RiseProfile;
