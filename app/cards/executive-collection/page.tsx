"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShieldCheck,
  RefreshCw,
  Truck,
  Award,
  ArrowRight,
  Sparkles,
  Wifi,
  Mail,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import { Reveal } from "@/components/Reveal";

interface Product {
  id: string;
  title: string;
  category: "Standard" | "Premium" | "Luxury" | "Signature" | "Executive";
  price: number;
  description: string;
  colorName: string;
  cssClass: string;
  cardStyle: {
    logoStyle: "gold" | "silver" | "white" | "rose";
    isLight?: boolean;
    border?: string;
  };
  hasExtraLines?: "graphite" | "prestige" | "titanium" | "legacy";
}

const productsData: Product[] = [
  {
    id: "executive-classic",
    title: "Executive Classic",
    category: "Standard",
    price: 3999,
    description: "Midnight black body enhanced by a premium radial gold wave pattern.",
    colorName: "Gold Wave Accent",
    cssClass: "ec-card-classic",
    cardStyle: {
      logoStyle: "gold",
    },
  },
  {
    id: "executive-graphite",
    title: "Executive Graphite",
    category: "Standard",
    price: 4499,
    description: "Geometric matte texture design on a deep graphite background.",
    colorName: "Graphite Charcoal",
    cssClass: "ec-card-graphite",
    cardStyle: {
      logoStyle: "silver",
    },
    hasExtraLines: "graphite",
  },
  {
    id: "executive-rose-gold",
    title: "Executive Rose Gold",
    category: "Premium",
    price: 4999,
    description: "Brushed metal finish reflecting a warm rose-gold metallic luster.",
    colorName: "Rose Gold Finish",
    cssClass: "ec-card-rosegold",
    cardStyle: {
      logoStyle: "rose",
      isLight: true,
    },
  },
  {
    id: "executive-prestige",
    title: "Executive Prestige",
    category: "Premium",
    price: 5499,
    description: "Elegant diamond quilt pattern engraved into a premium executive body.",
    colorName: "Midnight Prestige",
    cssClass: "ec-card-prestige",
    cardStyle: {
      logoStyle: "gold",
    },
    hasExtraLines: "prestige",
  },
  {
    id: "executive-titanium",
    title: "Executive Titanium",
    category: "Luxury",
    price: 5999,
    description: "Modern hexagon metal texture design with a satin titanium silver coat.",
    colorName: "Titanium Hexagon",
    cssClass: "ec-card-titanium",
    cardStyle: {
      logoStyle: "silver",
      isLight: true,
    },
    hasExtraLines: "titanium",
  },
  {
    id: "executive-elite",
    title: "Executive Elite",
    category: "Luxury",
    price: 6999,
    description: "Stunning diagonal gold lines across an elite deep charcoal surface.",
    colorName: "Elite Diagonal Gold",
    cssClass: "ec-card-elite",
    cardStyle: {
      logoStyle: "gold",
    },
  },
  {
    id: "executive-chairman",
    title: "Executive Chairman",
    category: "Executive",
    price: 7499,
    description: "Exquisite combination of rich mahogany wood veneer and rose-gold finish.",
    colorName: "Mahogany & Gold",
    cssClass: "ec-card-chairman",
    cardStyle: {
      logoStyle: "gold",
      isLight: true,
    },
  },
  {
    id: "executive-black-label",
    title: "Executive Black Label",
    category: "Executive",
    price: 7999,
    description: "Deep obsidian matte background with premium horizontal micro-textures.",
    colorName: "Obsidian Black",
    cssClass: "ec-card-blacklabel",
    cardStyle: {
      logoStyle: "white",
    },
  },
  {
    id: "executive-signature",
    title: "Executive Signature",
    category: "Signature",
    price: 8999,
    description: "Minimalist executive card defined by double 24k polished gold borders.",
    colorName: "Double Gold Border",
    cssClass: "ec-card-signature",
    cardStyle: {
      logoStyle: "gold",
    },
  },
  {
    id: "executive-legacy",
    title: "Executive Legacy",
    category: "Signature",
    price: 9999,
    description: "Flagship royal emblem and crest design reflecting heritage and prestige.",
    colorName: "Royal Emblem",
    cssClass: "ec-card-legacy",
    cardStyle: {
      logoStyle: "gold",
    },
    hasExtraLines: "legacy",
  },
];

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Elevated Quality",
    description: "Crafted with precision and premium materials",
  },
  {
    icon: Award,
    title: "Lifetime Warranty",
    description: "We stand by the quality of our products",
  },
  {
    icon: RefreshCw,
    title: "7 Days Return",
    description: "Hassle-free returns for your peace of mind",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on all orders",
  },
];

