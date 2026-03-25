"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer id="contact" className="bg-charcoal text-white">
      {/* Top decorative line */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-10 md:pb-14">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20 md:mb-28">
          {/* Brand — large */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-8">
              <h3 className="text-3xl md:text-4xl font-extralight tracking-[0.25em]">
                MARBELLA
              </h3>
              <p className="text-[9px] tracking-[0.45em] text-white/30 -mt-0.5">
                DESIGN & DECOR
              </p>
            </Link>
            <p className="text-xs text-white/25 leading-[2] max-w-xs tracking-wide">
              {t("disclaimer")}
            </p>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-white/20 mb-6">
              Contact
            </h4>
            <div className="space-y-3">
              <p className="text-sm text-white/50 tracking-wide">
                {t("address")}
              </p>
              <a
                href={`tel:${t("phone").replace(/\s/g, "")}`}
                className="block text-sm text-white/50 tracking-wide hover:text-white/80 transition-colors"
              >
                {t("phone")}
              </a>
              <a
                href={`mailto:${t("email")}`}
                className="block text-sm text-white/50 tracking-wide hover:text-white/80 transition-colors"
              >
                {t("email")}
              </a>
            </div>
          </div>

          {/* Website */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-white/20 mb-6">
              Online
            </h4>
            <a
              href="https://marbelladd.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/50 tracking-wide hover:text-white/80 transition-colors"
            >
              marbelladd.com
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="h-px bg-white/5 mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-white/15 tracking-[0.1em]">
            &copy; {new Date().getFullYear()} Marbella Design & Decor. {t("rights")}
          </p>
          <p className="text-[10px] text-white/10 tracking-[0.1em]">
            Collection 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
