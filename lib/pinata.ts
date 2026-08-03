const DEFAULT_GATEWAY = "gateway.pinata.cloud";

export function normalizeGatewayHost(value?: string | null) {
  const raw = (value ?? DEFAULT_GATEWAY).trim();
  if (!raw) return DEFAULT_GATEWAY;
  return raw.replace(/^https?:\/\//, "").replace(/\/+$/, "");
}

export function resolvePhotoUrl(photoUri?: string | null) {
  if (!photoUri) return "";

  const trimmed = photoUri.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  const cid = trimmed
    .replace(/^ipfs:\/\//, "")
    .replace(/^ipfs\//, "")
    .replace(/^\/ipfs\//, "");

  if (!cid) return "";

  const gateway = normalizeGatewayHost(
    process.env.NEXT_PUBLIC_PINATA_GATEWAY ?? process.env.PINATA_GATEWAY,
  );

  return `https://${gateway}/ipfs/${cid}`;
}

