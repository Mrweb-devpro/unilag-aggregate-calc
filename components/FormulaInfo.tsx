import { Info } from "lucide-react";

export function FormulaInfo() {
  return (
    <section className="glass rounded-3xl p-6 sm:p-8 mt-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-accent">
          <Info className="w-4 h-4" />
        </div>
        <h2 className="text-lg font-semibold">How the score works</h2>
      </div>

      <div className="space-y-4 text-[15px] leading-relaxed text-foreground/90">
        <p>
          UNILAG's aggregate is built from three pieces: your{" "}
          <span className="text-accent font-medium">JAMB</span> score, your{" "}
          <span className="text-accent font-medium">Post-UTME</span> result, and points from
          your <span className="text-accent font-medium">O'Level</span> grades.
        </p>

        <p>
          To get your JAMB contribution, simply divide your JAMB score by{" "}
          <span className="font-mono">8</span>. That gives you a value out of 50. Your
          Post-UTME score is already out of 30, so it goes in as-is.
        </p>

        <p>
          For O'Level, pick your five best subjects. Each grade carries a point value —
          A1 is worth 4.0, B2 is 3.6, all the way down to F9 which is 0. Add the five up
          and you get a number out of 20.
        </p>

        <p>
          Add the three together and that's your aggregate, out of 100. Compare it
          against the cutoff for your course of choice and you'll know where you stand.
        </p>

        <p className="text-muted-foreground text-sm pt-2 border-t border-border/50">
          Cutoffs do shift each year depending on competition and overall JAMB
          performance, so treat this as a guide and confirm details on the official
          UNILAG portal before making your final pick.
        </p>
      </div>
    </section>
  );
}
