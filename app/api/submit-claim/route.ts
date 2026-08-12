import { NextResponse } from "next/server";
import { Networks, TransactionBuilder, rpc } from "@stellar/stellar-sdk";

export const runtime = "nodejs";

type SubmitClaimBody = {
  signedTxXdr?: string;
};

export async function POST(request: Request) {
  let body: SubmitClaimBody;
  try {
    body = (await request.json()) as SubmitClaimBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.signedTxXdr) {
    return NextResponse.json({ error: "Signed transaction XDR is required." }, { status: 400 });
  }

  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL ?? process.env.RPC_URL;
  const networkPassphrase = process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE ?? Networks.TESTNET;

  if (!rpcUrl) {
    return NextResponse.json({ error: "RPC URL is not configured." }, { status: 500 });
  }

  try {
    const server = new rpc.Server(rpcUrl);
    const transaction = TransactionBuilder.fromXDR(body.signedTxXdr, networkPassphrase);
    const result = await server.sendTransaction(transaction);

    return NextResponse.json({
      hash: result.hash,
      status: result.status,
      latestLedger: result.latestLedger,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to submit transaction.",
      },
      { status: 500 },
    );
  }
}
