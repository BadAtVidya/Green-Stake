import { beforeEach, afterEach, test } from "node:test";
import assert from "node:assert/strict";

import {
  clearMatchedPendingClaims,
  fingerprintClaim,
  loadPendingClaims,
  savePendingClaim,
  type PendingClaim,
} from "@/lib/pending-claims";
import { normalizeGatewayHost, resolvePhotoUrl } from "@/lib/pinata";

const originalEnv = {
  NEXT_PUBLIC_PINATA_GATEWAY: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
  PINATA_GATEWAY: process.env.PINATA_GATEWAY,
};

let storage: Map<string, string>;

beforeEach(() => {
  storage = new Map<string, string>();
  globalThis.window = {
    localStorage: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => {
        storage.set(key, value);
      },
      removeItem: (key: string) => {
        storage.delete(key);
      },
    },
  } as typeof window;
});

afterEach(() => {
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: undefined,
  });
  process.env.NEXT_PUBLIC_PINATA_GATEWAY = originalEnv.NEXT_PUBLIC_PINATA_GATEWAY;
  process.env.PINATA_GATEWAY = originalEnv.PINATA_GATEWAY;
});

test("normalizeGatewayHost trims protocol and trailing slash", () => {
  assert.equal(normalizeGatewayHost("https://example.gateway.io///"), "example.gateway.io");
  assert.equal(normalizeGatewayHost(""), "gateway.pinata.cloud");
});

test("resolvePhotoUrl keeps http url and expands ipfs path", () => {
  process.env.NEXT_PUBLIC_PINATA_GATEWAY = "custom.gateway.io/";

  assert.equal(resolvePhotoUrl("https://example.com/photo.jpg"), "https://example.com/photo.jpg");
  assert.equal(
    resolvePhotoUrl("ipfs://bafy123"),
    "https://custom.gateway.io/ipfs/bafy123",
  );
});

test("fingerprintClaim joins claim fields in stable order", () => {
  assert.equal(
    fingerprintClaim({
      planter: "GABC",
      photoUri: "ipfs://cid",
      gridCell: "23.67, 86.96",
      stakeAmount: 5,
    }),
    "GABC|ipfs://cid|23.67, 86.96|5",
  );
});

test("pending claim cache saves, loads, and clears matched claims", () => {
  const claim: PendingClaim = {
    id: -1,
    planter: "GPLANTER",
    photoUri: "ipfs://cid-1",
    photoHash: "pending",
    gridCell: "23.1,86.1",
    status: "Pending",
    stakeAmount: 5,
    timestamp: 1710000000,
    expiryLedger: 999,
    votes: { approve: 0, reject: 0 },
    txHash: "tx-1",
  };

  savePendingClaim(claim);
  assert.equal(loadPendingClaims().length, 1);

  savePendingClaim({ ...claim, txHash: "tx-1", gridCell: "23.1,86.2" });
  assert.equal(loadPendingClaims().length, 1);
  assert.equal(loadPendingClaims()[0]?.gridCell, "23.1,86.2");

  const remaining = clearMatchedPendingClaims([
    {
      ...claim,
      gridCell: "23.1,86.2",
    },
  ]);

  assert.equal(remaining.length, 0);
  assert.equal(loadPendingClaims().length, 0);
});
