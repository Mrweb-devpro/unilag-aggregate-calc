import type { Metadata } from "next";
import { CutoffList } from "@/components/CutoffList";
import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";

export const metadata: Metadata = {
  title: "UNILAG Cutoff Marks — 2-Year History",
  description:
    "Browse UNILAG cutoff marks for every course across faculties with 5-year history.",
};

export default function CutoffsPage() {
  return (
    <>
      <div className="mb-8">
        <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-accent border border-accent/30 rounded-full px-3 py-1 mb-4">
          2-Year History
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold">
          UNILAG <span className="gold-text">Cutoff Marks</span>
        </h1>
        <p className="mt-3 text-muted-foreground max-w-xl">
          Reference cutoffs across faculties for the last 2 years. Use trends to
          gauge where your target course is heading.
        </p>
      </div>
      <CutoffList />
      <br />
      <br />
      <div className="mx-auto glass rounded-3xl p-6 sm:p-8 flex flex-col gap-9 w-fit items-center hover:border! border-green-500">
        <div className="flex flex-col gap-5">
          <div className="bg-green-500 flex items-center justify-center w-fit p-6 rounded-3xl mx-auto">
            <BsWhatsapp size={100} />
          </div>
          <h3 className="text-xl">Whatsapp Channel</h3>
          <Link
            href="https://whatsapp.com/channel/0029Vb6ikNOBFLgeNiW7rY3r"
            className="mx-auto text-stone-50 px-4 py-2 w-fit bg-green-500 rounded-full"
          >
            Follow
          </Link>
        </div>
      </div>
    </>
  );
}
