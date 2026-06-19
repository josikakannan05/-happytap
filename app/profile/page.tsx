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
  Palette,
  Facebook,
  Youtube,
  MapPin,
  Map,
  MessageSquare,
  Globe,
  Briefcase,
} from "lucide-react";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { ThemeCustomizer, ThemeCustomizerHandle } from "@/components/ThemeCustomizer";

/* ─────────────────────────────────────────────────
   Sidebar navigation items
   ───────────────────────────────────────────────── */
const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#" },
  { icon: CreditCard,      label: "My Cards",  href: "#" },
  { icon: BarChart3,       label: "Analytics", href: "#" },
  { icon: Palette,         label: "Theme",     href: "#" },
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

  /* Cover image */
  const [coverSrc, setCoverSrc] = useState<string | null>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  /* Form fields */
  const [fullName, setFullName] = useState("John Doe");
  const [designation, setDesignation] = useState("Lead Designer");
  const [companyName, setCompanyName] = useState("HappyTap");
  const [companyDescription, setCompanyDescription] = useState("Digital designer and entrepreneur passionate about creating connections.");
  const [mobileNumber, setMobileNumber] = useState("+91 98765 43210");
  const [emailAddress, setEmailAddress] = useState("john.doe@example.com");
  const [whatsAppNumber, setWhatsAppNumber] = useState("+91 98765 43210");
  const [website, setWebsite] = useState("https://happytap.com");
  const [portfolio, setPortfolio] = useState("https://portfolio.johndoe.com");
  const [linkedin, setLinkedin] = useState("https://linkedin.com/in/johndoe");
  const [instagram, setInstagram] = useState("https://instagram.com/johndoe");
  const [facebook, setFacebook] = useState("https://facebook.com/johndoe");
  const [twitter, setTwitter] = useState("https://x.com/johndoe");
  const [youtube, setYoutube] = useState("https://youtube.com/johndoe");
  const [businessAddress, setBusinessAddress] = useState("123 Innovation Way, Tech Park, Bangalore, India");
  const [googleMapsLocation, setGoogleMapsLocation] = useState("https://maps.google.com/?q=12.9716,77.5946");
  const [twoFactor, setTwoFactor] = useState(true);

  const [saved, setSaved] = useState(false);

  /* Load profile config on mount */
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("happytap_user_profile");
      if (stored) {
        const p = JSON.parse(stored);
        if (p.fullName !== undefined) setFullName(p.fullName);
        if (p.designation !== undefined) setDesignation(p.designation);
        if (p.companyName !== undefined) setCompanyName(p.companyName);
        if (p.companyDescription !== undefined) setCompanyDescription(p.companyDescription);
        if (p.avatarSrc !== undefined) setAvatarSrc(p.avatarSrc);
        if (p.coverSrc !== undefined) setCoverSrc(p.coverSrc);
        if (p.mobileNumber !== undefined) setMobileNumber(p.mobileNumber);
        if (p.emailAddress !== undefined) setEmailAddress(p.emailAddress);
        if (p.whatsAppNumber !== undefined) setWhatsAppNumber(p.whatsAppNumber);
        if (p.website !== undefined) setWebsite(p.website);
        if (p.portfolio !== undefined) setPortfolio(p.portfolio);
        if (p.linkedin !== undefined) setLinkedin(p.linkedin);
        if (p.instagram !== undefined) setInstagram(p.instagram);
        if (p.facebook !== undefined) setFacebook(p.facebook);
        if (p.twitter !== undefined) setTwitter(p.twitter);
        if (p.youtube !== undefined) setYoutube(p.youtube);
        if (p.businessAddress !== undefined) setBusinessAddress(p.businessAddress);
        if (p.googleMapsLocation !== undefined) setGoogleMapsLocation(p.googleMapsLocation);
      }
    } catch (err) {
      console.error("Error loading profile configuration:", err);
    }
  }, []);

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

  const getInitials = (name: string) => {
    if (!name) return "JO";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const profileData = {
      fullName,
      designation,
      companyName,
      companyDescription,
      avatarSrc,
      coverSrc,
      mobileNumber,
      emailAddress,
      whatsAppNumber,
      website,
      portfolio,
      linkedin,
      instagram,
      facebook,
      twitter,
      youtube,
      businessAddress,
      googleMapsLocation
    };
    localStorage.setItem("happytap_user_profile", JSON.stringify(profileData));
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
              <span>{getInitials(fullName)}</span>
            )}
          </span>
          <div className="footer-user-info">
            <span className="footer-username">{fullName}</span>
            <span className="footer-email">{emailAddress}</span>
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
                          {getInitials(fullName)}
                        </span>
                      )}
                    </span>
                  </button>
                </>
              )}
            </div>
          </header>

          {activeTab === "Dashboard" && (
            <>
              {/* Cover Banner Card */}
              <div className="profile-cover-card">
                {/* Cover Area */}
                <div
                  className="profile-cover-bg"
                  style={coverSrc ? { backgroundImage: `url(${coverSrc})` } : undefined}
                  aria-label="Cover photo area"
                >
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
                  />
                </div>

                {/* Circular overlapping Avatar */}
                <div className="profile-avatar-wrap">
                  <div className="profile-avatar-ring">
                    {avatarSrc ? (
                      <img src={avatarSrc} alt="Profile photo" className="profile-avatar-img" />
                    ) : (
                      <span className="profile-avatar-initials">
                        {getInitials(fullName)}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="profile-avatar-edit-btn"
                    onClick={() => avatarInputRef.current?.click()}
                    aria-label="Edit profile photo"
                  >
                    <Camera size={12} aria-hidden />
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
              </div>

              {/* Profile Information Block below Cover/Avatar */}
              <div className="profile-header-info-container">
                <h2 className="profile-header-fullname">{fullName}</h2>
                <p className="profile-header-email">{emailAddress}</p>
                <div className="profile-header-badge-row">
                  <span className="profile-header-plan-badge">
                    <Crown size={12} className="plan-badge-icon" aria-hidden />
                    Pro Plan
                  </span>
                </div>
              </div>

              {/* Stats Cards Row */}
              <div className="profile-stats-row">
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
            </>
          )}

          {activeTab === "Dashboard" && (
            <div className="profile-settings-grid-wrapper">
              {/* Row 1: Profile Identity & Media */}
              <div className="profile-grid-row">
                {/* Profile Identity */}
                <section className="profile-card">
                  <h2 className="profile-card-title">
                    <User size={16} className="profile-card-icon" aria-hidden />
                    Profile Identity
                  </h2>
                  <div className="pf-field">
                    <label htmlFor="pf-fullName">Full Name</label>
                    <input
                      id="pf-fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="pf-input"
                    />
                  </div>
                  <div className="pf-row-2">
                    <div className="pf-field">
                      <label htmlFor="pf-designation">Designation</label>
                      <input
                        id="pf-designation"
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="e.g. Lead Designer"
                        className="pf-input"
                      />
                    </div>
                    <div className="pf-field">
                      <label htmlFor="pf-companyName">Company Name</label>
                      <input
                        id="pf-companyName"
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. HappyTap"
                        className="pf-input"
                      />
                    </div>
                  </div>
                  <div className="pf-field">
                    <label htmlFor="pf-companyDescription">Company Description / Bio</label>
                    <textarea
                      id="pf-companyDescription"
                      value={companyDescription}
                      onChange={(e) => setCompanyDescription(e.target.value)}
                      placeholder="Write a short description about you or your company..."
                      rows={3}
                      className="pf-textarea"
                    />
                  </div>
                </section>

                {/* Profile Media */}
                <section className="profile-card">
                  <h2 className="profile-card-title">
                    <Camera size={16} className="profile-card-icon" aria-hidden />
                    Profile Media
                  </h2>
                  <p className="pf-label">Profile Photo</p>
                  <button
                    type="button"
                    className="pf-upload-zone"
                    onClick={() => avatarInputRef.current?.click()}
                    aria-label="Upload profile photo"
                    style={{ marginBottom: "16px" }}
                  >
                    <Upload size={20} className="pf-upload-zone-icon" />
                    <div className="pf-upload-zone-text">
                      <span className="pf-upload-zone-highlight">Click to upload photo</span>
                      <p className="pf-upload-zone-sub">PNG, JPG or WEBP (Square recommended)</p>
                    </div>
                  </button>
                  
                  <p className="pf-label">Cover Image</p>
                  <button
                    type="button"
                    className="pf-upload-zone"
                    onClick={() => coverInputRef.current?.click()}
                    aria-label="Upload cover image"
                  >
                    <Upload size={20} className="pf-upload-zone-icon" />
                    <div className="pf-upload-zone-text">
                      <span className="pf-upload-zone-highlight">Click to upload cover banner</span>
                      <p className="pf-upload-zone-sub">Horizontal banner image</p>
                    </div>
                  </button>
                </section>
              </div>

              {/* Row 2: Contact Details & Direct Links */}
              <div className="profile-grid-row">
                {/* Contact Details */}
                <section className="profile-card">
                  <h2 className="profile-card-title">
                    <Phone size={16} className="profile-card-icon" aria-hidden />
                    Contact Details
                  </h2>
                  <div className="pf-field">
                    <label htmlFor="pf-mobileNumber">Mobile Number</label>
                    <div className="pf-input-icon-wrap">
                      <Phone size={15} className="pf-input-icon" aria-hidden />
                      <input
                        id="pf-mobileNumber"
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="pf-input pf-input-padded"
                      />
                    </div>
                  </div>
                  <div className="pf-field">
                    <label htmlFor="pf-emailAddress">Email Address</label>
                    <div className="pf-input-icon-wrap">
                      <Mail size={15} className="pf-input-icon" aria-hidden />
                      <input
                        id="pf-emailAddress"
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="name@example.com"
                        className="pf-input pf-input-padded"
                      />
                    </div>
                  </div>
                  <div className="pf-field">
                    <label htmlFor="pf-whatsAppNumber">WhatsApp Number</label>
                    <div className="pf-input-icon-wrap">
                      <MessageSquare size={15} className="pf-input-icon" aria-hidden />
                      <input
                        id="pf-whatsAppNumber"
                        type="tel"
                        value={whatsAppNumber}
                        onChange={(e) => setWhatsAppNumber(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="pf-input pf-input-padded"
                      />
                    </div>
                  </div>
                </section>

                {/* Direct Links */}
                <section className="profile-card">
                  <h2 className="profile-card-title">
                    <Globe size={16} className="profile-card-icon" aria-hidden />
                    Direct Links
                  </h2>
                  <div className="pf-field">
                    <label htmlFor="pf-website">Website URL</label>
                    <div className="pf-input-icon-wrap">
                      <Globe size={15} className="pf-input-icon" aria-hidden />
                      <input
                        id="pf-website"
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://example.com"
                        className="pf-input pf-input-padded"
                      />
                    </div>
                  </div>
                  <div className="pf-field">
                    <label htmlFor="pf-portfolio">Portfolio URL</label>
                    <div className="pf-input-icon-wrap">
                      <Briefcase size={15} className="pf-input-icon" aria-hidden />
                      <input
                        id="pf-portfolio"
                        type="url"
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                        placeholder="https://portfolio.example.com"
                        className="pf-input pf-input-padded"
                      />
                    </div>
                  </div>
                </section>
              </div>

              {/* Row 3: Social Networks & Location Details */}
              <div className="profile-grid-row">
                {/* Social Networks */}
                <section className="profile-card">
                  <h2 className="profile-card-title">
                    <Instagram size={16} className="profile-card-icon" aria-hidden />
                    Social Networks
                  </h2>
                  <div className="pf-row-2">
                    <div className="pf-field">
                      <label htmlFor="pf-linkedin">LinkedIn</label>
                      <div className="pf-input-icon-wrap">
                        <Linkedin size={15} className="pf-input-icon pf-linkedin-icon" aria-hidden />
                        <input
                          id="pf-linkedin"
                          type="url"
                          value={linkedin}
                          onChange={(e) => setLinkedin(e.target.value)}
                          placeholder="https://linkedin.com/in/username"
                          className="pf-input pf-input-padded"
                        />
                      </div>
                    </div>
                    <div className="pf-field">
                      <label htmlFor="pf-instagram">Instagram</label>
                      <div className="pf-input-icon-wrap">
                        <Instagram size={15} className="pf-input-icon pf-instagram-icon" aria-hidden />
                        <input
                          id="pf-instagram"
                          type="url"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          placeholder="https://instagram.com/username"
                          className="pf-input pf-input-padded"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pf-row-2">
                    <div className="pf-field">
                      <label htmlFor="pf-facebook">Facebook</label>
                      <div className="pf-input-icon-wrap">
                        <Facebook size={15} className="pf-input-icon" style={{ color: "#1877f2" }} aria-hidden />
                        <input
                          id="pf-facebook"
                          type="url"
                          value={facebook}
                          onChange={(e) => setFacebook(e.target.value)}
                          placeholder="https://facebook.com/username"
                          className="pf-input pf-input-padded"
                        />
                      </div>
                    </div>
                    <div className="pf-field">
                      <label htmlFor="pf-twitter">X (Twitter)</label>
                      <div className="pf-input-icon-wrap">
                        <Twitter size={15} className="pf-input-icon pf-twitter-icon" aria-hidden />
                        <input
                          id="pf-twitter"
                          type="url"
                          value={twitter}
                          onChange={(e) => setTwitter(e.target.value)}
                          placeholder="https://x.com/username"
                          className="pf-input pf-input-padded"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pf-field">
                    <label htmlFor="pf-youtube">YouTube</label>
                    <div className="pf-input-icon-wrap">
                      <Youtube size={15} className="pf-input-icon" style={{ color: "#ff0000" }} aria-hidden />
                      <input
                        id="pf-youtube"
                        type="url"
                        value={youtube}
                        onChange={(e) => setYoutube(e.target.value)}
                        placeholder="https://youtube.com/c/channel"
                        className="pf-input pf-input-padded"
                      />
                    </div>
                  </div>
                </section>

                {/* Location Details */}
                <section className="profile-card">
                  <h2 className="profile-card-title">
                    <MapPin size={16} className="profile-card-icon" aria-hidden />
                    Location Details
                  </h2>
                  <div className="pf-field">
                    <label htmlFor="pf-businessAddress">Business Address</label>
                    <textarea
                      id="pf-businessAddress"
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                      placeholder="e.g. 123 Innovation Way, Tech Park..."
                      rows={3}
                      className="pf-textarea"
                    />
                  </div>
                  <div className="pf-field">
                    <label htmlFor="pf-googleMapsLocation">Google Maps Link</label>
                    <div className="pf-input-icon-wrap">
                      <Map size={15} className="pf-input-icon" aria-hidden />
                      <input
                        id="pf-googleMapsLocation"
                        type="url"
                        value={googleMapsLocation}
                        onChange={(e) => setGoogleMapsLocation(e.target.value)}
                        placeholder="https://maps.google.com/..."
                        className="pf-input pf-input-padded"
                      />
                    </div>
                  </div>

                  {/* Actions Section inside card to align properly */}
                  <div className="profile-card-action-right" style={{ marginTop: "24px" }}>
                    <button
                      type="button"
                      className="btn pf-btn-save"
                      onClick={() => handleSave()}
                      style={{ width: "100%", padding: "12px" }}
                    >
                      {saved ? "✓ Saved successfully!" : "Save Profile Details"}
                    </button>
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
                firstName={fullName.split(" ")[0] || ""}
                lastName={fullName.split(" ").slice(1).join(" ") || ""}
                role={designation}
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
