import type { Metadata } from "next";
import { CutoffList } from "@/components/CutoffList";

export const metadata: Metadata = {
  title: "UNILAG Cutoff Marks — 5-Year History",
  description: "Browse UNILAG cutoff marks for every course across faculties with 5-year history.",
};

export default function CutoffsPage() {
  return (
    <>
      <div className="mb-8">
        <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-accent border border-accent/30 rounded-full px-3 py-1 mb-4">
          5-Year History
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold">
          UNILAG <span className="gold-text">Cutoff Marks</span>
        </h1>
        <p className="mt-3 text-muted-foreground max-w-xl">
          Reference cutoffs across faculties for the last 5 years. Use trends to gauge where your target course is heading.
        </p>
      </div>
      <CutoffList />
    </>
  );
}
