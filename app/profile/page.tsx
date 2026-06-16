"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  Contact,
  LayoutDashboard,
  CreditCard,
  Users,
  BarChart3,
  CalendarDays,
  Wrench,
  ShoppingBag,
  LayoutTemplate,
  Settings,
  HelpCircle,
  Zap,
  Camera,
  Pencil,
  Upload,
  Instagram,
  User,
  Building2,
  MapPin,
  FileText,
  Phone,
  Mail,
  ChevronDown,
  X,
} from "lucide-react";

/* ─────────────────────────────────────────────────
   Sidebar navigation items
───────────────────────────────────────────────── */
const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#" },
  { icon: CreditCard,      label: "My Cards",  href: "#" },
  { icon: Users,           label: "Contacts",  href: "#" },
  { icon: BarChart3,       label: "Analytics", href: "#" },
  { icon: Users,           label: "Leads",     href: "#" },
  { icon: CalendarDays,    label: "Events",    href: "#" },
  { icon: Wrench,          label: "Services",  href: "#" },
  { icon: ShoppingBag,     label: "Products",  href: "#" },
  { icon: LayoutTemplate, label: "Templates", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
];

/* ─────────────────────────────────────────────────
   Profile page
───────────────────────────────────────────────── */
export default function ProfilePage() {
  /* Cover image */
  const [coverSrc, setCoverSrc] = useState<string | null>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  /* Avatar image */
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  /* Form fields */
  const [firstName, setFirstName] = useState("Josikakannan");
  const [lastName, setLastName] = useState("05");
  const [email, setEmail] = useState("josikakannan05@gmail.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [company, setCompany] = useState("HappyTap");
  const [address, setAddress] = useState("123, Business Street, Tech Park, Coimbatore, Tamil Nadu, India");
  const [about, setAbout] = useState("Building digital identity solutions that help people connect instantly.");
  const [instagram, setInstagram] = useState("@josikakannan_05");

  const [saved, setSaved] = useState(false);

  /* Helpers */
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (src: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setter(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setFirstName("Josikakannan");
    setLastName("05");
    setEmail("josikakannan05@gmail.com");
    setPhone("+91 98765 43210");
    setCompany("HappyTap");
    setAddress("123, Business Street, Tech Park, Coimbatore, Tamil Nadu, India");
    setAbout("Building digital identity solutions that help people connect instantly.");
    setInstagram("@josikakannan_05");
  };

  return (
    <div className="profile-shell">
      {/* ── Sidebar ── */}
      <aside className="profile-sidebar">
        <Link href="/" className="profile-sidebar-logo">
          <div className="logo-mark profile-logo-mark">
            <Contact className="icon" aria-hidden />
          </div>
          <span>HappyTap</span>
        </Link>

        <nav className="profile-sidebar-nav" aria-label="Dashboard navigation">
          {sidebarLinks.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className={`profile-sidebar-link${label === "Settings" ? " active" : ""}`}
            >
              <Icon className="icon" aria-hidden />
              {label}
            </Link>
          ))}
        </nav>

        <div className="profile-sidebar-upgrade">
          <div className="upgrade-badge">
            <Zap size={14} aria-hidden /> Upgrade to Pro
          </div>
          <p>Unlock premium features and grow your network.</p>
          <button className="btn profile-upgrade-btn" suppressHydrationWarning>Upgrade Now</button>
        </div>

        <Link href="#" className="profile-sidebar-help">
          <HelpCircle className="icon" aria-hidden />
          Help &amp; Support
        </Link>
      </aside>

      {/* ── Main content ── */}
      <main className="profile-main">
        <div className="profile-container">

          {/* Top bar */}
          <header className="profile-topbar">
            <div>
              <h1 className="profile-page-title">My Profile</h1>
              <p className="profile-page-sub">Manage your personal and professional information</p>
            </div>
            <button className="profile-topbar-user" suppressHydrationWarning>
              <span className="profile-topbar-avatar">
                {avatarSrc
                  ? <img src={avatarSrc} alt="avatar" />
                  : <span>JO</span>}
              </span>
              <span>{firstName}{lastName}</span>
              <ChevronDown size={14} aria-hidden />
            </button>
          </header>

          <form onSubmit={handleSave} className="profile-form">

            {/* ── Cover + Avatar ── */}
            <div className="profile-cover-card">
              {/* Cover area */}
              <div
                className="profile-cover-bg"
                style={coverSrc ? { backgroundImage: `url(${coverSrc})` } : undefined}
                aria-label="Cover photo area"
              >
                {/* Wavy SVG decoration when no cover photo */}
                {!coverSrc && (
                  <svg className="cover-wave" viewBox="0 0 900 160" preserveAspectRatio="none" aria-hidden>
                    <path d="M0,80 C150,140 300,20 450,80 C600,140 750,20 900,80 L900,160 L0,160 Z" fill="rgba(255,255,255,0.18)" />
                    <path d="M0,100 C180,60 360,140 540,100 C720,60 810,120 900,90 L900,160 L0,160 Z" fill="rgba(255,255,255,0.1)" />
                  </svg>
                )}
                <button
                  type="button"
                  className="profile-cover-change-btn"
                  onClick={() => coverInputRef.current?.click()}
                  aria-label="Change cover photo"
                  suppressHydrationWarning
                >
                  <Camera size={14} aria-hidden />
                  Change Cover
                </button>
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => handleFileChange(e, setCoverSrc)}
                  aria-label="Upload cover photo"
                  suppressHydrationWarning
                />
              </div>

              {/* Avatar overlapping the cover */}
              <div className="profile-avatar-wrap">
                <div className="profile-avatar-ring">
                  {avatarSrc
                    ? <img src={avatarSrc} alt="Profile photo" className="profile-avatar-img" />
                    : <span className="profile-avatar-initials">JO</span>}
                </div>
                <button
                  type="button"
                  className="profile-avatar-edit-btn"
                  onClick={() => avatarInputRef.current?.click()}
                  aria-label="Edit profile photo"
                  suppressHydrationWarning
                >
                  <Pencil size={12} aria-hidden />
                </button>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => handleFileChange(e, setAvatarSrc)}
                  aria-label="Upload profile photo"
                  suppressHydrationWarning
                />
              </div>
            </div>

            {/* ── Two-column grid ── */}
            <div className="profile-grid">

              {/* LEFT column */}
              <div className="profile-col">

                {/* Personal Information */}
                <section className="profile-card" aria-labelledby="personal-info-heading">
                  <h2 className="profile-card-title" id="personal-info-heading">
                    <User size={16} className="profile-card-icon" aria-hidden />
                    Personal Information
                  </h2>

                  <div className="pf-row-2">
                    <div className="pf-field">
                      <label htmlFor="pf-firstName">First Name</label>
                      <input
                        id="pf-firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="pf-input"
                        suppressHydrationWarning
                      />
                    </div>
                    <div className="pf-field">
                      <label htmlFor="pf-lastName">Last Name</label>
                      <input
                        id="pf-lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="pf-input"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>

                  <div className="pf-field">
                    <label htmlFor="pf-email">Email Address</label>
                    <div className="pf-input-icon-wrap">
                      <Mail size={15} className="pf-input-icon" aria-hidden />
                      <input
                        id="pf-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="pf-input pf-input-padded"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>

                  <div className="pf-field">
                    <label htmlFor="pf-phone">Phone Number</label>
                    <div className="pf-input-icon-wrap">
                      <span className="pf-phone-flag" aria-hidden>🇮🇳</span>
                      <input
                        id="pf-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 00000 00000"
                        className="pf-input pf-input-padded"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>
                </section>

                {/* Professional Information */}
                <section className="profile-card" aria-labelledby="pro-info-heading">
                  <h2 className="profile-card-title" id="pro-info-heading">
                    <Building2 size={16} className="profile-card-icon" aria-hidden />
                    Professional Information
                  </h2>

                  <div className="pf-field">
                    <label htmlFor="pf-company">Company Name</label>
                    <input
                      id="pf-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Your Company"
                      className="pf-input"
                      suppressHydrationWarning
                    />
                  </div>

                  <div className="pf-field">
                    <label htmlFor="pf-address">Address</label>
                    <div className="pf-input-icon-wrap">
                      <MapPin size={15} className="pf-input-icon" aria-hidden />
                      <input
                        id="pf-address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Your address"
                        className="pf-input pf-input-padded"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>

                  <div className="pf-field">
                    <label htmlFor="pf-about">
                      About Me
                      <span className="pf-char-count">{about.length}/200</span>
                    </label>
                    <textarea
                      id="pf-about"
                      value={about}
                      onChange={(e) => setAbout(e.target.value.slice(0, 200))}
                      placeholder="Write a short bio…"
                      rows={4}
                      className="pf-textarea"
                      suppressHydrationWarning
                    />
                  </div>
                </section>
              </div>

              {/* RIGHT column */}
              <div className="profile-col">

                {/* Social Media */}
                <section className="profile-card" aria-labelledby="social-heading">
                  <h2 className="profile-card-title" id="social-heading">
                    <Instagram size={16} className="profile-card-icon" aria-hidden />
                    Social Media
                  </h2>

                  <div className="pf-field">
                    <label htmlFor="pf-instagram">Instagram ID</label>
                    <div className="pf-input-icon-wrap">
                      <Instagram size={15} className="pf-input-icon pf-instagram-icon" aria-hidden />
                      <input
                        id="pf-instagram"
                        type="text"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        placeholder="@yourusername"
                        className="pf-input pf-input-padded"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>
                </section>

                {/* Profile Picture upload */}
                <section className="profile-card" aria-labelledby="pic-heading">
                  <h2 className="profile-card-title" id="pic-heading">
                    <User size={16} className="profile-card-icon" aria-hidden />
                    Profile Information
                  </h2>

                  <p className="pf-label">Profile Picture</p>
                  <button
                    type="button"
                    className="pf-upload-zone"
                    onClick={() => avatarInputRef.current?.click()}
                    aria-label="Upload profile picture"
                    suppressHydrationWarning
                  >
                    {avatarSrc ? (
                      <img src={avatarSrc} alt="preview" className="pf-upload-preview" />
                    ) : (
                      <>
                        <div className="pf-upload-icon-wrap">
                          <Upload size={22} className="pf-upload-icon" aria-hidden />
                        </div>
                        <span className="pf-upload-label">Upload Photo</span>
                        <span className="pf-upload-hint">JPG, PNG up to 2MB</span>
                      </>
                    )}
                  </button>
                  <p className="pf-upload-rec">Recommended size: 400×400px</p>
                </section>

                {/* Action buttons moved below the grid columns */}
              </div>
            </div>

            {/* Action buttons */}
            <div className="profile-actions">
              <button
                type="button"
                className="pf-btn-cancel"
                onClick={handleCancel}
                suppressHydrationWarning
              >
                Cancel
              </button>
              <button type="submit" className="btn pf-btn-save" suppressHydrationWarning>
                {saved ? "✓ Saved!" : "Save Changes"}
              </button>
            </div>
          </form>

          {/* Toast */}
          {saved && (
            <div className="pf-toast" role="status" aria-live="polite">
              ✓ Profile saved successfully!
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
