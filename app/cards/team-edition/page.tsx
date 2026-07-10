"use client";

import { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import { Reveal } from "@/components/Reveal";
import { useAuth } from "@/lib/AuthContext";

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

const productsData: Product[] = [];

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
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [sortBy, setSortBy] = useState("Popular");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const { user, logout } = useAuth();
  const [cardHolderName, setCardHolderName] = useState("YOUR NAME");
  const [dynamicProducts, setDynamicProducts] = useState<Product[]>(productsData);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("happytap_user_profile");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.fullName) {
          setCardHolderName(parsed.fullName.toUpperCase());
        } else if (parsed.companyName) {
          setCardHolderName(parsed.companyName.toUpperCase());
        }
      } else if (user) {
        setCardHolderName(`${user.firstName} ${user.lastName}`.toUpperCase());
      } else {
        setCardHolderName("YOUR NAME");
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/cards");
        if (res.ok) {
          const data = await res.json();
          if (data.cards) {
            const themeCustomCards = data.cards.filter((card: any) => card.colorName === "Team Edition").map((card: any) => ({
              ...card,
              cssClass: card.cssClass || "te-card-basic",
              icon: card.icon || Users,
            }));
            setDynamicProducts(() => {
              const updated = [...productsData];
              themeCustomCards.forEach((card: any) => {
                const index = updated.findIndex(p => p.id === card.id);
                if (index > -1) {
                  updated[index] = card;
                } else {
                  updated.push(card);
                }
              });
              return updated;
            });
          }
        }
      } catch (e) {
        console.error("Error loading custom cards:", e);
      }
    })();
  }, []);

  const filters = ["All", "Department", "Role Based", "Premium", "Enterprise", "Team Edition"];

  const openAuth = (tab: "login" | "signup") => {
    setAuthTab(tab);
    setIsAuthOpen(true);
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
  const filteredProducts = dynamicProducts.filter((product) => {
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
        user={user ? `${user.firstName} ${user.lastName}` : null}
        onLogout={logout}
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
            {sortedProducts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 20px", background: "rgba(255, 255, 255, 0.02)", borderRadius: "24px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <Award className="icon" style={{ width: "48px", height: "48px", color: "rgba(255,255,255,0.2)", marginBottom: "16px", display: "inline-block" }} />
                <h3 style={{ color: "#FFFFFF", fontSize: "1.2rem", marginBottom: "8px" }}>No Cards Available</h3>
                <p style={{ color: "#a1a1a6", fontSize: "0.95rem" }}>No custom cards have been added to this collection yet.</p>
              </div>
            ) : (
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
                          {(product as any).images?.front ? (
                            <div className={`te-card-mockup ${product.cssClass}`} style={{ padding: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <img
                                src={(product as any).images.front}
                                alt={product.title}
                                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                              />
                            </div>
                          ) : (
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
                                  {product.icon ? (
                                    <product.icon
                                      className="icon"
                                      style={{ width: "24px", height: "24px" }}
                                    />
                                  ) : (
                                    <Users
                                      className="icon"
                                      style={{ width: "24px", height: "24px" }}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
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
                        <button
                          className="te-view-details-btn"
                          onClick={() => {
                            try {
                              localStorage.setItem("selected_card_id", product.id);
                              localStorage.setItem("selected_card", JSON.stringify(product));
                            } catch (err) {}
                            router.push(`/cards/team-edition/preview-card`);
                          }}
                        >
                          View Details
                        </button>

                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
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
      />
    </>
  );
}
