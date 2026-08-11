import type { ReactNode } from "react";
import Image from "next/image";
import { resolvePhotoUrl } from "@/lib/pinata";

export function ClaimPhotoFrame({
  photoUri,
  caption,
  children,
}: {
  photoUri?: string;
  caption?: ReactNode;
  children?: ReactNode;
}) {
  const src = resolvePhotoUrl(photoUri);

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-[linear-gradient(180deg,#dfe9cf,#8fad66_62%,#6f4728_62%)]">
      {src ? (
        <Image
          src={src}
          alt="Claim photo proof"
          fill
          unoptimized
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        <>
          <div className="absolute bottom-[28%] left-1/2 h-24 w-4 -translate-x-1/2 rounded-t-full bg-[var(--color-bark)]" />
          <div className="absolute bottom-[42%] left-1/2 size-28 -translate-x-1/2 rounded-full bg-[var(--color-moss)] transition duration-700 group-hover:scale-105" />
          <div className="absolute bottom-[43%] left-[38%] size-20 rounded-full bg-[var(--color-leaf)]" />
          <div className="absolute bottom-[43%] right-[38%] size-20 rounded-full bg-[#6d963f]" />
          <div className="absolute bottom-0 left-0 right-0 h-[28%] bg-[var(--color-soil)]" />
        </>
      )}
      {children}
      {caption ? (
        <div
          className="absolute bottom-4 left-4 right-4 truncate rounded-[8px] bg-[rgba(247,240,223,0.84)] p-4 text-sm font-bold leading-5 text-[var(--color-forest)]"
          title={typeof caption === "string" ? caption : undefined}
        >
          {caption}
        </div>
      ) : null}
    </div>
  );
}
