"use client";
import { useMemo, useState } from "react";
import { Search, Building2 } from "lucide-react";
import { CUTOFFS, CUTOFF_YEARS } from "@/lib/unilag-data";

export function CutoffList() {
  const faculties = ["All", ...Object.keys(CUTOFFS)];
  const [faculty, setFaculty] = useState("All");
  const [query, setQuery] = useState("");

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    return Object.entries(CUTOFFS)
      .filter(([f]) => faculty === "All" || f === faculty)
      .map(
        ([f, items]) =>
          [f, items.filter((i) => i.course.toLowerCase().includes(q))] as const,
      )
      .filter(([, items]) => items.length > 0);
  }, [faculty, query]);

  return (
    <div className="glass rounded-3xl p-6 sm:p-8">
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search course..."
            className="w-full min bg-input/20 border border-border rounded-2xl pl-11 pr-4 py-3 outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 transition text-background"
          />
        </div>
        <div className="">
          <p className="text-sm text-stone-500 font-semibold">Filter:</p>
          <select
            className="px-4 py-3 rounded-xl text-xs whitespace-nowrap border transition gold-bg border-transparent font-semibold"
            onChange={(e) => {
              console.log(e.currentTarget.value);
              setFaculty(e.currentTarget.value);
            }}
          >
            {faculties.map((f) => (
              <option value={f} key={f} className={`text-accent-foreground`}>
                {f === "All"
                  ? "All Faculties"
                  : f.replace("Faculty of ", "").replace("College of ", "")}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2 nice-scroll">
        {grouped.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No courses match your search.
          </p>
        )}
        {grouped.map(([f, items]) => (
          <div key={f} className="w-fit">
            <div className="flex items-center gap-2 mb-3 text-accent">
              <Building2 className="w-4 h-4" />
              <h3 className="text-sm font-semibold uppercase tracking-widest">
                {f}
              </h3>
            </div>
            <div className="space-y-3 flex w-full flex-wrap items-center justify-center gap-4">
              {items.map((it) => {
                const latest = it.cutoffs[CUTOFF_YEARS[0]];
                const prev = it.cutoffs[CUTOFF_YEARS[1]];
                return (
                  <div
                    key={it.course}
                    className="rounded-2xl border border-border bg-secondary/40 p-4 hover:border-accent/40 transition"
                  >
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div>
                        <p className="font-semibold text-sm">{it.course}</p>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">
                          2-year cutoff history
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {CUTOFF_YEARS.map((y, idx) => {
                        const v = it.cutoffs[y];
                        const isLatest = idx === 0;
                        return (
                          <div
                            key={y}
                            className={`w-full md:w-fit rounded-lg px-2 py-2 text-center border ${
                              isLatest
                                ? "border-accent/40 bg-accent/10"
                                : "border-border/50 bg-background/30"
                            }`}
                          >
                            <div className="text-[9px] uppercase tracking-widest text-muted-foreground">
                              {y}
                            </div>
                            <div
                              className={`font-mono font-semibold mt-0.5 ${isLatest ? "text-accent" : ""}`}
                            >
                              {v}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
