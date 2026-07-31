#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

: "${ROOT_DIR:?}"
if [[ -f "${ROOT_DIR}/.env" ]]; then
  # shellcheck disable=SC1090
  source "${ROOT_DIR}/.env"
fi

: "${ADMIN_IDENTITY:?Set ADMIN_IDENTITY to funded testnet identity name or secret}"
: "${VERIFIER_1:?Set VERIFIER_1 to verifier address}"
: "${VERIFIER_2:?Set VERIFIER_2 to verifier address}"
: "${VERIFIER_3:?Set VERIFIER_3 to verifier address}"

RPC_URL="${RPC_URL:-https://soroban-testnet.stellar.org}"
NETWORK_PASSPHRASE="${NETWORK_PASSPHRASE:-Test SDF Network ; September 2015}"

resolve_address() {
  local identity_or_address="$1"
  if [[ "${identity_or_address}" == G* ]]; then
    printf '%s\n' "${identity_or_address}"
  else
    stellar keys public-key "${identity_or_address}"
  fi
}

cd "${SCRIPT_DIR}"

BUILD_OUTPUT="$(
stellar contract build \
  --manifest-path Cargo.toml \
  --out-dir target \
  --optimize
)"

WASM_FILE="$(printf '%s\n' "${BUILD_OUTPUT}" | awk -F': ' '/Wasm File:/ {print $2; exit}')"
WASM_HASH="$(printf '%s\n' "${BUILD_OUTPUT}" | awk -F': ' '/Wasm Hash:/ {print $2; exit}')"
if [[ -z "${WASM_FILE}" ]]; then
  WASM_FILE="$(find target -name '*.wasm' | head -n 1)"
fi
if [[ -z "${WASM_HASH}" && -f "${WASM_FILE}" ]]; then
  WASM_HASH="$(shasum -a 256 "${WASM_FILE}" | awk '{print $1}')"
fi
WASM_FILE_ENV="contract/${WASM_FILE#./}"
if [[ -z "${WASM_FILE}" ]]; then
  echo "No wasm file found after build." >&2
  exit 1
fi

ADMIN_ADDRESS="$(resolve_address "${ADMIN_IDENTITY}")"
VERIFIER_1_ADDRESS="$(resolve_address "${VERIFIER_1}")"
VERIFIER_2_ADDRESS="$(resolve_address "${VERIFIER_2}")"
VERIFIER_3_ADDRESS="$(resolve_address "${VERIFIER_3}")"

CONTRACT_ID="$(
stellar contract deploy \
  --wasm "${WASM_FILE}" \
  --source-account "${ADMIN_IDENTITY}" \
  --network testnet \
  --rpc-url "${RPC_URL}" \
  --network-passphrase "${NETWORK_PASSPHRASE}" \
  --alias tree-planting-verification
)"

echo "Contract ID: ${CONTRACT_ID}"

stellar contract invoke \
  --id "${CONTRACT_ID}" \
  --source-account "${ADMIN_IDENTITY}" \
  --network testnet \
  --rpc-url "${RPC_URL}" \
  --network-passphrase "${NETWORK_PASSPHRASE}" \
  -- \
  init \
  --admin "${ADMIN_ADDRESS}" \
  --verifiers "[\"${VERIFIER_1_ADDRESS}\", \"${VERIFIER_2_ADDRESS}\", \"${VERIFIER_3_ADDRESS}\"]"

echo "Initialized contract: ${CONTRACT_ID}"

ENV_FILE="${ROOT_DIR}/.env"
TMP_ENV_FILE="$(mktemp)"

touch "${ENV_FILE}"

update_env_value() {
  local key="$1"
  local value="$2"
  if grep -q "^${key}=" "${ENV_FILE}"; then
    awk -v key="${key}" -v value="${value}" '
      $0 ~ "^" key "=" { print key "=" value; next }
      { print }
    ' "${ENV_FILE}" > "${TMP_ENV_FILE}"
  else
    {
      cat "${ENV_FILE}"
      printf '%s=%s\n' "${key}" "${value}"
    } > "${TMP_ENV_FILE}"
  fi
  mv "${TMP_ENV_FILE}" "${ENV_FILE}"
}

update_env_value "ADMIN_IDENTITY" "${ADMIN_IDENTITY}"
update_env_value "ADMIN_ADDRESS" "${ADMIN_ADDRESS}"
update_env_value "VERIFIER_1" "${VERIFIER_1}"
update_env_value "VERIFIER_1_ADDRESS" "${VERIFIER_1_ADDRESS}"
update_env_value "VERIFIER_2" "${VERIFIER_2}"
update_env_value "VERIFIER_2_ADDRESS" "${VERIFIER_2_ADDRESS}"
update_env_value "VERIFIER_3" "${VERIFIER_3}"
update_env_value "VERIFIER_3_ADDRESS" "${VERIFIER_3_ADDRESS}"
update_env_value "CONTRACT_NAME" "tree-planting-verification"
update_env_value "CONTRACT_ID" "${CONTRACT_ID}"
update_env_value "NEXT_PUBLIC_CONTRACT_ID" "${CONTRACT_ID}"
update_env_value "CONTRACT_WASM_FILE" "${WASM_FILE_ENV}"
update_env_value "CONTRACT_WASM_HASH" "${WASM_HASH}"
update_env_value "RPC_URL" "${RPC_URL}"
update_env_value "NEXT_PUBLIC_RPC_URL" "${RPC_URL}"
update_env_value "NETWORK_PASSPHRASE" "\"${NETWORK_PASSPHRASE}\""
update_env_value "STELLAR_NETWORK" "testnet"

echo "Wrote ${ROOT_DIR}/.env"
