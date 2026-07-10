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
  category: "Standard" | "Premium" | "Luxury" | "Signature";
  price: number;
  description: string;
  colorName: string;
  cardStyle: {
    background: string;
    logoStyle: "gold" | "silver" | "white" | "rose";
    isLight?: boolean;
    border?: string;
  };
}

const productsData: Product[] = [];

const trustItems = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Crafted with space-grade materials, designed to leave a lasting impression.",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Warranty",
    description: "We stand by our craft. If your card ever fails, we will replace it free of charge.",
  },
  {
    icon: RefreshCw,
    title: "7 Days Return",
    description: "Not satisfied? Return your card within 7 days for a full, hassle-free refund.",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Enjoy free express shipping across India, delivered to your doorstep in 3-5 days.",
  },
];

export default function MinimalSeriesPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const { user, logout } = useAuth();
  const router = useRouter();
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
            const themeCustomCards = data.cards.filter((card: any) => card.colorName === "Minimal Series");
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

  const filters = ["All", "Standard", "Premium", "Luxury", "Signature"];

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
    showToast("Subscribed successfully! Welcome to the future of networking.");
    setEmailInput("");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  const filteredProducts = dynamicProducts.filter((product) => {
    if (activeFilter === "All") return true;
    return product.category === activeFilter;
  });

  return (
    <>
      <Navbar
        onLoginClick={() => openAuth("login")}
        user={user ? `${user.firstName} ${user.lastName}` : null}
        onLogout={logout}
      />

      <div className="minimal-series-page ms-gradient-bg">
        {/* Back Button */}
        <div className="container" style={{ paddingTop: "24px" }}>
          <Link href="/cards" className="back-button" style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "#86868b", fontSize: "0.9rem", fontWeight: "600" }}>
            <ArrowLeft className="icon icon-sm" />
            <span>Back to All Cards</span>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="ms-hero-section">
          <div className="container">
            <div className="ms-hero-grid">
              <div className="ms-hero-content">
                <Reveal>
                  <span className="ms-badge">Premium NFC Cards</span>
                </Reveal>
                <Reveal delay={200}>
                  <h1 className="ms-title">The Minimal Series</h1>
                </Reveal>
                <Reveal delay={300}>
                  <p className="ms-lead">
                    Elegant simplicity engineered for the modern professional. Instantly share your contact details, social links, and portfolio with a single, contactless tap.
                  </p>
                </Reveal>

                <Reveal delay={450}>
                  <div className="me-features-list" style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "24px" }}>
                    <span className="me-feature-tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: "600", padding: "6px 14px", borderRadius: "100px", border: "1px solid rgba(255, 255, 255, 0.08)", background: "rgba(255, 255, 255, 0.03)", color: "#a1a1a6" }}>
                      <Wifi className="icon icon-sm" />
                      NFC Enabled
                    </span>
                    <span className="me-feature-tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: "600", padding: "6px 14px", borderRadius: "100px", border: "1px solid rgba(255, 255, 255, 0.08)", background: "rgba(255, 255, 255, 0.03)", color: "#a1a1a6" }}>
                      <Sparkles className="icon icon-sm" />
                      Instant Sharing
                    </span>
                    <span className="me-feature-tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: "600", padding: "6px 14px", borderRadius: "100px", border: "1px solid rgba(255, 255, 255, 0.08)", background: "rgba(255, 255, 255, 0.03)", color: "#a1a1a6" }}>
                      <ShieldCheck className="icon icon-sm" />
                      No App Required
                    </span>
                    <span className="me-feature-tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: "600", padding: "6px 14px", borderRadius: "100px", border: "1px solid rgba(255, 255, 255, 0.08)", background: "rgba(255, 255, 255, 0.03)", color: "#a1a1a6" }}>
                      <Award className="icon icon-sm" />
                      Works Everywhere
                    </span>
                  </div>
                </Reveal>
              </div>

              <div className="ms-hero-visual">
                <div className="ms-glow-ring"></div>
                <img
                  src="/image/product-minimal.png"
                  alt="Minimal Midnight Mockup"
                  className="ms-hero-card-img"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pill Filters */}
        <section style={{ padding: "0 0 20px" }}>
          <div className="container">
            <Reveal>
              <div className="ms-filters-bar">
                <div className="ms-filters-pills">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      className={`ms-filter-pill ${activeFilter === filter ? "active" : ""}`}
                      onClick={() => setActiveFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Product Collection Grid */}
        <section className="ms-collection-section">
          <div className="container">
            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 20px", background: "rgba(255, 255, 255, 0.02)", borderRadius: "24px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <Award className="icon" style={{ width: "48px", height: "48px", color: "rgba(255,255,255,0.2)", marginBottom: "16px", display: "inline-block" }} />
                <h3 style={{ color: "#FFFFFF", fontSize: "1.2rem", marginBottom: "8px" }}>No Cards Available</h3>
                <p style={{ color: "#a1a1a6", fontSize: "0.95rem" }}>No custom cards have been added to this collection yet.</p>
              </div>
            ) : (
              <div className="ms-grid-5">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    >
                      <div className="ms-product-card">
                        {/* Heart Button */}
                        <button
                          className={`ms-favorite-btn ${favorites[product.id] ? "active" : ""}`}
                          onClick={() => toggleFavorite(product.id, product.title)}
                          aria-label="Add to favorites"
                        >
                          <Heart className="icon" style={{ fill: favorites[product.id] ? "#ff4757" : "none" }} />
                        </button>

                        {/* Card Preview Graphic Area */}
                        <div className="ms-card-preview-area">
                          {(product as any).images?.front ? (
                            <div className="nfc-card-mockup" style={{ padding: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <img
                                src={(product as any).images.front}
                                alt={product.title}
                                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                              />
                            </div>
                          ) : (
                            <div
                              className="nfc-card-mockup"
                              style={{
                                background: product.cardStyle.background,
                                border: product.cardStyle.border || "1px solid rgba(255, 255, 255, 0.08)",
                              }}
                            >
                              <div className="nfc-card-mockup-glare"></div>

                              <div
                                className={`nfc-mock-logo ${product.cardStyle.isLight ? "light-card-text" : ""
                                  }`}
                              >
                                H<span className={`nfc-mock-logo-mark ${product.cardStyle.logoStyle === "gold" ? "gold-logo" : ""}`}>t</span>
                              </div>

                              <div className="nfc-mock-details">
                                <div
                                  className={`nfc-mock-brand ${product.cardStyle.isLight ? "light-card-text" : ""
                                    }`}
                                >
                                  {cardHolderName}
                                </div>
                                <div
                                  className={`nfc-mock-chip ${product.cardStyle.isLight ? "light-card-text" : ""
                                    }`}
                                >
                                  <Wifi className="icon icon-sm" style={{ transform: "rotate(90deg)" }} />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Card Info Area */}
                        <div className="ms-product-details">
                          <span className="ms-product-tag">{product.category}</span>
                          <h3>{product.title}</h3>
                          <p>{product.description}</p>
                        </div>

                        {/* Buy Row */}
                        <div className="ms-product-price-row">
                          <span className="ms-product-price">₹{product.price.toLocaleString()}</span>
                          <button
                            className="ms-product-buy-btn"
                            onClick={() => handleAddToCart(product.title)}
                          >
                            Add to Cart
                          </button>
                        </div>

                        {/* Bottom Link for Detailed Page */}
                        <div className="ms-product-view-link">
                          <Link href={`/cards/minimal-series/${product.id}`} className="view-link-btn">
                            View Details
                            <ArrowRight className="icon icon-xs" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>

        {/* Quality Features List */}
        <section className="ms-trust-section">
          <div className="container">
            <div className="ms-trust-grid">
              {trustItems.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 150}>
                  <div className="ms-trust-card">
                    <item.icon className="icon" />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />

      {/* Floating Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            className="pf-toast"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
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
