import Link from "next/link";
import type { Claim } from "@/lib/claims";
import { ClaimPhotoFrame } from "./ClaimPhotoFrame";
import { StatusBadge } from "./StatusBadge";

export function ClaimCard({ claim }: { claim: Claim }) {
  return (
    <Link
      href={`/claim/${claim.id}`}
      className="focus-ring group earth-panel block min-w-0 overflow-hidden rounded-[8px] transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[rgba(18,53,34,0.15)]"
    >
      <ClaimPhotoFrame
        photoUri={claim.photoUri}
        caption={claim.photoUri || claim.photoHash || "Photo not stored yet"}
      >
        <div className="absolute left-4 top-4">
          <StatusBadge status={claim.status} />
        </div>
      </ClaimPhotoFrame>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-display text-2xl font-semibold">Claim #{claim.id}</p>
            <p
              className="mt-1 truncate text-sm text-[rgba(18,53,34,0.68)]"
              title={claim.gridCell}
            >
              {claim.gridCell}
            </p>
          </div>
          <p className="shrink-0 rounded-full bg-[rgba(18,53,34,0.08)] px-3 py-1 text-sm font-bold">
            {claim.stakeAmount} XLM
          </p>
        </div>
        <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
          <div className="min-w-0">
            <p className="text-[rgba(18,53,34,0.52)]">Planter</p>
            <p className="truncate font-semibold leading-5" title={claim.planter}>
              {claim.planter}
            </p>
          </div>
          <div className="min-w-0">
            <p className="text-[rgba(18,53,34,0.52)]">Votes</p>
            <p className="truncate font-semibold leading-5" title={`${claim.votes.approve} approve / ${claim.votes.reject} reject`}>
              {claim.votes.approve} approve / {claim.votes.reject} reject
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
