"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { ClaimPhotoFrame } from "@/components/ClaimPhotoFrame";
import { Reveal } from "@/components/Reveal";
import { StatusBadge } from "@/components/StatusBadge";
import { loadPendingClaims } from "@/lib/pending-claims";

export function ClaimPendingClient({ id }: { id: number }) {
  const claim = useMemo(
    () => loadPendingClaims().find((item) => item.id === id) ?? null,
    [id],
  );

  const timeline = useMemo(
    () => [
      { label: "Submitted", active: true },
      { label: "Verifier review", active: true },
      { label: "Approved", active: false },
      { label: "Paid", active: false },
    ],
    [],
  );

  if (!claim) {
    return (
      <section className="px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/dashboard"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-[rgba(18,53,34,0.08)] px-4 py-2 text-sm font-bold"
          >
            <ArrowLeft size={16} /> Dashboard
          </Link>
          <div className="earth-panel mt-8 rounded-[8px] p-8">
            <p className="font-display text-3xl font-semibold">Pending claim not loaded.</p>
            <p className="mt-3 text-[rgba(18,53,34,0.68)]">
              This claim exists in local submission cache, but browser has not restored it yet.
              Refresh dashboard or return after submit.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/dashboard"
          className="focus-ring inline-flex items-center gap-2 rounded-full bg-[rgba(18,53,34,0.08)] px-4 py-2 text-sm font-bold"
        >
          <ArrowLeft size={16} /> Dashboard
        </Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="earth-panel overflow-hidden rounded-[8px]">
              <ClaimPhotoFrame
                photoUri={claim.photoUri}
                caption={claim.photoUri || claim.photoHash || "Photo not stored yet"}
              >
                <div className="absolute left-5 top-5">
                  <StatusBadge status={claim.status} />
                </div>
              </ClaimPhotoFrame>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="earth-panel rounded-[8px] p-7">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-soil)]">
                    Pending claim
                  </p>
                  <h1 className="font-display mt-3 text-5xl font-semibold">Claim #{claim.id}</h1>
                </div>
                <StatusBadge status={claim.status} />
              </div>
              <div className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
                <Detail label="Grid cell" value={claim.gridCell} />
                <Detail label="Stake" value={`${claim.stakeAmount} XLM`} />
                <Detail label="Planter" value={claim.planter} />
                <Detail label="Photo URI" value={claim.photoUri || claim.photoHash || "pending"} />
                <Detail label="Tx hash" value={claim.txHash} />
                <Detail label="Status" value={claim.status} />
              </div>
              <div className="mt-8">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-soil)]">
                  Status timeline
                </p>
                <div className="mt-5 grid gap-3">
                  {timeline.map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <span
                        className={`size-3 rounded-full ${
                          item.active ? "bg-[var(--color-moss)]" : "bg-[rgba(18,53,34,0.18)]"
                        }`}
                      />
                      <span className={item.active ? "font-bold" : "text-[rgba(18,53,34,0.48)]"}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-[8px] bg-[rgba(18,53,34,0.07)] p-4">
      <p className="text-[rgba(18,53,34,0.52)]">{label}</p>
      <p className="mt-1 truncate font-bold leading-5" title={value}>
        {value}
      </p>
    </div>
  );
}
