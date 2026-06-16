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
  Phone,
  Mail,
  ChevronDown,
  X,
  Menu,
  Bell,
  Linkedin,
  Twitter,
  Lock,
  Crown,
  Smartphone,
  Check,
} from "lucide-react";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { ThemeCustomizer, ThemeCustomizerHandle } from "@/components/ThemeCustomizer";

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
  { icon: LayoutTemplate,  label: "Templates", href: "#" },
  { icon: Settings,        label: "Settings",  href: "#" },
];

/* ─────────────────────────────────────────────────
   Profile page
   ───────────────────────────────────────────────── */
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<string>("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const themeCustomizerRef = useRef<ThemeCustomizerHandle>(null);

  /* Avatar image */
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  /* Form fields */
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [about, setAbout] = useState("Digital designer and entrepreneur passionate about creating");
  const [instagram, setInstagram] = useState("@johndoe_design");
  const [linkedin, setLinkedin] = useState("linkedin.com/in/johndoe");
  const [twitter, setTwitter] = useState("@johndoe_design");
  const [twoFactor, setTwoFactor] = useState(true);

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

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="profile-shell">
      {/* ── Sidebar overlay for mobile ── */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`profile-sidebar${sidebarOpen ? " open" : ""}`}>
        <div className="profile-sidebar-header">
          <Link href="/" className="profile-sidebar-logo">
            <div className="logo-mark profile-logo-mark">
              <Contact className="icon" aria-hidden />
            </div>
            <span>HAPPYTAP</span>
          </Link>
          <button
            type="button"
            className="profile-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="profile-sidebar-nav" aria-label="Dashboard navigation">
          {sidebarLinks.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className={`profile-sidebar-link${label === activeTab ? " active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(label);
                setSidebarOpen(false); // Auto-close on link click (mobile friendly)
              }}
            >
              <Icon className="icon" aria-hidden />
              {label}
            </Link>
          ))}
        </nav>

        {/* Upgrade Card */}
        <div className="profile-sidebar-upgrade">
          <div className="upgrade-badge-container">
            <div className="upgrade-icon-wrap">
              <Crown size={20} className="crown-icon" />
            </div>
          </div>
          <h3>Upgrade to Pro</h3>
          <p>Unlock advanced features, custom branding and analytics.</p>
          <button className="btn profile-upgrade-btn">Upgrade Now</button>
        </div>

        <Link href="#" className="profile-sidebar-help" onClick={() => setSidebarOpen(false)}>
          <HelpCircle className="icon" aria-hidden />
          Help &amp; Support
        </Link>

        {/* User Account footer */}
        <div className="profile-sidebar-user-footer">
          <span className="footer-avatar">
            {avatarSrc ? (
              <img src={avatarSrc} alt="avatar" />
            ) : (
              <span>JO</span>
            )}
          </span>
          <div className="footer-user-info">
            <span className="footer-username">{firstName} {lastName}</span>
            <span className="footer-email">{email}</span>
          </div>
          <ChevronDown size={14} className="footer-chevron" aria-hidden />
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="profile-main">
        <div className="profile-container">

          {/* Top bar */}
          <header className="profile-topbar">
            <div className="profile-topbar-left-wrapper">
              <button
                type="button"
                className="profile-sidebar-toggle"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="profile-page-title">
                  {activeTab === "Dashboard" && "Profile Settings"}
                  {activeTab === "Analytics" && "Analytics"}
                  {activeTab === "Theme" && "Theme"}
                  {activeTab !== "Dashboard" && activeTab !== "Analytics" && activeTab !== "Theme" && activeTab}
                </h1>
                <p className="profile-page-sub">
                  {activeTab === "Dashboard" && "Manage your personal information and account settings"}
                  {activeTab === "Analytics" && "Track your card taps and performance"}
                  {activeTab === "Theme" && "Customize your HappyTap card the way you want"}
                  {activeTab !== "Dashboard" && activeTab !== "Analytics" && activeTab !== "Theme" && `Manage your ${activeTab} configurations`}
                </p>
              </div>
            </div>
            <div className="profile-topbar-right">
              {activeTab === "Theme" ? (
                <div className="theme-header-actions">
                  <button type="button" className="btn theme-preview-device-btn">
                    <Smartphone size={16} className="icon" />
                    Preview on device
                  </button>
                  <button
                    type="button"
                    className="btn theme-save-btn"
                    onClick={() => themeCustomizerRef.current?.save()}
                  >
                    <Check size={16} className="icon" />
                    Save Changes
                  </button>
                </div>
              ) : (
                <>
                  <button className="profile-notification-btn" aria-label="Notifications">
                    <Bell size={20} />
                  </button>
                  <button className="profile-topbar-user">
                    <span className="profile-topbar-avatar">
                      {avatarSrc ? (
                        <img src={avatarSrc} alt="avatar" />
                      ) : (
                        <span>
                          {firstName && lastName
                            ? (firstName[0] + lastName[0]).toUpperCase()
                            : "JO"}
                        </span>
                      )}
                    </span>
                  </button>
                </>
              )}
            </div>
          </header>

          {/* Top Profile Summary Card */}
          <div className="profile-summary-card">
            <div className="summary-card-left">
              <div className="summary-avatar-wrap">
                <div className="summary-avatar-ring">
                  {avatarSrc ? (
                    <img src={avatarSrc} alt="Profile photo" className="summary-avatar-img" />
                  ) : (
                    <span className="summary-avatar-initials">JO</span>
                  )}
                </div>
                <button
                  type="button"
                  className="summary-avatar-edit-btn"
                  onClick={() => avatarInputRef.current?.click()}
                  aria-label="Edit profile photo"
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
                />
              </div>
              <div className="summary-user-info">
                <h2>{firstName} {lastName}</h2>
                <p>{email}</p>
                <span className="summary-plan-badge">Pro Plan</span>
              </div>
            </div>

            <div className="summary-card-right">
              <div className="summary-stat-box flex-purple">
                <div className="stat-icon-wrap stat-purple">
                  <CreditCard size={18} />
                </div>
                <div className="stat-text-wrap">
                  <h3>12</h3>
                  <p>Total Cards</p>
                </div>
              </div>
              <div className="summary-stat-box flex-blue">
                <div className="stat-icon-wrap stat-blue">
                  <BarChart3 size={18} />
                </div>
                <div className="stat-text-wrap">
                  <h3>2,847</h3>
                  <p>Profile Views</p>
                </div>
              </div>
              <div className="summary-stat-box flex-green">
                <div className="stat-icon-wrap stat-green">
                  <Users size={18} />
                </div>
                <div className="stat-text-wrap">
                  <h3>38</h3>
                  <p>Contacts Saved</p>
                </div>
              </div>
            </div>
          </div>

          {activeTab === "Dashboard" && (
            <div className="profile-settings-grid-wrapper">
              {/* Row 1: Personal Info & Social Media */}
              <div className="profile-grid-row">
                {/* Personal Information */}
                <section className="profile-card">
                  <h2 className="profile-card-title">
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
                      />
                    </div>
                  </div>

                  <div className="pf-field">
                    <label htmlFor="pf-phone">Phone Number</label>
                    <div className="pf-phone-input-group">
                      <div className="pf-phone-country-select">
                        <span className="pf-phone-flag" aria-hidden>IN</span>
                        <ChevronDown size={12} className="pf-phone-chevron" />
                      </div>
                      <input
                        id="pf-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="pf-input"
                      />
                    </div>
                  </div>

                  <div className="profile-card-action-right">
                    <button
                      type="button"
                      className="btn pf-btn-save"
                      onClick={() => handleSave()}
                    >
                      {saved ? "✓ Saved!" : "Save Changes"}
                    </button>
                  </div>
                </section>

                {/* Social Media */}
                <section className="profile-card">
                  <h2 className="profile-card-title">
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
                      />
                    </div>
                  </div>

                  <div className="pf-field">
                    <label htmlFor="pf-linkedin">LinkedIn</label>
                    <div className="pf-input-icon-wrap">
                      <Linkedin size={15} className="pf-input-icon pf-linkedin-icon" aria-hidden />
                      <input
                        id="pf-linkedin"
                        type="text"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        placeholder="linkedin.com/in/username"
                        className="pf-input pf-input-padded"
                      />
                    </div>
                  </div>

                  <div className="pf-field">
                    <label htmlFor="pf-twitter">Twitter</label>
                    <div className="pf-input-icon-wrap">
                      <Twitter size={15} className="pf-input-icon pf-twitter-icon" aria-hidden />
                      <input
                        id="pf-twitter"
                        type="text"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        placeholder="@yourusername"
                        className="pf-input pf-input-padded"
                      />
                    </div>
                  </div>
                </section>
              </div>

              {/* Row 2: Profile Info & Account Settings */}
              <div className="profile-grid-row">
                {/* Profile Information */}
                <section className="profile-card">
                  <h2 className="profile-card-title">
                    <User size={16} className="profile-card-icon" aria-hidden />
                    Profile Information
                  </h2>

                  <p className="pf-label">Profile Picture</p>
                  <button
                    type="button"
                    className="pf-upload-zone"
                    onClick={() => avatarInputRef.current?.click()}
                    aria-label="Upload profile picture"
                  >
                    <Upload size={20} className="pf-upload-zone-icon" />
                    <div className="pf-upload-zone-text">
                      <span className="pf-upload-zone-highlight">Click to upload</span> or drag and drop
                      <p className="pf-upload-zone-sub">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                    </div>
                  </button>

                  <div className="pf-field">
                    <label htmlFor="pf-about">Bio</label>
                    <textarea
                      id="pf-about"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      placeholder="Write a short bio..."
                      rows={4}
                      className="pf-textarea"
                    />
                  </div>
                </section>

                {/* Account Settings */}
                <section className="profile-card">
                  <h2 className="profile-card-title">
                    <Settings size={16} className="profile-card-icon" aria-hidden />
                    Account Settings
                  </h2>

                  <div className="pf-field">
                    <label>Password</label>
                    <button
                      type="button"
                      className="pf-change-pw-btn"
                    >
                      <Lock size={15} />
                      Change Password
                    </button>
                  </div>

                  <div className="pf-field">
                    <label>Security</label>
                    <div className="pf-two-factor-row">
                      <div className="pf-two-factor-info">
                        <span className="pf-two-factor-label">Two-Factor Authentication</span>
                        <p className="pf-two-factor-desc">Secure your account with 2FA</p>
                      </div>
                      <button
                        type="button"
                        className={`pf-toggle-switch${twoFactor ? " active" : ""}`}
                        onClick={() => setTwoFactor(!twoFactor)}
                        aria-label="Toggle two-factor authentication"
                      >
                        <span className="toggle-handle" />
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {activeTab === "Analytics" && (
            <div className="profile-analytics-tab-wrapper">
              <AnalyticsDashboard />
            </div>
          )}

          {activeTab === "Theme" && (
            <div className="profile-theme-tab-wrapper">
              <ThemeCustomizer
                ref={themeCustomizerRef}
                firstName={firstName}
                lastName={lastName}
                role={about}
                onSaveStatus={setSaved}
              />
            </div>
          )}

          {activeTab !== "Dashboard" && activeTab !== "Analytics" && activeTab !== "Theme" && (
            <div className="profile-coming-soon">
              <div className="coming-soon-card">
                <div className="coming-soon-icon">
                  <Zap size={24} />
                </div>
                <h2>{activeTab} Content</h2>
                <p>This section is under development and will be available soon.</p>
              </div>
            </div>
          )}

          {saved && (
            <div className="pf-toast" role="status" aria-live="polite">
              {activeTab === "Theme" ? "✓ Theme settings saved successfully!" : "✓ Profile saved successfully!"}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
