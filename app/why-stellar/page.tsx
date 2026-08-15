import { ArrowRight, Clock, Coins, Globe2 } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { StatCounter } from "@/components/StatCounter";

export default function WhyStellarPage() {
  return (
    <>
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-soil)]">
            Why Stellar
          </p>
          <h1 className="font-display mt-4 text-5xl font-semibold leading-tight sm:text-7xl">
            Tiny fees matter when every sapling carries a tiny stake.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[rgba(18,53,34,0.68)]">
            Tree claims need fast settlement, low-cost voting, and simple asset
            movement. Stellar gives the contract room to reward small acts
            without fees swallowing the impact.
          </p>
        </div>
      </section>
      <section className="px-5 pb-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          <StatCounter value={1} suffix="s" label="Approx finality target" />
          <StatCounter value={100} suffix=" stroops" label="Tiny base fee unit" />
          <StatCounter value={3} suffix=" votes" label="Verifier set size" />
        </div>
      </section>
      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            {
              icon: Clock,
              title: "Fast enough for field work",
              text: "Planters and verifiers do not need to wait through slow settlement loops.",
            },
            {
              icon: Coins,
              title: "Small stakes stay meaningful",
              text: "Low fees let 3 to 5 XLM stakes make sense for real-world micro incentives.",
            },
            {
              icon: Globe2,
              title: "Open public audit trail",
              text: "Claim status, reward flow, and verifier decisions can be surfaced to anyone.",
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <div className="earth-panel h-full rounded-[8px] p-7">
                <item.icon className="text-[var(--color-moss)]" size={30} />
                <h2 className="font-display mt-6 text-3xl font-semibold">{item.title}</h2>
                <p className="mt-3 leading-7 text-[rgba(18,53,34,0.68)]">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-7xl">
          <Link
            href="/dashboard"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-[var(--color-forest)] px-6 py-4 font-bold text-[var(--color-cream)]"
          >
            See claims <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
