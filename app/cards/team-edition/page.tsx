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
  Users,
  Zap,
  Code,
  Palette,
  Megaphone,
  BarChart3,
  Headset,
  Shield,
  Briefcase,
  Building2,
  Lock,
  Bell,
  Settings,
  Scale,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import { Reveal } from "@/components/Reveal";

interface Product {
  id: string;
  title: string;
  category: "Department" | "Role Based" | "Premium" | "Enterprise" | "Team Edition";
  price: number;
  description: string;
  colorName: string;
  cssClass: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  cardStyle: {
    logoStyle: "gold" | "silver";
    isLight?: boolean;
    border?: string;
  };
}

const productsData: Product[] = [
  {
    id: "team-basic",
    title: "Team Basic",
    category: "Team Edition",
    price: 1499,
    description: "Black and gold team card designed specifically for small business organization setups.",
    colorName: "Black & Gold",
    cssClass: "te-card-basic",
    icon: Users,
    cardStyle: {
      logoStyle: "gold",
    },
  },
  {
    id: "team-pro",
    title: "Team Pro",
    category: "Premium",
    price: 1999,
    description: "Deep blue premium team card crafted for high-performance corporate operations groups.",
    colorName: "Deep Blue Premium",
    cssClass: "te-card-pro",
    icon: Zap,
    cardStyle: {
      logoStyle: "silver",
    },
  },
  {
    id: "developers-pack",
    title: "Developers Pack",
    category: "Role Based",
    price: 2499,
    description: "Dark graphite team card featuring a custom integrated code developer icon engraving.",
    colorName: "Dark Graphite",
    cssClass: "te-card-dev",
    icon: Code,
    cardStyle: {
      logoStyle: "silver",
    },
  },
  {
    id: "design-team",
    title: "Design Team",
    category: "Department",
    price: 2499,
    description: "Vibrant emerald green team card created specifically for creative agency design teams.",
    colorName: "Emerald Creative",
    cssClass: "te-card-design",
    icon: Palette,
    cardStyle: {
      logoStyle: "silver",
    },
  },
  {
    id: "marketing-team",
    title: "Marketing Team",
    category: "Department",
    price: 2999,
    description: "Purple branding team card designed for creative marketers and social media teams.",
    colorName: "Purple Branding",
    cssClass: "te-card-marketing",
    icon: Megaphone,
    cardStyle: {
      logoStyle: "silver",
    },
  },
  {
    id: "sales-team",
    title: "Sales Team",
    category: "Role Based",
    price: 2999,
    description: "Metallic copper team card customized with a growth chart sales icon engraving.",
    colorName: "Copper Finish",
    cssClass: "te-card-sales",
    icon: BarChart3,
    cardStyle: {
      logoStyle: "silver",
    },
  },
  {
    id: "support-team",
    title: "Support Team",
    category: "Department",
    price: 2499,
    description: "Navy support team card custom-engraved with a dedicated headset symbol for teams.",
    colorName: "Navy Support",
    cssClass: "te-card-support",
    icon: Headset,
    cardStyle: {
      logoStyle: "silver",
    },
  },
  {
    id: "hr-team",
    title: "HR Team",
    category: "Premium",
    price: 2499,
    description: "Gold-plated pattern team card with an integrated security shield human resources icon.",
    colorName: "Gold Premium HR",
    cssClass: "te-card-hr",
    icon: Shield,
    cardStyle: {
      logoStyle: "gold",
      isLight: true,
    },
  },
  {
    id: "finance-team",
    title: "Finance Team",
    category: "Department",
    price: 2999,
    description: "Dark blue corporate team card customized with an asset briefcase icon engraving.",
    colorName: "Dark Corporate",
    cssClass: "te-card-finance",
    icon: Briefcase,
    cardStyle: {
      logoStyle: "silver",
    },
  },
  {
    id: "enterprise-team",
    title: "Enterprise Team",
    category: "Enterprise",
    price: 3499,
    description: "Gunmetal grey enterprise team card crafted specifically for large-scale corporate organizations.",
    colorName: "Gunmetal Enterprise",
    cssClass: "te-card-enterprise",
    icon: Building2,
    cardStyle: {
      logoStyle: "silver",
    },
  },
  {
    id: "operations-team",
    title: "Operations Team",
    category: "Department",
    price: 2799,
    description: "Teal operations team card custom-engraved with a modern gears icon design style.",
    colorName: "Teal Operations",
    cssClass: "te-card-ops",
    icon: Settings,
    cardStyle: {
      logoStyle: "silver",
    },
  },
  {
    id: "legal-team",
    title: "Legal Team",
    category: "Department",
    price: 2999,
    description: "Burgundy legal team card customized with a traditional scales of justice icon.",
    colorName: "Burgundy Legal",
    cssClass: "te-card-legal",
    icon: Scale,
    cardStyle: {
      logoStyle: "silver",
    },
  },
];

