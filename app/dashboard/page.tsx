import { DashboardClient } from "@/components/DashboardClient";
import { getClaims } from "@/lib/claims";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { claims, source, error } = await getClaims();
  return <DashboardClient claims={claims} source={source} error={error} />;
}
