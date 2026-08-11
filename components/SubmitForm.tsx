"use client";

import { useState } from "react";
import { Address, Contract, Networks, TransactionBuilder, nativeToScVal, rpc } from "@stellar/stellar-sdk";
import { Camera, Crosshair, LoaderCircle, Send } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";
import { useWallet } from "@/components/WalletProvider";
import { savePendingClaim } from "@/lib/pending-claims";

export function SubmitForm() {
  const reduceMotion = useReducedMotion();
  const { publicKey, isConnected, isConnecting, error, connect } = useWallet();
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUri, setPhotoUri] = useState("");
  const [gridCell, setGridCell] = useState("");
  const [stake, setStake] = useState("5");
  const [status, setStatus] = useState<
    "idle" | "locating" | "uploading" | "ready" | "sending" | "sent"
  >("idle");
  const [message, setMessage] = useState("");
  const valid = photo && gridCell.trim().length > 3 && Number(stake) > 0 && isConnected;
  const contractId = process.env.NEXT_PUBLIC_CONTRACT_ID;
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
  const networkPassphrase = process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE ?? Networks.TESTNET;

  function captureGps() {
    setStatus("locating");
    if (!navigator.geolocation) {
      setStatus("idle");
      setMessage("GPS is unavailable in this browser. Enter the grid cell manually.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGridCell(
          `${position.coords.latitude.toFixed(4)},${position.coords.longitude.toFixed(4)}`,
        );
        setStatus("ready");
      },
      () => {
        setStatus("idle");
        setMessage("GPS permission was denied. Enter the grid cell manually.");
      },
    );
  }

  async function selectPhoto(file: File | null) {
    setPhoto(file);
    setPhotoUri("");
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isConnected) {
      setMessage("Connect wallet first. Stellar Wallets Kit handles wallet selection.");
      return;
    }

    if (!valid) return;
    setStatus("uploading");
    setMessage("");

    if (!contractId || !rpcUrl || !publicKey) {
      setStatus("ready");
      setMessage("Wallet, contract, or RPC config missing.");
      return;
    }

    try {
      if (!photo) {
        throw new Error("Photo file missing.");
      }

      const uploadForm = new FormData();
      uploadForm.set("file", photo, photo.name);

      const uploadResponse = await fetch("/api/upload-photo", {
        method: "POST",
        body: uploadForm,
      });
      const uploadPayload = (await uploadResponse.json()) as {
        photoUri?: string;
        photoUrl?: string;
        error?: string;
      };

      if (!uploadResponse.ok) {
        throw new Error(uploadPayload.error ?? "Pinata upload failed.");
      }

      const uploadedPhotoUri = uploadPayload.photoUri ?? "";
      if (!uploadedPhotoUri) {
        throw new Error("Pinata upload returned no image URI.");
      }

      setPhotoUri(uploadedPhotoUri);
      setStatus("sending");

      const server = new rpc.Server(rpcUrl);
      const source = await server.getAccount(publicKey);
      const contract = new Contract(contractId);
      const transaction = new TransactionBuilder(source, {
        fee: "100",
        networkPassphrase,
      })
        .addOperation(
          contract.call(
            "submit_claim",
            new Address(publicKey).toScVal(),
            nativeToScVal(uploadedPhotoUri),
            nativeToScVal(gridCell),
            nativeToScVal(BigInt(Number(stake) * 10_000_000), { type: "i128" }),
          ),
        )
        .setTimeout(30)
        .build();

      const preparedTransaction = await server.prepareTransaction(transaction);
      const { signedTxXdr } = await StellarWalletsKit.signTransaction(
        preparedTransaction.toXDR(),
        {
          networkPassphrase,
          address: publicKey,
        },
      );

      const signedTransaction = TransactionBuilder.fromXDR(signedTxXdr, networkPassphrase);
      const submitResponse = await fetch("/api/submit-claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signedTxXdr: signedTransaction.toXDR() }),
      });
      const submitPayload = (await submitResponse.json()) as {
        hash?: string;
        status?: string;
        error?: string;
      };

      if (!submitResponse.ok) {
        throw new Error(submitPayload.error ?? "Contract submission failed.");
      }

      savePendingClaim({
        id: -Date.now(),
        planter: publicKey,
        photoUri: uploadedPhotoUri,
        photoHash: uploadedPhotoUri,
        gridCell,
        status: "Pending",
        stakeAmount: Number(stake),
        timestamp: Math.floor(Date.now() / 1000),
        expiryLedger: 0,
        votes: { approve: 0, reject: 0 },
        txHash: submitPayload.hash ?? "",
      });

      setStatus("sent");
      setMessage(
        `Wallet signed. Network accepted tx${submitPayload.hash ? `: ${submitPayload.hash}` : "."}`,
      );
    } catch (submitError) {
      setStatus("ready");
      setMessage(
        submitError instanceof Error ? submitError.message : "Claim signing failed.",
      );
    }
  }

  return (
    <form onSubmit={submit} className="earth-panel rounded-[8px] p-5 sm:p-8">
      <div className="grid gap-6">
        <div className="rounded-[8px] border border-[rgba(18,53,34,0.12)] bg-[rgba(18,53,34,0.04)] p-4">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-soil)]">
            Wallet
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[rgba(18,53,34,0.68)]">
              {isConnected && publicKey
                ? `Connected: ${publicKey.slice(0, 6)}...${publicKey.slice(-6)}`
                : "No wallet connected yet."}
            </p>
            {isConnected ? null : (
              <button
                type="button"
                onClick={() => void connect()}
                disabled={isConnecting}
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-amber)] px-5 py-3 font-bold text-[var(--color-forest)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isConnecting ? <LoaderCircle className="animate-spin" size={18} /> : <Send size={18} />}
                {isConnecting ? "Opening wallet" : "Connect wallet"}
              </button>
            )}
          </div>
          {error ? (
            <p className="mt-3 text-sm font-semibold text-[var(--color-soil)]">Wallet error: {error}</p>
          ) : null}
        </div>

        <label className="grid gap-3">
          <span className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-soil)]">
            Photo proof
          </span>
          <div className="rounded-[8px] border border-dashed border-[rgba(18,53,34,0.28)] bg-[rgba(247,240,223,0.55)] p-6">
            <input
              type="file"
              accept="image/*"
              onChange={(event) => void selectPhoto(event.target.files?.[0] ?? null)}
              className="focus-ring w-full rounded-[8px] text-sm"
            />
            <p className="mt-3 text-sm text-[rgba(18,53,34,0.62)]">
              {photo ? photo.name : "Upload a clear sapling photo from the planting site."}
            </p>
          </div>
        </label>

        <label className="grid gap-3">
          <span className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-soil)]">
            GPS grid cell
          </span>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={gridCell}
              onChange={(event) => setGridCell(event.target.value)}
              placeholder="lat,lng rounded to 4 decimals"
              className="focus-ring focus:ring-2 focus:ring-forest min-h-12 flex-1 rounded-[8px] border border-[rgba(18,53,34,0.18)] bg-[rgba(255,251,235,0.72)] px-4"
            />
            <button 
              type="button"
              onClick={captureGps}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-moss)] px-5 py-3 font-bold text-[var(--color-cream)]"
            >
              {status === "locating" ? <LoaderCircle className="animate-spin" size={18} /> : <Crosshair size={18} />}
              Capture GPS
            </button>
          </div>
        </label>

        <label className="grid gap-3">
          <span className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-soil)]">
            Stake amount
          </span>
          <input
            value={stake}
            onChange={(event) => setStake(event.target.value)}
            type="number"
            min="1"
            step="1"
            className="focus-ring focus:ring-2 focus:ring-forest min-h-12 rounded-[8px] border border-[rgba(18,53,34,0.18)] bg-[rgba(255,251,235,0.72)] px-4"
          />
        </label>
      </div>

      <motion.div
        className="mt-8 rounded-[8px] bg-[rgba(18,53,34,0.08)] p-4 text-sm leading-6"
        animate={valid && !reduceMotion ? { scale: [1, 1.015, 1] } : { scale: 1 }}
      >
        <p className="font-bold">Contract call preview</p>
        <p className="break-all text-[rgba(18,53,34,0.68)]">
          submit_claim(planter, {photoUri || "photo_uri"}, {gridCell || "grid_cell"},{" "}
          {Number(stake || 0) * 10_000_000} stroops) on {contractId}
        </p>
      </motion.div>

      <button
        disabled={!valid || status === "uploading" || status === "sending"}
        data-loading={status === "uploading" || status === "sending"}
        className="focus-ring mt-6 inline-flex data-[loading=true]:animate-pulse w-full items-center justify-center gap-2 rounded-full bg-[var(--color-forest)] px-6 py-4 font-bold text-[var(--color-cream)] transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45"
      >
        {status === "uploading" || status === "sending" ? (
          <LoaderCircle className="animate-spin" size={18} />
        ) : status === "sent" ? (
          <Camera size={18} />
        ) : (
          <Send size={18} />
        )}
        {status === "uploading"
          ? "Uploading to Pinata"
          : status === "sending"
            ? "Broadcasting to testnet"
          : !isConnected
            ? "Connect wallet first"
          : status === "sent"
            ? "Claim signed and submitted"
            : "Sign and submit claim"}
      </button>
      {message ? (
        <p className="mt-4 rounded-[8px] bg-[rgba(229,168,58,0.18)] p-4 text-sm font-semibold text-[var(--color-forest)]">
          {message}
        </p>
      ) : null}
    </form>
  );
}
