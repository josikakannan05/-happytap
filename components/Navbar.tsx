"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Contact,
  Menu,
  X,
  User,
  CreditCard,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { navLinks } from "@/lib/data";

interface NavbarProps {
  onLoginClick?: () => void;
  user?: string | null;
  onLogout?: () => void;
}

export function Navbar({ onLoginClick, user, onLogout }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // Capitalise the first letter of the display name
  const displayName = user
    ? user.charAt(0).toUpperCase() + user.slice(1)
    : "";

  // Avatar initials (first two chars)
  const initials = user ? user.slice(0, 2).toUpperCase() : "";

  const dropdownItems = [
    { icon: <User className="icon" aria-hidden />, label: "My Profile", href: "/profile" },
    { icon: <CreditCard className="icon" aria-hidden />, label: "My Card", href: "#" },
    ...(user?.toLowerCase().includes("admin") ? [
      { icon: <LayoutDashboard className="icon" aria-hidden />, label: "Admin Panel", href: "/admin" }
    ] : []),
    { icon: <Settings className="icon" aria-hidden />, label: "Settings", href: "#" },
  ];

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
            {user ? (
              /* ── Logged-in: avatar + dropdown ── */
              <div className="nav-profile-wrap" ref={dropdownRef}>
                <button
                  id="nav-profile-btn"
                  className={`nav-profile-btn${dropdownOpen ? " open" : ""}`}
                  onClick={() => setDropdownOpen((o) => !o)}
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  aria-label={`Logged in as ${displayName}`}
                  suppressHydrationWarning
                >
                  <span className="nav-avatar">{initials}</span>
                  <span className="nav-username">{displayName}</span>
                  <ChevronDown
                    className={`nav-chevron${dropdownOpen ? " rotated" : ""}`}
                    aria-hidden
                  />
                </button>

                {dropdownOpen && (
                  <div className="nav-dropdown" role="menu" aria-label="User menu">
                    <div className="nav-dropdown-header">
                      <span className="nav-dropdown-avatar">{initials}</span>
                      <div>
                        <p className="nav-dropdown-name">{displayName}</p>
                        <p className="nav-dropdown-role">HappyTap Member</p>
                      </div>
                    </div>
                    <div className="nav-dropdown-divider" />
                    {dropdownItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="nav-dropdown-item"
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {item.icon}
                        {item.label}
                      </a>
                    ))}
                    <div className="nav-dropdown-divider" />
                    <button
                      className="nav-dropdown-item nav-dropdown-logout"
                      role="menuitem"
                      onClick={() => {
                        setDropdownOpen(false);
                        onLogout?.();
                      }}
                      suppressHydrationWarning
                    >
                      <LogOut className="icon" aria-hidden />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ── Guest: Login button ── */
              <button onClick={onLoginClick} className="btn" suppressHydrationWarning>
                Login
                <ArrowRight className="icon" aria-hidden />
              </button>
            )}

            <button
              type="button"
              className="menu-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              suppressHydrationWarning
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
        {user ? (
          <>
            <a href="#" className="mobile-menu-profile-item" onClick={() => setMenuOpen(false)}>
              <User className="icon" aria-hidden /> My Profile
            </a>
            <a href="#" className="mobile-menu-profile-item" onClick={() => setMenuOpen(false)}>
              <CreditCard className="icon" aria-hidden /> My Card
            </a>
            {user?.toLowerCase().includes("admin") ? (
              <Link href="/admin" className="mobile-menu-profile-item" onClick={() => setMenuOpen(false)}>
                <LayoutDashboard className="icon" aria-hidden /> Admin Panel
              </Link>
            ) : (
              <a href="#" className="mobile-menu-profile-item" onClick={() => setMenuOpen(false)}>
                <LayoutDashboard className="icon" aria-hidden /> Dashboard
              </a>
            )}
            <a href="#" className="mobile-menu-profile-item" onClick={() => setMenuOpen(false)}>
              <Settings className="icon" aria-hidden /> Settings
            </a>
            <button
              className="btn mobile-logout-btn"
              style={{ marginTop: 8 }}
              onClick={() => {
                setMenuOpen(false);
                onLogout?.();
              }}
              suppressHydrationWarning
            >
              <LogOut className="icon" aria-hidden />
              Logout
            </button>
          </>
        ) : (
          <button
            className="btn"
            style={{ marginTop: 8 }}
            onClick={() => {
              setMenuOpen(false);
              onLoginClick?.();
            }}
            suppressHydrationWarning
          >
            Login
            <ArrowRight className="icon" aria-hidden />
          </button>
        )}
      </div>
    </>
  );
}
