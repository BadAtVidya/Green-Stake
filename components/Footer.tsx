import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[rgba(18,53,34,0.12)] bg-[var(--color-forest)] text-[var(--color-cream)] shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl font-semibold">GreenStake</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-[rgba(247,240,223,0.72)]">
            A verification layer where every planted tree can carry a stake, a
            proof, and a community-backed reward on Stellar testnet.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-amber)]">
            Explore
          </p>
          <div className="mt-4 grid gap-2 text-sm text-[rgba(247,240,223,0.78)]">
            <Link href="/how-it-works">How it works</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/why-stellar">Why Stellar</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-amber)]">
            Testnet
          </p>
          <p className="mt-4 break-all text-sm text-[rgba(247,240,223,0.72)]">
            {process.env.NEXT_PUBLIC_CONTRACT_ID ?? process.env.CONTRACT_ID}
          </p>
        </div>
      </div>
    </footer>
  );
}
