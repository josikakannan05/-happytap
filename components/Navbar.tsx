"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Contact, Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";

interface NavbarProps {
  onLoginClick?: () => void;
}

export function Navbar({ onLoginClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className={scrolled ? "nav-scrolled" : ""}>
        <div className="container nav-inner">
          <Link href="/" className="logo">
            <div className="logo-mark">
              <Contact className="icon" aria-hidden />
            </div>
            HappyTap
          </Link>

          <div className="nav-links">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            <button onClick={onLoginClick} className="btn">
              Login
              <ArrowRight className="icon" aria-hidden />
            </button>
            <button
              type="button"
              className="menu-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X className="icon" aria-hidden />
              ) : (
                <Menu className="icon" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <button
          className="btn"
          style={{ marginTop: 8 }}
          onClick={() => {
            setMenuOpen(false);
            onLoginClick?.();
          }}
        >
          Login
          <ArrowRight className="icon" aria-hidden />
        </button>
      </div>
    </>
  );
}
