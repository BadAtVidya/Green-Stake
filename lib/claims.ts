import {
  Contract,
  Networks,
  TransactionBuilder,
  rpc,
  scValToNative,
} from "@stellar/stellar-sdk";

export type ClaimStatus =
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Paid"
  | "Cancelled"
  | "Expired";

export type Claim = {
  id: number;
  planter: string;
  photoUri: string;
  photoHash?: string;
  gridCell: string;
  status: ClaimStatus;
  stakeAmount: number;
  timestamp: number;
  expiryLedger: number;
  votes: {
    approve: number;
    reject: number;
  };
};

export async function getClaims(): Promise<{
  claims: Claim[];
  source: "live" | "empty";
  error?: string;
}> {
  const contractId = process.env.NEXT_PUBLIC_CONTRACT_ID ?? process.env.CONTRACT_ID;
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL ?? process.env.RPC_URL;
  const admin = process.env.ADMIN_ADDRESS;

  if (!contractId || !rpcUrl || !admin) {
    return {
      claims: [],
      source: "empty",
      error: "Contract environment is not configured.",
    };
  }

  try {
    const server = new rpc.Server(rpcUrl);
    const source = await server.getAccount(admin);
    const contract = new Contract(contractId);
    const transaction = new TransactionBuilder(source, {
      fee: "100",
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(contract.call("list_claims"))
      .setTimeout(30)
      .build();

    const simulation = await server.simulateTransaction(transaction);
    if (!rpc.Api.isSimulationSuccess(simulation) || !simulation.result?.retval) {
      return {
        claims: [],
        source: "empty",
        error: "Contract list_claims simulation returned no claim data.",
      };
    }

    const liveClaims = scValToNative(simulation.result.retval) as unknown[];
    const claims = liveClaims.map(normalizeClaim);
    return { claims, source: "live" };
  } catch (error) {
    return {
      claims: [],
      source: "empty",
      error: error instanceof Error ? error.message : "Contract data is unavailable.",
    };
  }
}

export async function getClaimById(id: number) {
  const { claims } = await getClaims();
  return claims.find((claim) => claim.id === id);
}

function normalizeClaim(value: unknown, index: number): Claim {
  const record = value as Record<string, unknown>;
  const photoUri = String(record.photo_uri ?? record.photoUrl ?? "");
  return {
    id: index + 1,
    planter: shortAddress(String(record.planter ?? "unknown")),
    photoUri,
    photoHash: String(record.photo_hash ?? record.photoHash ?? "pending"),
    gridCell: String(record.grid_cell ?? record.gridCell ?? "unmapped"),
    status: normalizeStatus(record.status),
    stakeAmount: Number(record.stake_amount ?? record.stakeAmount ?? 0) / 10_000_000,
    timestamp: Number(record.timestamp ?? Date.now() / 1000),
    expiryLedger: Number(record.expiry_ledger ?? record.expiryLedger ?? 0),
    votes: { approve: 0, reject: 0 },
  };
}

function normalizeStatus(value: unknown): ClaimStatus {
  const status = String(value ?? "Pending").replace(/"/g, "") as ClaimStatus;
  const allowed: ClaimStatus[] = [
    "Pending",
    "Approved",
    "Rejected",
    "Paid",
    "Cancelled",
    "Expired",
  ];
  return allowed.includes(status) ? status : "Pending";
}

function shortAddress(address: string) {
  if (address.length < 12) return address;
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}
