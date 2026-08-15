import Link from "next/link";
import { ArrowRight, BadgeCheck, Leaf, ShieldCheck } from "lucide-react";
import { ForestHero } from "@/components/ForestHero";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <ForestHero />
      <section className="bg-[var(--color-cream)] px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            {
              icon: Leaf,
              title: "Plant with proof",
              text: "Photo hash and quantized GPS cell create a clean claim without exposing fragile raw coordinates.",
            },
            {
              icon: ShieldCheck,
              title: "Verify together",
              text: "Three authorized verifiers vote, and two matching decisions move the claim forward.",
            },
            {
              icon: BadgeCheck,
              title: "Reward impact",
              text: "Approved claims return the planter stake with a fixed XLM reward from the contract.",
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
      </section>
      <section className="bg-[var(--color-forest)] px-5 py-20 text-[var(--color-cream)] sm:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <h2 className="font-display text-5xl font-semibold leading-tight">
              One verified sapling is small. A verified canopy is finance
              pointed at repair.
            </h2>
          </Reveal>
          <Reveal>
            <Link
              href="/how-it-works"
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-[var(--color-amber)] px-6 py-4 font-bold text-[var(--color-forest)]"
            >
              Watch the flow grow <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
