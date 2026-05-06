"use client";
import { useEffect, useMemo, useState } from "react";
import { Calculator as CalcIcon, Sparkles, RotateCcw, GraduationCap } from "lucide-react";
import { GRADES, calculateAggregate } from "@/lib/unilag-data";

const STORAGE_KEY = "unilag-calc-v1";

export function Calculator() {
  const [jamb, setJamb] = useState("");
  const [postUtme, setPostUtme] = useState("");
  const [grades, setGrades] = useState<string[]>(["", "", "", "", ""]);
  const [result, setResult] = useState<ReturnType<typeof calculateAggregate> | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const d = JSON.parse(saved);
        setJamb(d.jamb ?? "");
        setPostUtme(d.postUtme ?? "");
        setGrades(d.grades ?? ["", "", "", "", ""]);
        setResult(d.result ?? null);
      }
    } catch {}
  }, []);

  const jambNum = Number(jamb);
  const postNum = Number(postUtme);
  const valid =
    jamb !== "" && jambNum >= 0 && jambNum <= 400 &&
    postUtme !== "" && postNum >= 0 && postNum <= 30 &&
    grades.every((g) => g);

  const setGrade = (i: number, v: string) =>
    setGrades((g) => g.map((x, idx) => (idx === i ? v : x)));

  const handleCalc = () => {
    if (!valid) return;
    const r = calculateAggregate(jambNum, postNum, grades);
    setResult(r);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ jamb, postUtme, grades, result: r }));
    } catch {}
  };

  const handleReset = () => {
    setJamb(""); setPostUtme(""); setGrades(["", "", "", "", ""]); setResult(null);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  const verdict = useMemo(() => {
    if (!result) return null;
    const t = result.total;
    if (t >= 80) return { label: "Outstanding", tone: "Top-tier course range", color: "text-accent" };
    if (t >= 70) return { label: "Strong", tone: "Competitive for most courses", color: "text-accent" };
    if (t >= 60) return { label: "Solid", tone: "Several courses within reach", color: "text-foreground" };
    if (t >= 50) return { label: "Borderline", tone: "Consider lower-cutoff options", color: "text-foreground/80" };
    return { label: "Needs work", tone: "Aim higher in JAMB / Post-UTME", color: "text-destructive" };
  }, [result]);

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      {/* Form */}
      <section className="glass rounded-3xl p-6 sm:p-8 lg:col-span-3">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl gold-bg flex items-center justify-center">
            <CalcIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Enter your details</h2>
            <p className="text-xs text-muted-foreground">JAMB ÷ 8 + Post-UTME + O'Level points</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="JAMB Score" hint="0 – 400">
            <input
              type="number" min={0} max={400} value={jamb}
              onChange={(e) => setJamb(e.target.value)}
              placeholder="e.g. 285"
              className="input"
            />
          </Field>
          <Field label="Post-UTME Score" hint="0 – 30">
            <input
              type="number" min={0} max={30} value={postUtme}
              onChange={(e) => setPostUtme(e.target.value)}
              placeholder="e.g. 24"
              className="input"
            />
          </Field>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">O'Level Results</h3>
            <span className="text-xs text-muted-foreground">5 core subjects</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {grades.map((g, i) => (
              <Field key={i} label={`Subject ${i + 1}`}>
                <select value={g} onChange={(e) => setGrade(i, e.target.value)} className="input appearance-none cursor-pointer">
                  <option value="">Select grade</option>
                  {GRADES.map((gr) => <option key={gr} value={gr}>{gr}</option>)}
                </select>
              </Field>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            disabled={!valid}
            onClick={handleCalc}
            className="flex-1 gold-bg font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] transition"
          >
            <Sparkles className="w-4 h-4" /> Calculate Aggregate
          </button>
          <button onClick={handleReset} className="px-5 rounded-2xl border border-border hover:bg-secondary transition" aria-label="Reset">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Result */}
      <section className="glass rounded-3xl p-6 sm:p-8 lg:col-span-2 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-accent">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold">Your Aggregate</h2>
        </div>

        {!result ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-10 border border-dashed border-border rounded-2xl">
            <div className="w-14 h-14 rounded-full bg-secondary/60 flex items-center justify-center text-2xl mb-3">?</div>
            <p className="font-semibold">No result yet</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-[220px]">Fill in your details and tap calculate to see your aggregate score.</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <div className="text-center py-6 rounded-2xl bg-gradient-to-b from-secondary/80 to-transparent border border-accent/20">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Final Aggregate</p>
              <div className="text-6xl font-display font-bold gold-text mt-2">{result.total}</div>
              {verdict && (
                <p className={`mt-2 text-sm font-medium ${verdict.color}`}>
                  {verdict.label} <span className="text-muted-foreground font-normal">· {verdict.tone}</span>
                </p>
              )}
            </div>

            <div className="mt-5 space-y-2 text-sm">
              <Row label="JAMB ÷ 8" value={result.jambPart} max={50} />
              <Row label="Post-UTME" value={result.postUtme} max={30} />
              <Row label="O'Level Points" value={result.olevelPart} max={20} />
            </div>
          </div>
        )}
      </section>

      <style>{`
        .input {
          width: 100%;
          background: oklch(0.22 0.05 25);
          border: 1px solid var(--color-border);
          border-radius: 0.9rem;
          padding: 0.75rem 1rem;
          color: var(--color-foreground);
          outline: none;
          transition: all .15s ease;
        }
        .input:focus { border-color: var(--color-ring); box-shadow: 0 0 0 3px oklch(0.78 0.15 85 / 20%); }
      `}</style>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
        {hint && <span className="text-[10px] text-muted-foreground/70">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

function Row({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono">{value} <span className="text-muted-foreground">/ {max}</span></span>
      </div>
      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
        <div className="h-full gold-bg transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
