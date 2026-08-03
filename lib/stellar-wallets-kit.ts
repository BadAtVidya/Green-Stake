import {
  LocalStorageKeys,
  KitEventType,
  Networks,
  StellarWalletsKit,
} from "@creit.tech/stellar-wallets-kit";
import { defaultModules } from "@creit.tech/stellar-wallets-kit/modules/utils";

let initialized = false;

export function initWalletKit() {
  if (initialized) return;

  StellarWalletsKit.init({
    network: Networks.TESTNET,
    modules: defaultModules(),
    authModal: {
      showInstallLabel: true,
      hideUnsupportedWallets: false,
    },
  });

  initialized = true;
}

export { KitEventType, LocalStorageKeys, Networks, StellarWalletsKit };
