import type { ClaimStatus } from "@/lib/claims";

const styles: Record<ClaimStatus, string> = {
  Pending: "bg-[#fbbf24] text-[#78350f] border border-[#f59e0b]",
  Approved: "bg-[#cce6a8] text-[#214116]",
  Rejected: "bg-[#e7ad92] text-[#552414]",
  Paid: "bg-[#b5dfc4] text-[#123522]",
  Cancelled: "bg-[#d8cfbb] text-[#4b4031]",
  Expired: "bg-[#c9d2d0] text-[#263f3a]",
};

export function StatusBadge({ status }: { status: ClaimStatus }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${styles[status]}`}>
      {status}
    </span>
  );
}
