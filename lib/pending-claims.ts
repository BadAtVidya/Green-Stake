import type { Claim } from "@/lib/claims";

const PENDING_KEY = "greenstake.pendingClaims";

export type PendingClaim = Claim & {
  txHash: string;
};

function hasWindow() {
  return typeof window !== "undefined";
}

export function loadPendingClaims(): PendingClaim[] {
  if (!hasWindow()) return [];

  try {
    const raw = window.localStorage.getItem(PENDING_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as unknown[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(normalizePendingClaim)
      .filter((claim): claim is PendingClaim => claim !== null);
  } catch {
    return [];
  }
}

export function savePendingClaim(claim: PendingClaim) {
  if (!hasWindow()) return;

  const current = loadPendingClaims();
  const next = [claim, ...current.filter((item) => item.txHash !== claim.txHash)];
  window.localStorage.setItem(PENDING_KEY, JSON.stringify(next));
}

export function clearMatchedPendingClaims(liveClaims: Claim[]) {
  if (!hasWindow()) return [];

  const liveFingerprints = new Set(liveClaims.map(fingerprintClaim));
  const remaining = loadPendingClaims().filter(
    (claim) => !liveFingerprints.has(fingerprintClaim(claim)),
  );
  window.localStorage.setItem(PENDING_KEY, JSON.stringify(remaining));
  return remaining;
}

export function fingerprintClaim(
  claim: Pick<Claim, "planter" | "photoUri" | "gridCell" | "stakeAmount">,
) {
  return [claim.planter, claim.photoUri, claim.gridCell, claim.stakeAmount].join("|");
}

function normalizePendingClaim(value: unknown): PendingClaim | null {
  if (!value || typeof value !== "object") return null;

  const claim = value as Record<string, unknown>;
  const photoUri = String(claim.photoUri ?? claim.photo_uri ?? "");

  const votes = claim.votes && typeof claim.votes === "object" ? (claim.votes as Record<string, unknown>) : {};

  return {
    id: Number(claim.id ?? -Date.now()),
    planter: String(claim.planter ?? "unknown"),
    photoUri,
    photoHash: String(claim.photoHash ?? claim.photo_hash ?? "pending"),
    gridCell: String(claim.gridCell ?? claim.grid_cell ?? "unmapped"),
    status: String(claim.status ?? "Pending") as PendingClaim["status"],
    stakeAmount: Number(claim.stakeAmount ?? claim.stake_amount ?? 0),
    timestamp: Number(claim.timestamp ?? Date.now() / 1000),
    expiryLedger: Number(claim.expiryLedger ?? claim.expiry_ledger ?? 0),
    votes: {
      approve: Number(votes.approve ?? 0),
      reject: Number(votes.reject ?? 0),
    },
    txHash: String(claim.txHash ?? ""),
  };
}
