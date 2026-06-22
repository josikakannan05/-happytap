"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  CreditCard,
  ShoppingBag,
  LogOut,
  Bell,
  Search,
  Upload,
  Star,
  Wifi,
  Sparkles,
  ShieldCheck,
  Trash2,
  CheckCircle2,
  Info,
  FileText,
  Layers,
  Zap,
  Edit,
} from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("Cards");

  // Form States
  const [cardName, setCardName] = useState("");
  const [theme, setTheme] = useState("Minimal Series");
  const [price, setPrice] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [ratingValue, setRatingValue] = useState("");
  const [reviewsCount, setReviewsCount] = useState("");

  // Features Toggles
  const [nfcEnabled, setNfcEnabled] = useState(true);
  const [instantSharing, setInstantSharing] = useState(true);
  const [noAppRequired, setNoAppRequired] = useState(true);
  const [worksEverywhere, setWorksEverywhere] = useState(true);

  // Uploaded Images (Base64)
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);

  // File Inputs Refs
  const mainInputRef = useRef<HTMLInputElement>(null);
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  // Toast / Status state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Helper for word counts
  const getWordCount = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  };

  const shortWordCount = getWordCount(shortDescription);
  const fullWordCount = getWordCount(fullDescription);

  // FileReader handler
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (src: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast("Error: Image size exceeds 5MB limit!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setter(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardName.trim()) {
      showToast("Please enter a Card Name!");
      return;
    }
    if (!price.trim()) {
      showToast("Please enter a Price!");
      return;
    }

    setIsSaving(true);

    const cardId = cardName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const themeSlug = theme.toLowerCase().replace(/\s+/g, "-");

    // Construct style object based on chosen theme
    let backgroundStyle = "linear-gradient(135deg, #0f0f13 0%, #1a1a24 100%)";
    let logoColor: "gold" | "silver" | "white" | "rose" = "silver";
    let coreColor = "side-core-black";
    let borderStyle = "";

    if (theme === "Metal Edition") {
      backgroundStyle = "linear-gradient(135deg, #2a2a2e 0%, #151517 100%)";
      logoColor = "silver";
      coreColor = "side-core-silver";
    } else if (theme === "Executive Collection") {
      backgroundStyle = "linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%)";
      logoColor = "gold";
      coreColor = "side-core-gold";
    } else if (theme === "Team Edition") {
      backgroundStyle = "#121214";
      logoColor = "gold";
      coreColor = "side-core-gold";
    }

    const cardProduct = {
      id: cardId,
      title: cardName,
      price: Number(price) || 0,
      description: fullDescription || "No full description provided.",
      shortDescription: shortDescription || "No short description.",
      colorName: theme,
      category: "Custom",
      rating: Number(ratingValue) || 4.9,
      reviewsCount: Number(reviewsCount) || 128,
      features: {
        nfcEnabled,
        instantSharing,
        noAppRequired,
        worksEverywhere,
      },
      images: {
        main: mainImage,
        front: frontImage,
        back: backImage,
        side: null,
      },
      cardStyle: {
        background: backgroundStyle,
        logoStyle: logoColor,
        sideCoreClass: coreColor,
        border: borderStyle || undefined,
      },
      isTeamLayout: theme === "Team Edition",
    };

    setTimeout(() => {
      try {
        const storedCards = JSON.parse(localStorage.getItem("happytap_custom_cards") || "[]");
        const filtered = storedCards.filter((c: any) => c.id !== cardId);
        const updated = [...filtered, cardProduct];
        localStorage.setItem("happytap_custom_cards", JSON.stringify(updated));

        showToast("✓ Card saved successfully! Redirecting...");
        setTimeout(() => {
          window.location.href = `/cards/${themeSlug}/${cardId}`;
        }, 1500);
      } catch (err) {
        showToast("Failed to save card. Storage might be full.");
        setIsSaving(false);
      }
    }, 1000);
  };

  return (
    <div className="admin-shell">
      {/* ── Background Ambient Decorations ── */}
      <div className="admin-bg-decorations">
        <div className="admin-orb admin-orb-1" />
        <div className="admin-orb admin-orb-2" />
        <div className="admin-orb admin-orb-3" />
        <div className="admin-bg-sparkles" />
        <div className="admin-bg-waves" />
      </div>

      {/* ── Sidebar ── */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Link href="/" className="admin-sidebar-logo">
            <div className="admin-logo-mark" style={{ fontWeight: 900, fontSize: "1.05rem" }}>
              Ht
            </div>
            <span>HAPPYTAP</span>
          </Link>
        </div>

        <span className="admin-sidebar-title">Admin Panel</span>

        <div className="admin-sidebar-nav">
          <a
            href="#"
            className={`admin-sidebar-link ${activeTab === "Dashboard" ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); setActiveTab("Dashboard"); }}
          >
            <LayoutDashboard className="icon" />
            Dashboard
          </a>
          <a
            href="#"
            className={`admin-sidebar-link ${activeTab === "Cards" ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); setActiveTab("Cards"); }}
          >
            <CreditCard className="icon" />
            Cards
          </a>
          <a
            href="#"
            className={`admin-sidebar-link ${activeTab === "Orders" ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); setActiveTab("Orders"); }}
          >
            <ShoppingBag className="icon" />
            Orders
          </a>
        </div>

        <div className="admin-sidebar-footer">
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="admin-logout-btn"
          >
            <LogOut className="icon" />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div>
            <div className="admin-breadcrumb" aria-label="Breadcrumb">
              <Link href="#">Cards</Link>
              <span className="admin-breadcrumb-separator">&gt;</span>
              <span style={{ color: "#0f172a" }}>Add New Card</span>
            </div>
            <h1 className="admin-page-title">
              Add New Card <span style={{ color: "var(--admin-purple)" }}>✨</span>
            </h1>
            <p className="admin-page-sub">
              Create a new card with all details. All fields are required unless marked optional.
            </p>
          </div>

          <div className="admin-topbar-right">
            <div className="admin-search-wrapper">
              <Search className="admin-search-icon" />
              <input
                type="text"
                placeholder="Search cards..."
                className="admin-search-input"
              />
            </div>

            <button className="admin-notif-btn" aria-label="Notifications">
              <Bell size={18} />
              <span className="admin-notif-badge">3</span>
            </button>

            <div className="admin-user-profile">
              <span className="admin-user-avatar">
                <span>AD</span>
              </span>
              <div className="admin-user-info">
                <span className="admin-user-name">Admin User</span>
                <span className="admin-user-role">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Container */}
        {activeTab === "Cards" ? (
          <form onSubmit={handleSaveCard} className="admin-container">
            {/* Grid Row 1 (4 Columns) */}
            <div className="admin-form-grid-row-1">
              {/* Card 1: Basic Information */}
              <div className="admin-card">
                <h3 className="admin-card-title">
                  <span className="admin-card-title-left">
                    <span className="admin-card-title-step">1</span> Basic Information
                  </span>
                  <Info size={16} className="admin-card-title-icon" />
                </h3>

                <div className="admin-field">
                  <label htmlFor="card-name">Card Name</label>
                  <div className="admin-input-wrapper">
                    <input
                      id="card-name"
                      type="text"
                      placeholder="Enter card name"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="admin-input"
                      required
                    />
                    <FileText className="admin-input-icon" size={16} />
                  </div>
                </div>

                <div className="admin-field">
                  <label htmlFor="theme-select">Theme / Collection</label>
                  <div className="admin-select-wrapper">
                    <Layers className="admin-select-icon-left" size={16} />
                    <select
                      id="theme-select"
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="admin-select"
                    >
                      <option value="Minimal Series">Minimal Series</option>
                      <option value="Metal Edition">Metal Edition</option>
                      <option value="Executive Collection">Executive Collection</option>
                      <option value="Team Edition">Team Edition</option>
                    </select>
                  </div>
                </div>

                <div className="admin-field">
                  <label htmlFor="price">Price (₹)</label>
                  <div className="admin-input-wrapper">
                    <input
                      id="price"
                      type="number"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="admin-input"
                      required
                    />
                    <span className="admin-input-icon" style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--admin-purple)" }}>₹</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Descriptions */}
              <div className="admin-card">
                <h3 className="admin-card-title">
                  <span className="admin-card-title-left">
                    <span className="admin-card-title-step">2</span> Descriptions
                  </span>
                  <Edit size={16} className="admin-card-title-icon" />
                </h3>

                <div className="admin-field">
                  <label htmlFor="short-desc">Short Description (12–15 words)</label>
                  <textarea
                    id="short-desc"
                    placeholder="Enter short description for card..."
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    className="admin-textarea"
                    rows={2}
                  />
                  <span
                    className={`admin-counter ${
                      shortWordCount < 12 || shortWordCount > 15
                        ? shortWordCount === 0
                          ? ""
                          : "warning"
                        : ""
                    }`}
                  >
                    {shortWordCount} / 15 words
                  </span>
                </div>

                <div className="admin-field">
                  <label htmlFor="full-desc">Full Description (25–30 words)</label>
                  <textarea
                    id="full-desc"
                    placeholder="Enter full description for card..."
                    value={fullDescription}
                    onChange={(e) => setFullDescription(e.target.value)}
                    className="admin-textarea"
                    rows={4}
                  />
                  <span
                    className={`admin-counter ${
                      fullWordCount < 25 || fullWordCount > 30
                        ? fullWordCount === 0
                          ? ""
                          : "warning"
                        : ""
                    }`}
                  >
                    {fullWordCount} / 30 words
                  </span>
                </div>
              </div>

              {/* Card 3: Rating */}
              <div className="admin-card">
                <h3 className="admin-card-title">
                  <span className="admin-card-title-left">
                    <span className="admin-card-title-step">3</span> Rating
                  </span>
                  <Star size={16} className="admin-card-title-icon" />
                </h3>

                <div className="admin-field">
                  <label htmlFor="rating-val">Rating Value</label>
                  <input
                    id="rating-val"
                    type="text"
                    placeholder="e.g. 4.9"
                    value={ratingValue}
                    onChange={(e) => setRatingValue(e.target.value)}
                    className="admin-input"
                  />
                  <span className="admin-counter-help">
                    Enter rating out of 5
                  </span>
                </div>

                <div className="admin-field">
                  <label htmlFor="reviews-count">Number of Reviews</label>
                  <input
                    id="reviews-count"
                    type="number"
                    placeholder="e.g. 128"
                    value={reviewsCount}
                    onChange={(e) => setReviewsCount(e.target.value)}
                    className="admin-input"
                  />
                  <span className="admin-counter-help">
                    Total number of reviews
                  </span>
                </div>
              </div>

              {/* Card 4: Features */}
              <div className="admin-card">
                <h3 className="admin-card-title">
                  <span className="admin-card-title-left">
                    <span className="admin-card-title-step">4</span> Features
                  </span>
                  <Zap size={16} className="admin-card-title-icon" />
                </h3>
                <span className="admin-card-subtitle">Enable or disable features for this card</span>

                <div className="admin-toggle-row">
                  <div className="admin-toggle-info">
                    <span className="admin-toggle-label">NFC Enabled</span>
                    <span className="admin-toggle-desc">Enable NFC functionality</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNfcEnabled(!nfcEnabled)}
                    className={`admin-toggle-switch ${nfcEnabled ? "active" : ""}`}
                    aria-label="Toggle NFC Enabled"
                  >
                    <span className="admin-toggle-handle" />
                  </button>
                </div>

                <div className="admin-toggle-row">
                  <div className="admin-toggle-info">
                    <span className="admin-toggle-label">Instant Sharing</span>
                    <span className="admin-toggle-desc">Enable instant sharing</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setInstantSharing(!instantSharing)}
                    className={`admin-toggle-switch ${instantSharing ? "active" : ""}`}
                    aria-label="Toggle Instant Sharing"
                  >
                    <span className="admin-toggle-handle" />
                  </button>
                </div>

                <div className="admin-toggle-row">
                  <div className="admin-toggle-info">
                    <span className="admin-toggle-label">No App Required</span>
                    <span className="admin-toggle-desc">Works without any app</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNoAppRequired(!noAppRequired)}
                    className={`admin-toggle-switch ${noAppRequired ? "active" : ""}`}
                    aria-label="Toggle No App Required"
                  >
                    <span className="admin-toggle-handle" />
                  </button>
                </div>

                <div className="admin-toggle-row">
                  <div className="admin-toggle-info">
                    <span className="admin-toggle-label">Works Everywhere</span>
                    <span className="admin-toggle-desc">Global compatibility</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setWorksEverywhere(!worksEverywhere)}
                    className={`admin-toggle-switch ${worksEverywhere ? "active" : ""}`}
                    aria-label="Toggle Works Everywhere"
                  >
                    <span className="admin-toggle-handle" />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid Row 2 (Images & Preview) */}
            <div className="admin-form-grid-row-2">
              {/* Card 5: Images Upload */}
              <div className="admin-card">
                <h3 className="admin-card-title">
                  <span className="admin-card-title-left">
                    <span className="admin-card-title-step">5</span> Images
                  </span>
                  <Upload size={16} className="admin-card-title-icon" />
                </h3>
                <span className="admin-card-subtitle">Upload all images for the card</span>

                <div className="admin-images-grid">
                  {/* Main Image Slot */}
                  <div className="admin-field">
                    <span className="admin-upload-label">Main Card Image</span>
                    <div
                      onClick={() => mainInputRef.current?.click()}
                      className="admin-upload-zone-main"
                    >
                      {mainImage ? (
                        <div className="admin-preview-img-wrapper">
                          <img src={mainImage} alt="Main Card preview" className="admin-preview-img-contain" />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setMainImage(null);
                            }}
                            className="admin-remove-image-btn"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="admin-upload-icon-wrap">
                            <Upload size={20} />
                          </div>
                          <span className="admin-upload-text">
                            <span className="admin-upload-text-highlight">Drag & drop or click to upload</span>
                          </span>
                          <span className="admin-upload-subtext">PNG, JPG or WEBP (Max. 5MB)</span>
                        </>
                      )}
                    </div>
                    <input
                      ref={mainInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, setMainImage)}
                      className="sr-only"
                    />
                  </div>

                  {/* Previews Row: 5 square slots */}
                  <div className="admin-field">
                    <span className="admin-upload-label">Alternative Views</span>
                    <div className="admin-images-row">
                      {/* Slot 1: Front */}
                      <div onClick={() => frontInputRef.current?.click()} className="admin-upload-zone-thumb">
                        {frontImage ? (
                          <div className="admin-preview-img-wrapper">
                            <img src={frontImage} alt="Front preview" className="admin-preview-img" />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFrontImage(null);
                              }}
                              className="admin-remove-image-btn"
                            >
                              <Trash2 size={10} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="admin-thumb-plus">+</span>
                            <span className="admin-thumb-label">Front</span>
                          </>
                        )}
                      </div>
                      <input
                        ref={frontInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, setFrontImage)}
                        className="sr-only"
                      />

                      {/* Slot 2: Back */}
                      <div onClick={() => backInputRef.current?.click()} className="admin-upload-zone-thumb">
                        {backImage ? (
                          <div className="admin-preview-img-wrapper">
                            <img src={backImage} alt="Back preview" className="admin-preview-img" />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setBackImage(null);
                              }}
                              className="admin-remove-image-btn"
                            >
                              <Trash2 size={10} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="admin-thumb-plus">+</span>
                            <span className="admin-thumb-label">Back</span>
                          </>
                        )}
                      </div>
                      <input
                        ref={backInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, setBackImage)}
                        className="sr-only"
                      />


                    </div>
                  </div>
                </div>
              </div>

              {/* Card 6: Live Preview */}
              <div className="admin-card">
                <h3 className="admin-card-title">
                  <span className="admin-card-title-left">
                    <span className="admin-card-title-step">6</span> Live Preview
                  </span>
                  <Star size={16} className="admin-card-title-icon" style={{ fill: "none" }} />
                </h3>
                <span className="admin-card-subtitle">This is how the card will appear on the product details page.</span>

                <div className="admin-preview-layout">
                  {/* Left: Card Mockup */}
                  <div className="admin-preview-card-col">
                    <div className="admin-mockup-card">
                      {frontImage ? (
                        <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
                          <img src={frontImage} alt="Front View" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      ) : (
                        <>
                          <div
                            className="admin-mockup-waves-bg"
                            style={{
                              background:
                                theme === "Metal Edition"
                                  ? "linear-gradient(135deg, #2a2a2e 0%, #151517 100%)"
                                  : theme === "Executive Collection"
                                  ? "linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%)"
                                  : theme === "Team Edition"
                                  ? "#121214"
                                  : "linear-gradient(135deg, #7c5dfa 0%, #4c2ce0 100%)",
                            }}
                          />
                          <div className="admin-mockup-decor" />
                          <div className="admin-mockup-top">
                            <div className="admin-mockup-nfc">
                              <Wifi size={18} style={{ transform: "rotate(90deg)" }} />
                            </div>
                            <div className="admin-mockup-logo">
                              H<span className="admin-mockup-logo-mark">t</span>
                            </div>
                          </div>
                          <div className="admin-mockup-bottom">
                            <span className="admin-mockup-name">{cardName || "HAPPYTAP CARD"}</span>
                            <div className="admin-mockup-chip" />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right: Text details */}
                  <div className="admin-preview-info-col">
                    <div className="admin-preview-header-row">
                      <span className="admin-preview-collection">{theme}</span>
                      <span className="admin-preview-rating-badge">
                        <Star />
                        {ratingValue || "4.9"}
                      </span>
                    </div>

                    <h2 className="admin-preview-product-name">{cardName || "Card Name"}</h2>
                    <p className="admin-preview-desc">
                      {fullDescription || "Premium NFC card styled for elite modern networking profile connectivity."}
                    </p>

                    <div className="admin-preview-badges">
                      {nfcEnabled && (
                        <span className="admin-preview-badge-item">
                          <Wifi style={{ transform: "rotate(90deg)" }} />
                          NFC Enabled
                        </span>
                      )}
                      {instantSharing && (
                        <span className="admin-preview-badge-item">
                          <Sparkles />
                          Instant Sharing
                        </span>
                      )}
                      {noAppRequired && (
                        <span className="admin-preview-badge-item">
                          <ShieldCheck />
                          No App Required
                        </span>
                      )}
                    </div>

                    <div className="admin-preview-footer">
                      <span className="admin-preview-reviews">{reviewsCount || "128"} Reviews</span>
                      <span className="admin-preview-price">₹{price || "499"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="admin-actions-bar">
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/";
                }}
                className="admin-btn-cancel"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="admin-btn-save"
              >
                {isSaving ? "Saving Card..." : "Create Card →"}
              </button>
            </div>
          </form>
        ) : (
          /* Other Tabs Coming Soon fallback */
          <div className="profile-coming-soon" style={{ padding: "80px 20px" }}>
            <div className="coming-soon-card">
              <div className="coming-soon-icon">
                <Sparkles size={24} />
              </div>
              <h2>{activeTab} Content</h2>
              <p>This section is under development and will be available soon in the Admin Panel.</p>
            </div>
          </div>
        )}
      </main>

      {/* Floating success notifications */}
      {toastMessage && (
        <div
          className="pf-toast"
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            bottom: "40px",
            right: "40px",
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            padding: "16px 24px",
            borderRadius: "100px",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#1e293b",
          }}
        >
          <CheckCircle2 className="icon" style={{ color: "#4ade80" }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
