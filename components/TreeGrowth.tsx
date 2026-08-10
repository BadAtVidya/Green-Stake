"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function TreeGrowth() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 72%", "end 62%"],
  });
  const trunk = useTransform(scrollYProgress, [0, 0.24, 0.58], [0.12, 0.58, 1]);
  const canopy = useTransform(scrollYProgress, [0.14, 0.38, 0.62], [0, 0.6, 1]);
  const sprout = useTransform(scrollYProgress, [0, 0.16], [1, 0]);

  return (
    <div ref={ref} className="relative min-h-[82vh] py-4 md:min-h-[92vh] md:py-6">
      <div className="sticky top-20 mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl items-center justify-center px-5 sm:px-8">
        <div className="earth-panel relative h-[min(62vh,520px)] min-h-[380px] w-full overflow-hidden rounded-[8px]">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#f7f0df,#dce7cb_58%,#8e6a45_58%,#6e4728)]" />
          <motion.div
            className="absolute bottom-[39%] left-1/2 h-[28%] w-8 origin-bottom -translate-x-1/2 rounded-t-full bg-[var(--color-bark)]"
            style={{ scaleY: reduceMotion ? 1 : trunk }}
          />
          <motion.div
            className="absolute bottom-[58%] left-1/2 grid size-60 -translate-x-1/2 animate-pulse place-items-center rounded-full bg-[var(--color-moss)] sm:size-72 md:size-80"
            style={{ scale: reduceMotion ? 1 : canopy, opacity: reduceMotion ? 1 : canopy }}
          >
            <div className="size-40 rounded-full bg-[var(--color-leaf)] sm:size-52 md:size-56" />
            <div className="absolute left-8 top-20 size-24 rounded-full bg-[#6d963f] sm:size-32" />
            <div className="absolute right-10 top-14 size-28 rounded-full bg-[#759f46] sm:size-36" />
          </motion.div>
          <motion.div
            className="absolute bottom-[39%] left-1/2 h-20 w-16 -translate-x-1/2"
            style={{ opacity: reduceMotion ? 0 : sprout }}
          >
            <div className="mx-auto h-20 w-3 rounded-full bg-[var(--color-moss)]" />
            <div className="absolute left-0 top-6 h-8 w-12 rounded-[80%_20%_80%_20%] bg-[var(--color-leaf)]" />
            <div className="absolute right-0 top-3 h-8 w-12 rounded-[20%_80%_20%_80%] bg-[var(--color-leaf)]" />
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 grid grid-cols-4 border-t border-[rgba(247,240,223,0.22)] bg-[rgba(63,42,29,0.48)] text-[var(--color-cream)] backdrop-blur-sm">
            {["Seed", "Stake", "Verify", "Payout"].map((step) => (
              <div key={step} className="border-r border-[rgba(247,240,223,0.18)] p-5">
                <p className="font-display text-2xl font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
