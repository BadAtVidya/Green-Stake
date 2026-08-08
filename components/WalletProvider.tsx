"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  KitEventType,
  initWalletKit,
  LocalStorageKeys,
  StellarWalletsKit,
} from "@/lib/stellar-wallets-kit";

type WalletContextValue = {
  publicKey: string | null;
  walletId: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
};

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [walletId, setWalletId] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initWalletKit();

    const unsubscribeAddress = StellarWalletsKit.on(
      KitEventType.STATE_UPDATED,
      (event) => {
        setPublicKey(event.payload.address ?? null);
      },
    );
    const unsubscribeSelected = StellarWalletsKit.on(
      KitEventType.WALLET_SELECTED,
      (event: { payload: { id?: string } }) => {
        setWalletId(event.payload.id ?? null);
      },
    );
    const unsubscribeDisconnect = StellarWalletsKit.on(KitEventType.DISCONNECT, () => {
      setPublicKey(null);
      setWalletId(null);
    });

    const storedWalletId = window.localStorage.getItem(LocalStorageKeys.selectedModuleId);
    let active = true;

    async function restore() {
      if (!storedWalletId) return;

      try {
        StellarWalletsKit.setWallet(storedWalletId);
        const { address } = await StellarWalletsKit.getAddress();
        if (!active) return;

        setWalletId(storedWalletId);
        setPublicKey(address);
      } catch {
        window.localStorage.removeItem(LocalStorageKeys.selectedModuleId);
        window.localStorage.removeItem(LocalStorageKeys.activeAddress);
      }
    }

    void restore();

    return () => {
      active = false;
      unsubscribeAddress();
      unsubscribeSelected();
      unsubscribeDisconnect();
    };
  }, []);

  async function connect() {
    initWalletKit();
    setIsConnecting(true);
    setError(null);
    try {
      const { address } = await StellarWalletsKit.authModal();
      const currentWallet = window.localStorage.getItem(LocalStorageKeys.selectedModuleId);
      const activeWallet = currentWallet ?? walletId ?? "unknown";

      setWalletId(activeWallet);
      setPublicKey(address);
    } catch (connectError) {
      setError(connectError instanceof Error ? connectError.message : "Wallet connection failed.");
    } finally {
      setIsConnecting(false);
    }
  }

  async function disconnect() {
    try {
      await StellarWalletsKit.disconnect();
    } finally {
      setWalletId(null);
      setPublicKey(null);
      setError(null);
    }
    window.localStorage.removeItem(LocalStorageKeys.selectedModuleId);
    window.localStorage.removeItem(LocalStorageKeys.activeAddress);
  }

  return (
    <WalletContext.Provider
      value={{
        publicKey,
        walletId,
        isConnected: Boolean(publicKey),
        isConnecting,
        error,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within WalletProvider");
  }
  return context;
}
