"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function DiscountPopup() {
  const t = useTranslations("popup");
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed or submitted
    if (typeof window !== "undefined") {
      const dismissed = localStorage.getItem("marbella_popup_dismissed");
      if (dismissed) return;
    }

    const timer = setTimeout(() => setShow(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setShow(false);
      setClosing(false);
      localStorage.setItem("marbella_popup_dismissed", "true");
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: Send email to your backend/Supabase/Mailchimp
    setSubmitted(true);
    localStorage.setItem("marbella_popup_dismissed", "true");
    setTimeout(() => {
      setClosing(true);
      setTimeout(() => {
        setShow(false);
        setClosing(false);
      }, 300);
    }, 2500);
  };

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center px-4 transition-opacity duration-300 ${
        closing ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-white w-full max-w-md overflow-hidden transition-all duration-300 ${
          closing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 text-foreground/40 hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Top accent line */}
        <div className="h-px bg-foreground/10" />

        <div className="px-8 py-12 md:px-12 md:py-14 text-center">
          {/* Diamond icon */}
          <p className="text-foreground/20 text-sm mb-6">◆</p>

          {/* Brand name */}
          <p className="text-[10px] tracking-[0.5em] uppercase text-foreground/40 mb-4">
            MARBELLA
          </p>

          {!submitted ? (
            <>
              {/* Headline */}
              <h3 className="text-2xl md:text-3xl font-extralight tracking-[0.1em] text-foreground mb-3">
                {t("title")}
              </h3>

              {/* Discount badge */}
              <p className="text-4xl md:text-5xl font-extralight tracking-[0.15em] text-foreground mb-4">
                10%
              </p>

              {/* Description */}
              <p className="text-xs text-foreground/60 leading-[1.9] tracking-wide max-w-xs mx-auto mb-8">
                {t("description")}
              </p>

              {/* Email form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-xs mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("placeholder")}
                  required
                  className="w-full px-4 py-3 text-xs tracking-wide border border-foreground/10 bg-transparent text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-3 text-[10px] tracking-[0.25em] uppercase bg-charcoal text-white hover:bg-foreground transition-colors duration-300"
                >
                  {t("submit")}
                </button>
              </form>

              {/* Privacy note */}
              <p className="text-[10px] text-foreground/30 tracking-wide mt-4">
                {t("privacy")}
              </p>
            </>
          ) : (
            /* Success state */
            <>
              <h3 className="text-2xl font-extralight tracking-[0.1em] text-foreground mb-3">
                {t("thankYou")}
              </h3>
              <p className="text-xs text-foreground/60 leading-[1.9] tracking-wide">
                {t("successMessage")}
              </p>
            </>
          )}
        </div>

        {/* Bottom accent line */}
        <div className="h-px bg-foreground/10" />
      </div>
    </div>
  );
}