export default function ExecutiveCollectionPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [sortBy, setSortBy] = useState("Popular");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<string | null>(null);

  const filters = ["All", "Standard", "Premium", "Luxury", "Signature", "Executive"];

  const openAuth = (tab: "login" | "signup") => {
    setAuthTab(tab);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (name: string) => {
    setUser(name);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const toggleFavorite = (id: string, name: string) => {
    setFavorites((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      showToast(updated[id] ? `Added ${name} to favorites` : `Removed ${name} from favorites`);
      return updated;
    });
  };

  const handleAddToCart = (name: string) => {
    showToast(`Added ${name} to cart successfully!`);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    showToast("Subscribed successfully! Welcome to the executive circle.");
    setEmailInput("");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  // Filter products
  const filteredProducts = productsData.filter((product) => {
    if (activeFilter === "All") return true;
    return product.category === activeFilter;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    return 0;
  });

  const getLogoMarkStyle = (logoStyle: "gold" | "silver" | "white" | "rose") => {
    if (logoStyle === "rose") {
      return {
        background: "linear-gradient(135deg, #b87b6a 0%, #f3d4cc 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      };
    }
    return {};
  };

  return (
    <>
      <Navbar
        onLoginClick={() => openAuth("login")}
        user={user}
        onLogout={handleLogout}
      />

      <div className="executive-collection-page">
        {/* Back Button */}
        <div className="container" style={{ paddingTop: "24px" }}>
          <Link
            href="/cards"
            className="back-button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              color: "#86868b",
              fontSize: "0.9rem",
              fontWeight: "600",
            }}
          >
            <ArrowLeft className="icon icon-sm" />
            <span>Back to All Cards</span>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="ec-hero-section">
          <div className="container">
            <div className="ec-hero-grid">
              <div className="ec-hero-content">
                <Reveal>
                  <span className="ec-badge">
                    <Sparkles className="icon icon-sm" style={{ marginRight: "4px" }} />
                    Executive Collection
                  </span>
                </Reveal>
                <Reveal delay={100}>
                  <h1>
                    Executive <br />
                    <span className="ec-gradient-text">Collection</span>
                  </h1>
                </Reveal>
                <Reveal delay={200}>
                  <p className="ec-hero-subtitle">
                    Premium identity for leadership presence. <br className="hide-mobile" />
                    Crafted for visionaries. Designed to impress.
                  </p>
                </Reveal>
                <Reveal delay={300}>
                  <div className="me-feature-row" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "32px" }}>
                    <span className="me-feature-tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: "600", padding: "6px 14px", borderRadius: "100px", border: "1px solid rgba(0, 0, 0, 0.08)", background: "#FFFFFF", color: "#515154" }}>
                      <Wifi className="icon icon-sm" style={{ transform: "rotate(90deg)" }} />
                      NFC Enabled
                    </span>
                    <span className="me-feature-tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: "600", padding: "6px 14px", borderRadius: "100px", border: "1px solid rgba(0, 0, 0, 0.08)", background: "#FFFFFF", color: "#515154" }}>
                      <Sparkles className="icon icon-sm" />
                      Instant Sharing
                    </span>
                    <span className="me-feature-tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: "600", padding: "6px 14px", borderRadius: "100px", border: "1px solid rgba(0, 0, 0, 0.08)", background: "#FFFFFF", color: "#515154" }}>
                      <ShieldCheck className="icon icon-sm" />
                      No App Required
                    </span>
                    <span className="me-feature-tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: "600", padding: "6px 14px", borderRadius: "100px", border: "1px solid rgba(0, 0, 0, 0.08)", background: "#FFFFFF", color: "#515154" }}>
                      <Award className="icon icon-sm" />
                      Works Everywhere
                    </span>
                  </div>
                </Reveal>
                <Reveal delay={400}>
                  <div className="ec-count-label">
                    <span className="ec-count-num">10</span> Exclusive Designs
                  </div>
                </Reveal>
              </div>

              <div className="ec-hero-visual">
                <div className="ec-glow-ring"></div>
                <div className="ec-platform">
                  <div className="ec-platform-highlight"></div>
                </div>
                <img
                  src="/image/product-executive.png"
                  alt="Executive Collection Showcase Mockup"
                  className="ec-showcase-card"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pill Filters & Sorting Bar */}
        <section style={{ padding: "0 0 20px" }}>
          <div className="container">
            <Reveal>
              <div className="ec-filters-bar">
                <div className="ec-filters-pills">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      className={`ec-filter-pill ${activeFilter === filter ? "active" : ""}`}
                      onClick={() => setActiveFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <div className="ec-sort-dropdown-wrap" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", color: "#86868b" }}>
                  <span>Sort by:</span>
                  <select
                    className="ec-sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="Popular">Popular</option>
                    <option value="Price: Low to High">Price: Low to High</option>
                    <option value="Price: High to Low">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Product Grid Section */}
        <section className="ec-collection-section">
          <div className="container">
            <div className="ec-grid-5">
              <AnimatePresence mode="popLayout">
                {sortedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    <div className="ec-product-card">
                      {/* Heart Button */}
                      <button
                        className={`ec-favorite-btn ${favorites[product.id] ? "active" : ""}`}
                        onClick={() => toggleFavorite(product.id, product.title)}
                        aria-label="Add to favorites"
                      >
                        <Heart
                          className="icon"
                          style={{
                            fill: favorites[product.id] ? "#ff4757" : "none",
                            color: favorites[product.id] ? "#ff4757" : "currentColor",
                          }}
                        />
                      </button>

                      {/* Card Preview Area */}
                      <div className="ec-card-preview-area">
                        <div
                          className={`ec-card-mockup ${product.cssClass}`}
                          style={{
                            border: product.cardStyle.border || "1px solid rgba(255, 255, 255, 0.08)",
                          }}
                        >
                          <div className="ec-card-mockup-glare"></div>

                          {/* Extra textures needed for specific designs */}
                          {product.hasExtraLines === "graphite" && (
                            <div className="ec-card-graphite-lines" />
                          )}
                          {product.hasExtraLines === "prestige" && (
                            <div className="ec-card-prestige-texture" />
                          )}
                          {product.hasExtraLines === "titanium" && (
                            <div className="ec-card-titanium-texture" />
                          )}
                          {product.hasExtraLines === "legacy" && (
                            <div className="ec-card-legacy-crest">
                              <Award
                                className="icon"
                                style={{
                                  width: "26px",
                                  height: "26px",
                                  color: "rgba(212, 175, 55, 0.75)",
                                }}
                              />
                            </div>
                          )}

                          {/* Logo mark */}
                          <div
                            className={`ec-mock-logo ${
                              product.cardStyle.isLight ? "light-card-text" : ""
                            }`}
                          >
                            H
                            <span
                              className={`ec-mock-logo-mark ${
                                product.cardStyle.logoStyle === "gold" ? "gold-logo" : ""
                              }`}
                              style={getLogoMarkStyle(product.cardStyle.logoStyle)}
                            >
                              t
                            </span>
                          </div>

                          {/* Branding Details */}
                          <div className="ec-mock-details">
                            <div
                              className={`ec-mock-brand ${
                                product.cardStyle.isLight ? "light-card-text" : ""
                              }`}
                            >
                              HAPPYTAP
                            </div>
                            <div
                              className={`ec-mock-chip ${
                                product.cardStyle.isLight ? "light-card-text" : ""
                              }`}
                            >
                              <Wifi
                                className="icon icon-sm"
                                style={{ transform: "rotate(90deg)" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Info Area */}
                      <div className="ec-product-details">
                        <span className="ms-product-tag" style={{ color: "#86868b", fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          {product.category}
                        </span>
                        <h3>{product.title}</h3>
                        <span className="ec-product-price">₹{product.price.toLocaleString()}</span>
                      </div>

                      {/* View Details Button */}
                      <button
                        className="ec-view-details-btn"
                        onClick={() => handleAddToCart(product.title)}
                      >
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="ec-benefits-section">
          <div className="container">
            <div className="ec-benefits-grid">
              {trustItems.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 80}>
                  <div className="ec-benefits-card">
                    <div className="ec-benefits-icon-wrap">
                      <item.icon className="icon" />
                    </div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA & Newsletter Unified Sections */}
        <section className="ec-cta-newsletter-section">
          <div className="container">
            <div className="ec-dual-grid">
              {/* Left CTA Split Card */}
              <Reveal>
                <div className="ec-split-card">
                  <div className="ec-split-card-glow"></div>
                  <div className="ec-cta-card-layout">
                    <div className="ec-cta-card-info">
                      <h2>Elevate Your Professional Identity</h2>
                      <p>Stand out. Impress instantly. Lead with confidence.</p>
                      <button
                        onClick={() => openAuth("signup")}
                        className="ec-solid-purple-btn"
                      >
                        Explore Executive Collection
                        <ArrowRight className="icon" />
                      </button>
                    </div>

                    <div className="ec-cta-visual-wrap">
                      <div className="ec-cta-ring"></div>
                      <img
                        src="/image/product-executive.png"
                        alt="Executive Card Mockup"
                        className="ec-cta-card-img"
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Right Newsletter Split Card */}
              <Reveal delay={100}>
                <div className="ec-split-card">
                  <div className="ec-split-card-glow"></div>
                  <h2>Stay Updated</h2>
                  <p>Get the latest updates on new designs and offers.</p>

                  <form onSubmit={handleNewsletterSubmit} className="ec-input-wrap">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="ec-email-input"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="ec-solid-purple-btn"
                      style={{ padding: "0 28px" }}
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      {/* Floating Success Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            className="pf-toast"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            style={{
              position: "fixed",
              bottom: "40px",
              right: "40px",
              background: "#FFFFFF",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
              padding: "16px 24px",
              borderRadius: "100px",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <CheckCircle2 className="icon" style={{ color: "#4ade80" }} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialTab={authTab}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}
