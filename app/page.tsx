import { Calculator } from "@/components/Calculator";
import { FormulaInfo } from "@/components/FormulaInfo";

export default function Page() {
  return (
    <>
      <div className="text-center mb-10 sm:mb-14">
        <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-accent border border-accent/30 rounded-full px-3 py-1 mb-4">
          UTME 2026 · Thoby's Guide
        </span>
        <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
          Know your <span className="gold-text">UNILAG</span> aggregate.
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Crunch your JAMB, Post-UTME and O'Level scores in seconds — and see how you stack up against last year's cutoffs.
        </p>
      </div>
      <Calculator />
      <FormulaInfo />
    </>
  );
}
