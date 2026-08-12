import { NextResponse } from "next/server";
import { normalizeGatewayHost } from "@/lib/pinata";

export async function POST(request: Request) {
  const jwt = process.env.PINATA_JWT;
  if (!jwt) {
    return NextResponse.json({ error: "PINATA_JWT is not configured." }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Image file is required." }, { status: 400 });
  }

  const pinataFormData = new FormData();
  pinataFormData.set("file", file, file.name);
  pinataFormData.set("network", "public");

  const response = await fetch("https://uploads.pinata.cloud/v3/files", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: pinataFormData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      { error: `Pinata upload failed: ${errorText}` },
      { status: response.status },
    );
  }

  const payload = (await response.json()) as {
    data?: { cid?: string };
    cid?: string;
  };

  const cid = payload.data?.cid ?? payload.cid;
  if (!cid) {
    return NextResponse.json({ error: "Pinata response missing CID." }, { status: 500 });
  }

  const gateway = normalizeGatewayHost(
    process.env.PINATA_GATEWAY ?? process.env.NEXT_PUBLIC_PINATA_GATEWAY,
  );
  const photoUri = `ipfs://${cid}`;
  const photoUrl = `https://${gateway}/ipfs/${cid}`;

  return NextResponse.json({ cid, photoUri, photoUrl });
}