const benefitsData = [
  {
    icon: Users,
    title: "Bulk Management",
    description: "Manage all team cards from one dashboard.",
  },
  {
    icon: Bell,
    title: "Real-time Updates",
    description: "Update info and sync across the team instantly.",
  },
  {
    icon: Lock,
    title: "Role & Access Control",
    description: "Set permissions by role and department.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description: "Secure, encrypted & enterprise-grade.",
  },
];

export default function TeamEditionPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [sortBy, setSortBy] = useState("Popular");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<string | null>(null);

  const filters = ["All", "Department", "Role Based", "Premium", "Enterprise", "Team Edition"];

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
    showToast("Thank you for your request. Our sales team will get back to you shortly!");
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

  return (
    <>
      <Navbar
        onLoginClick={() => openAuth("login")}
        user={user}
        onLogout={handleLogout}
      />

      <div className="team-edition-page">
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
        <section className="te-hero-section">
          <div className="container">
            <div className="te-hero-grid">
              <div className="te-hero-content">
                <Reveal>
                  <span className="te-badge">
                    <Users className="icon icon-sm" style={{ marginRight: "4px" }} />
                    Team Edition
                  </span>
                </Reveal>
                <Reveal delay={100}>
                  <h1>
                    Team <br />
                    <span className="te-gradient-text">Edition</span>
                  </h1>
                </Reveal>
                <Reveal delay={200}>
                  <p className="te-hero-subtitle">
                    Unified digital identity for organizations. <br className="hide-mobile" />
                    Empower your team. Impress together.
                  </p>
                </Reveal>
                <Reveal delay={300}>
                  <div
                    className="me-feature-row"
                    style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "32px" }}
                  >
                    <span
                      className="me-feature-tag"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "0.78rem",
                        fontWeight: "600",
                        padding: "6px 14px",
                        borderRadius: "100px",
                        border: "1px solid rgba(0, 0, 0, 0.08)",
                        background: "#FFFFFF",
                        color: "#515154",
                      }}
                    >
                      <Wifi className="icon icon-sm" style={{ transform: "rotate(90deg)" }} />
                      NFC Enabled
                    </span>
                    <span
                      className="me-feature-tag"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "0.78rem",
                        fontWeight: "600",
                        padding: "6px 14px",
                        borderRadius: "100px",
                        border: "1px solid rgba(0, 0, 0, 0.08)",
                        background: "#FFFFFF",
                        color: "#515154",
                      }}
                    >
                      <Sparkles className="icon icon-sm" />
                      Instant Sharing
                    </span>
                    <span
                      className="me-feature-tag"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "0.78rem",
                        fontWeight: "600",
                        padding: "6px 14px",
                        borderRadius: "100px",
                        border: "1px solid rgba(0, 0, 0, 0.08)",
                        background: "#FFFFFF",
                        color: "#515154",
                      }}
                    >
                      <ShieldCheck className="icon icon-sm" />
                      No App Required
                    </span>
                    <span
                      className="me-feature-tag"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "0.78rem",
                        fontWeight: "600",
                        padding: "6px 14px",
                        borderRadius: "100px",
                        border: "1px solid rgba(0, 0, 0, 0.08)",
                        background: "#FFFFFF",
                        color: "#515154",
                      }}
                    >
                      <Award className="icon icon-sm" />
                      Works Everywhere
                    </span>
                  </div>
                </Reveal>
                <Reveal delay={400}>
                  <div className="te-count-label">
                    <span className="te-count-num">12</span> Exclusive Team Cards
                  </div>
                </Reveal>
              </div>

              <div className="te-hero-visual">
                <div className="te-glow-ring"></div>
                <img
                  src="/image/product-team.png"
                  alt="Team Edition Dashboard Mockup"
                  className="te-showcase-phone"
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
              <div className="te-filters-bar">
                <div className="te-filters-pills">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      className={`te-filter-pill ${activeFilter === filter ? "active" : ""}`}
                      onClick={() => setActiveFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <div
                  className="te-sort-dropdown-wrap"
                  style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", color: "#86868b" }}
                >
                  <span>Sort by:</span>
                  <select
                    className="te-sort-select"
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
        <section className="te-collection-section">
          <div className="container">
            <div className="te-grid-5">
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
                    <div className="te-product-card">
                      {/* Heart Button */}
                      <button
                        className={`te-favorite-btn ${favorites[product.id] ? "active" : ""}`}
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
                      <div className="te-card-preview-area">
                        <div className={`te-card-mockup ${product.cssClass}`}>
                          <div className="te-card-mockup-glare"></div>

                          {/* Left Half: Logo & Name */}
                          <div className="te-card-left">
                            <div
                              className={`te-mock-logo ${product.cardStyle.isLight ? "light-card-text" : ""
                                }`}
                            >
                              H
                              <span
                                className={`te-mock-logo-mark ${product.cardStyle.logoStyle === "gold" ? "gold-logo" : ""
                                  }`}
                              >
                                t
                              </span>
                            </div>

                            <div
                              className={`te-card-name ${product.cardStyle.isLight ? "light-card-text" : ""
                                }`}
                            >
                              {product.title}
                            </div>
                          </div>

                          {/* Right Half: Icon */}
                          <div className="te-card-right">
                            <div
                              className={`te-card-icon-wrap ${product.cardStyle.isLight ? "light-card-text" : ""
                                }`}
                            >
                              <product.icon
                                className="icon"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Info Area */}
                      <div className="te-product-details">
                        <span
                          className="ms-product-tag"
                          style={{
                            color: "#86868b",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {product.category}
                        </span>
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <span className="te-product-price">₹{product.price.toLocaleString()}</span>
                      </div>

                      {/* View Details Button */}
                      <Link href={`/cards/team-edition/${product.id}`} style={{ textDecoration: "none", width: "100%" }}>
                        <button className="te-view-details-btn">
                          View Details
                        </button>
                      </Link>

                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="te-benefits-section">
          <div className="container">
            <div className="te-benefits-grid">
              {benefitsData.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 80}>
                  <div className="te-benefits-card">
                    <div className="te-benefits-icon-wrap">
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

        {/* CTA Section */}
        <section className="te-cta-section">
          <div className="container">
            <div className="te-dual-grid">
              {/* Left Split Card: Empower Your Team */}
              <Reveal>
                <div className="te-split-card">
                  <div className="te-split-card-glow"></div>
                  <div className="te-cta-card-layout">
                    <div className="te-cta-card-info">
                      <h2>Empower Your Team with Smart Identity</h2>
                      <p>Professional. Consistent. Connected.</p>
                      <button
                        onClick={() => openAuth("signup")}
                        className="te-solid-purple-btn"
                      >
                        Explore Team Edition
                        <ArrowRight className="icon" />
                      </button>
                    </div>

                    <div className="te-cta-visual-wrap">
                      <div className="te-cta-card-float-wrap">
                        <div className="te-cta-card-float-1">
                          <div
                            style={{
                              padding: "8px",
                              display: "flex",
                              justifyContent: "space-between",
                              height: "100%",
                              flexDirection: "column",
                            }}
                          >
                            <span style={{ fontSize: "0.45rem", fontWeight: "bold", color: "#fff" }}>
                              Ht
                            </span>
                            <span
                              style={{
                                fontSize: "0.32rem",
                                fontWeight: "bold",
                                color: "#fff",
                                letterSpacing: "0.05em",
                              }}
                            >
                              TEAM PRO
                            </span>
                          </div>
                        </div>
                        <div className="te-cta-card-float-2">
                          <div
                            style={{
                              padding: "8px",
                              display: "flex",
                              justifyContent: "space-between",
                              height: "100%",
                              flexDirection: "column",
                            }}
                          >
                            <span style={{ fontSize: "0.45rem", fontWeight: "bold", color: "#fff" }}>
                              Ht
                            </span>
                            <span
                              style={{
                                fontSize: "0.32rem",
                                fontWeight: "bold",
                                color: "#fff",
                                letterSpacing: "0.05em",
                              }}
                            >
                              TEAM BASIC
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Right Split Card: Need a Custom Team Plan */}
              <Reveal delay={100}>
                <div className="te-split-card">
                  <div className="te-split-card-glow"></div>
                  <div className="te-cta-card-layout">
                    <div className="te-cta-card-info">
                      <h2>Need a Custom Team Plan?</h2>
                      <p>Let's build the perfect solution for your organization.</p>
                      <button
                        onClick={() => openAuth("login")}
                        className="te-outline-purple-btn"
                      >
                        Contact Sales Team
                        <ArrowRight className="icon" />
                      </button>
                    </div>

                    <div className="te-cta-visual-wrap">
                      <div className="te-connection-circle-wrap">
                        <div className="te-center-node">
                          <Users className="icon" style={{ width: "20px", height: "20px" }} />
                        </div>
                        <div className="te-avatar-node te-avatar-node-1">
                          <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                            alt="Sarah J."
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                        <div className="te-avatar-node te-avatar-node-2">
                          <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                            alt="David L."
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                        <div className="te-avatar-node te-avatar-node-3">
                          <img
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                            alt="Liam K."
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                        <svg className="te-connection-svg" viewBox="0 0 140 140">
                          <line
                            x1="70"
                            y1="70"
                            x2="70"
                            y2="16"
                            stroke="rgba(91, 69, 232, 0.2)"
                            strokeWidth="1.5"
                            strokeDasharray="3 3"
                          />
                          <line
                            x1="70"
                            y1="70"
                            x2="24"
                            y2="114"
                            stroke="rgba(91, 69, 232, 0.2)"
                            strokeWidth="1.5"
                            strokeDasharray="3 3"
                          />
                          <line
                            x1="70"
                            y1="70"
                            x2="116"
                            y2="114"
                            stroke="rgba(91, 69, 232, 0.2)"
                            strokeWidth="1.5"
                            strokeDasharray="3 3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
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
