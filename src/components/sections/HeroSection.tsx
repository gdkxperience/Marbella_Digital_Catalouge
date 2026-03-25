"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative h-[100dvh] flex items-center justify-center bg-charcoal overflow-hidden">
      {/* Subtle animated grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial gradient accent */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(180,160,130,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Thin decorative lines */}
      <div className="absolute top-12 left-12 right-12 bottom-12 pointer-events-none hidden md:block">
        <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />
        <div className="absolute top-0 bottom-0 left-0 w-px bg-white/[0.06]" />
        <div className="absolute top-0 bottom-0 right-0 w-px bg-white/[0.06]" />
      </div>

      {/* Content */}
      <div className="relative text-center px-6">
        {/* Year / Edition tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/25 mb-8 md:mb-12"
        >
          Collection 2026
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[13vw] sm:text-7xl md:text-8xl lg:text-[9rem] font-extralight tracking-[0.3em] md:tracking-[0.4em] text-white leading-none"
        >
          {t("title")}
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-16 md:w-24 h-px bg-white/20 mx-auto mt-6 md:mt-8 origin-center"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-xs sm:text-sm md:text-base tracking-[0.4em] text-white/40 mt-4 md:mt-6"
        >
          {t("subtitle")}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="text-[11px] sm:text-xs tracking-[0.15em] text-white/25 mt-10 md:mt-16 max-w-md mx-auto leading-relaxed"
        >
          {t("tagline")}
        </motion.p>

        {/* Scroll CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-16 md:mt-24"
        >
          <a
            href="#products"
            className="group inline-flex flex-col items-center gap-3"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/20 group-hover:text-white/40 transition-colors duration-500">
              {t("cta")}
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                className="w-4 h-4 text-white/15"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 14l-7 7m0 0l-7-7"
                />
              </svg>
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
