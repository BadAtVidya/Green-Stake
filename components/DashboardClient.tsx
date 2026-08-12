"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ClaimCard } from "@/components/ClaimCard";
import type { Claim, ClaimStatus } from "@/lib/claims";
import {
  clearMatchedPendingClaims,
  loadPendingClaims,
  type PendingClaim,
} from "@/lib/pending-claims";

const filters: Array<ClaimStatus | "All"> = [
  "All",
  "Pending",
  "Approved",
  "Paid",
  "Expired",
  "Cancelled",
  "Rejected",
];

export function DashboardClient({
  claims,
  source,
  error,
}: {
  claims: Claim[];
  source: "live" | "empty";
  error?: string;
}) {
  const [filter, setFilter] = useState<ClaimStatus | "All">("All");
  const [pendingClaims, setPendingClaims] = useState<PendingClaim[]>(() => loadPendingClaims());

  useEffect(() => {
    let cancelled = false;
    const refreshPendingClaims = () => {
      if (!cancelled) {
        setPendingClaims(clearMatchedPendingClaims(claims));
      }
    };

    window.setTimeout(refreshPendingClaims, 0);
    const interval = window.setInterval(() => {
      refreshPendingClaims();
    }, 2500);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [claims]);

  const visible = useMemo(
    () => {
      const mergedClaims = [...claims, ...pendingClaims];
      return filter === "All"
        ? mergedClaims
        : mergedClaims.filter((claim) => claim.status === filter);
    },
    [claims, filter, pendingClaims],
  );

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-soil)]">
            {source === "live" ? "Live contract feed" : "No claim data yet"}
          </p>
          <h1 className="font-display mt-3 text-5xl font-semibold">Claim canopy</h1>
          <p className="mt-4 max-w-2xl text-[rgba(18,53,34,0.68)]">
            Follow each planting proof from pending vote to paid reward. This
            dashboard now shows only claims returned by the deployed contract.
          </p>
        </div>
        <div className="flex max-w-full gap-2 overflow-x-auto rounded-full bg-[rgba(18,53,34,0.07)] p-2">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`focus-ring shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
                filter === item
                  ? "bg-[var(--color-forest)] text-[var(--color-cream)]"
                  : "text-[rgba(18,53,34,0.68)]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {visible.length > 0 ? (
          visible.map((claim) => (
            <motion.div
              key={claim.id}
              variants={{
                hidden: { opacity: 0, y: 28 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <ClaimCard claim={claim} />
            </motion.div>
          ))
        ) : (
          <motion.div
            className="earth-panel rounded-[8px] p-8 md:col-span-2 xl:col-span-3"
            variants={{
              hidden: { opacity: 0, y: 28 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <p className="font-display text-3xl font-semibold">No contract claims to show.</p>
            <p className="mt-3 max-w-2xl leading-7 text-[rgba(18,53,34,0.68)]">
              Submit a claim and confirm the wallet transaction, then refresh
              this dashboard after the contract stores it. {error ? `Latest read: ${error}` : ""}
              {visible.length === 0 && claims.length > 0 && " (Try adjusting your filters to see more claims)"}
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
