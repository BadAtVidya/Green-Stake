import { SubmitForm } from "@/components/SubmitForm";
import { Reveal } from "@/components/Reveal";

export default function SubmitPage() {
  return (
    <section className="px-5 py-16 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div className="sticky top-28">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-soil)]">
              New planting claim
            </p>
            <h1 className="font-display mt-4 text-5xl font-semibold leading-tight sm:text-6xl">
              Add a sapling to the verification grove.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[rgba(18,53,34,0.68)]">
              Prepare the `submit_claim` contract call with photo proof, GPS
              grid cell, and XLM stake. Connect wallet in header or form first,
              then submit flow can use wallet address for claim prep.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <SubmitForm />
        </Reveal>
      </div>
    </section>
  );
}
