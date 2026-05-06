"use client";

// Imports
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={to}
      className={`px-4 py-2 rounded-full hover:bg-secondary transition ${pathname === to ? "bg-secondary" : ""}`}
    >
      {children}
    </Link>
  );
}
