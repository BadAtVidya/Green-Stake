"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Wallet } from "lucide-react";
import { useWallet } from "@/components/WalletProvider";

const links = [
  { href: "/", label: "Forest" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/submit", label: "Submit" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/why-stellar", label: "Why Stellar" },
];

export function Nav() {
  const pathname = usePathname();
  const { publicKey, isConnecting, isConnected, error, connect, disconnect } = useWallet();

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(18,53,34,0.12)] bg-[rgba(247,240,223,0.86)] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-full">
          <span className="grid size-10 place-items-center rounded-full bg-[var(--color-forest)] text-[var(--color-amber)]">
            <span className="font-display text-xl font-bold">G</span>
          </span>
          <span className="font-display text-xl font-semibold">GreenStake</span>
        </Link>
        <div className="hidden items-center gap-2 lg:flex">
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`focus-ring rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-[var(--color-forest)] text-[var(--color-cream)]"
                    : "text-[rgba(18,53,34,0.72)] hover:bg-[rgba(18,53,34,0.15)] hover:scale-105 transition-all"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <button
              type="button"
              onClick={() => void disconnect()}
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-[rgba(18,53,34,0.16)] px-4 py-2.5 text-sm font-bold text-[rgba(18,53,34,0.78)] transition hover:bg-[rgba(18,53,34,0.06)]"
            >
              <LogOut size={16} />
              {publicKey ? `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}` : "Disconnect"}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void connect()}
              disabled={isConnecting}
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-[var(--color-amber)] px-4 py-2.5 text-sm font-bold text-[var(--color-forest)] shadow-[0_12px_30px_rgba(229,168,58,0.28)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Wallet size={16} />
              {isConnecting ? "Connecting" : "Connect wallet"}
            </button>
          )}
          <Link
            href="/submit"
            className="focus-ring hidden rounded-full bg-[var(--color-amber)] px-5 py-2.5 text-sm font-bold text-[var(--color-forest)] shadow-[0_12px_30px_rgba(229,168,58,0.28)] transition hover:-translate-y-0.5 sm:inline-flex"
          >
            Plant claim
          </Link>
        </div>
      </nav>
      {error ? (
        <div className="border-t border-[rgba(18,53,34,0.12)] bg-[rgba(229,168,58,0.14)] px-5 py-3 text-center text-sm font-semibold text-[var(--color-forest)] sm:px-8">
          Wallet error: {error}
        </div>
      ) : null}
      <div className="flex gap-2 overflow-x-auto px-5 pb-3 lg:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="focus-ring shrink-0 rounded-full border border-[rgba(18,53,34,0.16)] px-3 py-1.5 text-sm font-semibold"
          >
            {link.label}
          </Link>
        ))}
        {isConnected ? (
          <button
            type="button"
            onClick={() => void disconnect()}
            className="focus-ring shrink-0 rounded-full border border-[rgba(18,53,34,0.16)] px-3 py-1.5 text-sm font-semibold"
          >
            Disconnect
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void connect()}
            className="focus-ring shrink-0 rounded-full bg-[var(--color-amber)] px-3 py-1.5 text-sm font-bold text-[var(--color-forest)]"
          >
            Connect wallet
          </button>
        )}
      </div>
    </header>
  );
}
