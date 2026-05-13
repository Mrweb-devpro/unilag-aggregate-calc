import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";

export default function Navbar() {
  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/60 border-b border-border/50">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="UNILAG"
              width={40}
              height={40}
              className="rounded-full ring-2 ring-accent/40 group-hover:ring-accent transition"
            />
            <div className="leading-tight">
              <div className="text-lg gold-text font-bold">
                UNILAG Aggregate
              </div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Thoby's Guide · UTME 2026
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-sm ">
            <NavLink to="/">Calculator</NavLink>
            <NavLink to="/cutoffs">Cutoffs</NavLink>
          </nav>
        </div>
      </header>
      {/* Mobile Navigation */}
      <nav className="flex md:hidden items-center gap-1 text-sm mx-auto my-6 border p-3 border-yellow-600 rounded-full">
        <NavLink to="/">Calculator</NavLink>
        <NavLink to="/cutoffs">Cutoffs</NavLink>
      </nav>
    </>
  );
}
