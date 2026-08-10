"use client";

import Link from "next/link";
import { ArrowRight, Sprout } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function ForestHero() {
  const reduceMotion = useReducedMotion();
  const sway = reduceMotion ? {} : { y: [0, -8, 0], rotate: [-0.5, 0.5, -0.5] };

  return (
    <section className="relative min-h-[calc(100vh-84px)] overflow-hidden bark-line">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(229,168,58,0.34),transparent_30%),linear-gradient(180deg,#f7f0df_0%,#e4ead6_60%,#d9dfbe_100%)]" />
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-14 z-0 mx-auto h-32 w-32 rounded-full bg-[var(--color-amber)] blur-[1px]"
        animate={reduceMotion ? {} : { opacity: [0.72, 0.92, 0.72], scale: [1, 1.04, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-[9vh] left-[-10%] z-0 h-[36vh] w-[58vw] rounded-t-[100%] bg-[var(--color-forest)]"
        animate={sway}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-[10vh] right-[-14%] z-0 h-[40vh] w-[64vw] rounded-t-[100%] bg-[#214c2d]"
        animate={sway}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <div aria-hidden className="absolute bottom-0 left-0 right-0 z-0 h-[18vh] bg-[var(--color-bark)]" />
      <div aria-hidden className="absolute bottom-[14vh] left-0 right-0 z-0 flex justify-around opacity-80">
        {Array.from({ length: 9 }).map((_, index) => (
          <motion.div
            key={index}
            className="origin-bottom scale-75 sm:scale-90"
            animate={reduceMotion ? {} : { rotate: [-1, 1, -1] }}
            transition={{ duration: 4 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="mx-auto h-24 w-4 rounded-t-full bg-[var(--color-bark)]" />
            <div className="-mt-28 h-40 w-28 rounded-[60%_60%_45%_45%] bg-[var(--color-moss)] shadow-[inset_0_-20px_0_rgba(18,53,34,0.16)]" />
          </motion.div>
        ))}
      </div>
      <div className="relative z-20 mx-auto grid min-h-[calc(100vh-84px)] max-w-7xl items-center gap-10 px-5 py-14 pb-32 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24">
        <div className="rounded-[8px] bg-[rgba(247,240,223,0.42)] p-1 backdrop-blur-[2px] sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
          <motion.p
            className="mb-5 inline-flex rounded-full bg-[rgba(247,240,223,0.72)] px-4 py-2 text-sm font-bold text-[var(--color-forest)]"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Reforestation proofs on Stellar testnet
          </motion.p>
          <motion.h1
            className="font-display max-w-3xl text-5xl font-semibold leading-[0.95] text-[var(--color-forest)] drop-shadow-md sm:text-7xl lg:text-8xl"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            Stake a sapling. Verify a forest.
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-lg leading-8 text-[rgba(18,53,34,0.74)]"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
          >
            GreenStake turns each planting claim into a small on-chain promise:
            photo proof, GPS grid, verifier votes, and an XLM reward when the
            community confirms growth.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
          >
            <Link
              href="/submit"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-forest)] px-6 py-4 font-bold text-[var(--color-cream)] transition hover:-translate-y-0.5"
            >
              Submit claim <Sprout size={18} />
            </Link>
            <Link
              href="/dashboard"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[rgba(247,240,223,0.8)] px-6 py-4 font-bold text-[var(--color-forest)] transition hover:-translate-y-0.5"
            >
              View dashboard <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="earth-panel relative min-h-[360px] overflow-hidden rounded-[8px] p-6 sm:min-h-[420px] sm:p-8"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.22, duration: 0.7 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_30%,rgba(229,168,58,0.3),transparent_24%)]" />
          <div className="relative flex h-full min-h-[360px] items-end justify-center">
            <motion.div
              className="h-64 w-7 rounded-t-full bg-[var(--color-bark)]"
              animate={reduceMotion ? {} : { scaleY: [0.96, 1.02, 0.96] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            {["-translate-x-24 -rotate-12", "translate-x-24 rotate-12", "-translate-x-10 -rotate-6", "translate-x-10 rotate-6"].map(
              (className, index) => (
                <motion.div
                  key={className}
                  className={`absolute bottom-36 h-36 w-28 origin-bottom rounded-[70%_30%_65%_35%] bg-[var(--color-moss)] ${className}`}
                  animate={reduceMotion ? {} : { rotate: index % 2 ? [10, 14, 10] : [-10, -14, -10] }}
                  transition={{ duration: 4 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
                />
              ),
            )}
            <div className="absolute bottom-0 h-16 w-72 rounded-t-[100%] bg-[var(--color-soil)]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
