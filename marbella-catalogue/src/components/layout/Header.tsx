"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  // Show/hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      setHidden(y > lastScroll && y > 400);
      setLastScroll(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as "bg" | "en" });
  };

  const navItems = [
    { id: "products", label: t("products") },
    { id: "stones", label: t("stones") },
    { id: "about", label: t("about") },
    { id: "inspiration", label: t("inspiration") },
    { id: "contact", label: t("contact") },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col items-start group">
              <span
                className={`text-lg md:text-xl font-light tracking-[0.25em] transition-colors duration-500 ${
                  scrolled ? "text-foreground" : "text-white"
                }`}
              >
                MARBELLA
              </span>
              <span
                className={`text-[8px] md:text-[9px] tracking-[0.4em] -mt-0.5 transition-colors duration-500 ${
                  scrolled ? "text-muted-light" : "text-white/40"
                }`}
              >
                DESIGN & DECOR
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`/#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 hover:opacity-100 ${
                    scrolled
                      ? "text-muted hover:text-foreground"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              ))}

              {/* Language switcher */}
              <div
                className={`flex items-center gap-0.5 ml-2 pl-6 border-l transition-colors duration-500 ${
                  scrolled ? "border-border" : "border-white/10"
                }`}
              >
                {routing.locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm transition-all duration-300 ${
                      locale === loc
                        ? scrolled
                          ? "text-foreground bg-warm-gray"
                          : "text-white bg-white/10"
                        : scrolled
                          ? "text-muted-light hover:text-foreground"
                          : "text-white/30 hover:text-white/60"
                    }`}
                  >
                    {loc === "bg" ? "БГ" : "EN"}
                  </button>
                ))}
              </div>
            </nav>

            {/* Mobile controls */}
            <div className="flex items-center gap-2 md:hidden">
              <div className="flex items-center gap-0.5">
                {routing.locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm transition-colors ${
                      locale === loc
                        ? scrolled
                          ? "text-foreground bg-warm-gray"
                          : "text-white bg-white/10"
                        : scrolled
                          ? "text-muted-light"
                          : "text-white/30"
                    }`}
                  >
                    {loc === "bg" ? "БГ" : "EN"}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`p-2 transition-colors ${
                  scrolled ? "text-foreground" : "text-white"
                }`}
                aria-label="Menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 8h16M4 16h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-charcoal flex flex-col justify-center items-center animate-reveal-fade">
          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-6 p-2 text-white/60"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <nav className="flex flex-col items-center gap-8">
            {navItems.map((item, i) => (
              <a
                key={item.id}
                href={`/#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="text-2xl font-extralight tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors animate-reveal-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
