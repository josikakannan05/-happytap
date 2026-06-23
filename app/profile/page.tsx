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
  Wifi,
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
  const [subTab, setSubTab] = useState<"Profile" | "Links" | "Theme" | "Analytics">("Profile");
  const [profileUrl, setProfileUrl] = useState("happytap.com/profile/johndoe");
  const [upiId, setUpiId] = useState("pay@happytap");
  const [selectedTheme, setSelectedTheme] = useState<"purple" | "lavender" | "midnight" | "emerald">("purple");
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
        if (p.profileUrl !== undefined) setProfileUrl(p.profileUrl);
        if (p.upiId !== undefined) setUpiId(p.upiId);
        if (p.selectedTheme !== undefined) setSelectedTheme(p.selectedTheme);
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
      googleMapsLocation,
      profileUrl,
      upiId,
      selectedTheme
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

        {/* Website Theme Card */}
        <div className="profile-sidebar-theme-card">
          <h3>HappyTap Website Theme</h3>
          <p>Customize your digital profile with beautiful HappyTap themes and branding options.</p>
          <button 
            type="button" 
            className="btn profile-sidebar-theme-btn"
            onClick={() => {
              setActiveTab("Dashboard");
              setSubTab("Theme");
              setSidebarOpen(false);
            }}
          >
            Explore Themes
          </button>
        </div>

        <Link href="#" className="profile-sidebar-help" onClick={() => setSidebarOpen(false)}>
          <HelpCircle className="icon" aria-hidden />
          Help &amp; Support
        </Link>
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
                      {avatarSrc ? <img src={avatarSrc} alt="Avatar" /> : getInitials(fullName)}
                    </span>
                    <span className="profile-topbar-username">{fullName}</span>
                  </button>
                </>
              )}
            </div>
          </header>

          {activeTab === "Dashboard" && (
            <div className="dashboard-split-grid">
              {/* Left Column: Profile Editor */}
              <div className="profile-editor-card">
                {/* Editor Header */}
                <div className="editor-header">
                  <div>
                    <h2 className="editor-title">Profile Editor</h2>
                    <p className="editor-subtitle">Customize and publish your digital identity</p>
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-save-publish"
                    onClick={() => handleSave()}
                  >
                    {saved ? "✓ Saved & Published!" : "Save & Publish"}
                  </button>
                </div>

                {/* Sub-tabs */}
                <div className="editor-tabs-bar">
                  {(["Profile", "Links", "Theme", "Analytics"] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      className={`editor-tab-btn ${subTab === tab ? "active" : ""}`}
                      onClick={() => setSubTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="editor-tab-content">
                  {subTab === "Profile" && (
                    <div className="tab-pane-fade">
                      {/* Avatar Upload */}
                      <div className="editor-avatar-section">
                        <label className="field-label">Profile Image</label>
                        <div className="editor-avatar-row">
                          <div className="editor-avatar-preview">
                            {avatarSrc ? (
                              <img src={avatarSrc} alt="Avatar" />
                            ) : (
                              <span>{getInitials(fullName)}</span>
                            )}
                          </div>
                          <button 
                            type="button" 
                            className="btn btn-avatar-upload"
                            onClick={() => avatarInputRef.current?.click()}
                          >
                            Upload Photo
                          </button>
                          <input
                            ref={avatarInputRef}
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={(e) => handleFileChange(e, setAvatarSrc)}
                          />
                        </div>
                      </div>

                      {/* Fields */}
                      <div className="editor-form-group">
                        <label htmlFor="ed-fullName" className="field-label">Full Name</label>
                        <input
                          id="ed-fullName"
                          type="text"
                          className="editor-input"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. John Doe"
                        />
                      </div>

                      <div className="editor-form-row">
                        <div className="editor-form-group">
                          <label htmlFor="ed-designation" className="field-label">Job Title</label>
                          <input
                            id="ed-designation"
                            type="text"
                            className="editor-input"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            placeholder="e.g. Lead Designer"
                          />
                        </div>
                        <div className="editor-form-group">
                          <label htmlFor="ed-company" className="field-label">Company</label>
                          <input
                            id="ed-company"
                            type="text"
                            className="editor-input"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="e.g. HappyTap"
                          />
                        </div>
                      </div>

                      <div className="editor-form-group">
                        <label htmlFor="ed-bio" className="field-label">Bio</label>
                        <textarea
                          id="ed-bio"
                          className="editor-textarea"
                          rows={3}
                          value={companyDescription}
                          onChange={(e) => setCompanyDescription(e.target.value)}
                          placeholder="Short bio about you or your company..."
                        />
                      </div>

                      <div className="editor-form-row">
                        <div className="editor-form-group">
                          <label htmlFor="ed-email" className="field-label">Email</label>
                          <input
                            id="ed-email"
                            type="email"
                            className="editor-input"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            placeholder="name@company.com"
                          />
                        </div>
                        <div className="editor-form-group">
                          <label htmlFor="ed-phone" className="field-label">Phone</label>
                          <input
                            id="ed-phone"
                            type="tel"
                            className="editor-input"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            placeholder="e.g. +91 98765 43210"
                          />
                        </div>
                      </div>

                      <div className="editor-form-group">
                        <label htmlFor="ed-profileUrl" className="field-label">Profile URL</label>
                        <input
                          id="ed-profileUrl"
                          type="text"
                          className="editor-input"
                          value={profileUrl}
                          onChange={(e) => setProfileUrl(e.target.value)}
                          placeholder="happytap.com/profile/username"
                        />
                      </div>
                    </div>
                  )}

                  {subTab === "Links" && (
                    <div className="tab-pane-fade">
                      <h4 className="tab-section-title">Direct Buttons / CTA</h4>
                      
                      <div className="editor-form-group">
                        <label htmlFor="ed-whatsapp" className="field-label">WhatsApp Phone Number</label>
                        <input
                          id="ed-whatsapp"
                          type="tel"
                          className="editor-input"
                          value={whatsAppNumber}
                          onChange={(e) => setWhatsAppNumber(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                        />
                      </div>

                      <div className="editor-form-group">
                        <label htmlFor="ed-portfolio" className="field-label">Portfolio URL</label>
                        <input
                          id="ed-portfolio"
                          type="url"
                          className="editor-input"
                          value={portfolio}
                          onChange={(e) => setPortfolio(e.target.value)}
                          placeholder="https://portfolio.johndoe.com"
                        />
                      </div>

                      <div className="editor-form-group">
                        <label htmlFor="ed-upi" className="field-label">UPI ID / VPA (for Pay button)</label>
                        <input
                          id="ed-upi"
                          type="text"
                          className="editor-input"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. pay@happytap"
                        />
                      </div>

                      <h4 className="tab-section-title" style={{ marginTop: "24px" }}>Social Media Profiles</h4>
                      
                      <div className="editor-form-row">
                        <div className="editor-form-group">
                          <label htmlFor="ed-linkedin" className="field-label">LinkedIn</label>
                          <input
                            id="ed-linkedin"
                            type="url"
                            className="editor-input"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>
                        <div className="editor-form-group">
                          <label htmlFor="ed-instagram" className="field-label">Instagram</label>
                          <input
                            id="ed-instagram"
                            type="url"
                            className="editor-input"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            placeholder="https://instagram.com/username"
                          />
                        </div>
                      </div>

                      <div className="editor-form-row">
                        <div className="editor-form-group">
                          <label htmlFor="ed-facebook" className="field-label">Facebook</label>
                          <input
                            id="ed-facebook"
                            type="url"
                            className="editor-input"
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                            placeholder="https://facebook.com/username"
                          />
                        </div>
                        <div className="editor-form-group">
                          <label htmlFor="ed-twitter" className="field-label">X (Twitter)</label>
                          <input
                            id="ed-twitter"
                            type="url"
                            className="editor-input"
                            value={twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                            placeholder="https://x.com/username"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {subTab === "Theme" && (
                    <div className="tab-pane-fade">
                      <h4 className="tab-section-title">Select Preset Theme</h4>
                      <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "-8px 0 16px" }}>
                        Choose a design style to apply to your live digital business card.
                      </p>
                      
                      <div className="presets-grid">
                        {[
                          { id: "purple", name: "Classic Violet", primary: "#7c5dfa", bg: "linear-gradient(135deg, #ede9fe 0%, #f5f3ff 100%)" },
                          { id: "lavender", name: "Lavender Mist", primary: "#a855f7", bg: "linear-gradient(135deg, #fae8ff 0%, #f5f3ff 100%)" },
                          { id: "midnight", name: "Dark Midnight", primary: "#0f172a", bg: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" },
                          { id: "emerald", name: "Emerald Glass", primary: "#10b981", bg: "linear-gradient(135deg, #d1fae5 0%, #ecfdf5 100%)" }
                        ].map((preset) => (
                          <button
                            key={preset.id}
                            type="button"
                            className={`preset-card ${selectedTheme === preset.id ? "active" : ""}`}
                            onClick={() => setSelectedTheme(preset.id as any)}
                          >
                            <div className="preset-color-indicator" style={{ background: preset.primary }}></div>
                            <span className="preset-name">{preset.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {subTab === "Analytics" && (
                    <div className="tab-pane-fade">
                      <h4 className="tab-section-title">Traffic Overview</h4>
                      
                      <div className="analytics-mini-grid">
                        <div className="mini-stat-card">
                          <span className="stat-label">Total Views</span>
                          <span className="stat-value">2,847</span>
                          <span className="stat-change positive">+14.2%</span>
                        </div>
                        <div className="mini-stat-card">
                          <span className="stat-label">Link Clicks</span>
                          <span className="stat-value">648</span>
                          <span className="stat-change positive">+8.6%</span>
                        </div>
                        <div className="mini-stat-card">
                          <span className="stat-label">CTR</span>
                          <span className="stat-value">22.8%</span>
                          <span className="stat-change negative">-1.2%</span>
                        </div>
                      </div>

                      <div className="mini-chart-card">
                        <h4>Tap Performance (Last 7 Days)</h4>
                        <div className="mini-chart-placeholder">
                          {[42, 55, 48, 70, 85, 64, 98].map((val, idx) => (
                            <div key={idx} className="chart-bar-col">
                              <div className="chart-bar" style={{ height: `${val}%` }}>
                                <span className="tooltip">{val} Taps</span>
                              </div>
                              <span className="chart-day-label">{["M", "T", "W", "T", "F", "S", "S"][idx]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Live Mobile Preview */}
              <div className="live-preview-card">
                <h3 className="preview-card-title">Live Preview</h3>
                <div className="mobile-mockup-wrap">
                  <div className="phone-mockup border-thick">
                    {/* Speaker notch */}
                    <div className="phone-notch"></div>
                    
                    {/* Status Bar */}
                    <div className="phone-status-bar">
                      <span>9:41</span>
                      <div className="phone-status-icons">
                        <Wifi size={12} style={{ transform: "rotate(90deg)" }} />
                        <div className="phone-battery"></div>
                      </div>
                    </div>

                    {/* Scrollable mockup content */}
                    <div className={`phone-content theme-${selectedTheme}`}>
                      {/* Cover Gradient/Image */}
                      <div 
                        className="mock-cover-bg"
                        style={coverSrc ? { backgroundImage: `url(${coverSrc})` } : undefined}
                      >
                        {!coverSrc && <div className="mock-cover-overlay"></div>}
                      </div>

                      {/* Avatar preview */}
                      <div className="mock-avatar-wrap">
                        <div className="mock-avatar-ring">
                          {avatarSrc ? (
                            <img src={avatarSrc} alt="Avatar" />
                          ) : (
                            <span className="mock-avatar-initials">{getInitials(fullName)}</span>
                          )}
                        </div>
                      </div>

                      {/* Identity Details */}
                      <div className="mock-identity-block">
                        <h3 className="mock-name">{fullName || "John Doe"}</h3>
                        <p className="mock-designation">
                          {designation || "Lead Designer"} {companyName ? `@ ${companyName}` : ""}
                        </p>
                        {companyDescription && <p className="mock-bio">{companyDescription}</p>}
                      </div>

                      {/* CTA Action Buttons */}
                      <div className="mock-cta-buttons">
                        {whatsAppNumber && (
                          <a 
                            href={`https://wa.me/${whatsAppNumber.replace(/[^0-9]/g, "")}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="mock-cta-btn whatsapp-btn"
                          >
                            <MessageSquare size={16} />
                            <span>Chat on WhatsApp</span>
                          </a>
                        )}
                        {portfolio && (
                          <a 
                            href={portfolio} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="mock-cta-btn portfolio-btn"
                          >
                            <Globe size={16} />
                            <span>View Portfolio</span>
                          </a>
                        )}
                        {upiId && (
                          <a 
                            href={`upi://pay?pa=${upiId}`} 
                            className="mock-cta-btn upi-btn"
                          >
                            <CreditCard size={16} />
                            <span>Pay via UPI</span>
                          </a>
                        )}
                      </div>

                      {/* Social Grid */}
                      <div className="mock-socials-grid">
                        {linkedin && (
                          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="mock-social-icon-btn">
                            <Linkedin size={18} />
                          </a>
                        )}
                        {instagram && (
                          <a href={instagram} target="_blank" rel="noopener noreferrer" className="mock-social-icon-btn">
                            <Instagram size={18} />
                          </a>
                        )}
                        {facebook && (
                          <a href={facebook} target="_blank" rel="noopener noreferrer" className="mock-social-icon-btn">
                            <Facebook size={18} />
                          </a>
                        )}
                        {twitter && (
                          <a href={twitter} target="_blank" rel="noopener noreferrer" className="mock-social-icon-btn">
                            <Twitter size={18} />
                          </a>
                        )}
                      </div>

                      {/* Branding Footer */}
                      <div className="mock-branding-footer">
                        <span>Powered by</span>
                        <span className="brand-logo">HappyTap</span>
                      </div>
                    </div>
                  </div>
                </div>
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
