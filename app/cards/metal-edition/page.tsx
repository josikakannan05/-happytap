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

const productsData: Product[] = [
];

const trustItems = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Crafted with precision and high-grade metals",
  },
  {
    icon: ShieldCheck,
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

export default function MetalEditionPage() {
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
            const themeCustomCards = data.cards.filter((card: any) => card.colorName === "Metal Edition");
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

  // Filter products
  const filteredProducts = dynamicProducts.filter((product) => {
    if (activeFilter === "All") return true;
    return product.category === activeFilter;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    // Default or Popular: just keep the list order
    return 0;
  });

  return (
    <>
      <Navbar
        onLoginClick={() => openAuth("login")}
        user={user ? `${user.firstName} ${user.lastName}` : null}
        onLogout={logout}
      />

      <div className="metal-edition-page">
        {/* Back Button */}
        <div className="container" style={{ paddingTop: "24px" }}>
          <Link href="/cards" className="back-button" style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "#86868b", fontSize: "0.9rem", fontWeight: "600" }}>
            <ArrowLeft className="icon icon-sm" />
            <span>Back to All Cards</span>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="me-hero-section">
          <div className="container">
            <div className="me-hero-grid">
              <div className="me-hero-content">
                <Reveal>
                  <span className="me-premium-badge">
                    <Sparkles className="icon icon-sm" style={{ marginRight: "4px" }} />
                    Premium Collection
                  </span>
                </Reveal>
                <Reveal delay={100}>
                  <h1>
                    Metal <br />
                    <span className="me-gradient-text">Edition</span>
                  </h1>
                </Reveal>
                <Reveal delay={200}>
                  <p className="me-hero-subtitle">
                    Luxury-crafted NFC business cards. <br className="hide-mobile" />
                    Built to leave a lasting impression.
                  </p>
                </Reveal>
                <Reveal delay={300}>
                  <div className="me-feature-row">
                    <span className="me-feature-tag">
                      <Wifi className="icon" style={{ transform: "rotate(90deg)" }} />
                      NFC Enabled
                    </span>
                    <span className="me-feature-tag">
                      <Sparkles className="icon" />
                      Instant Sharing
                    </span>
                    <span className="me-feature-tag">
                      <ShieldCheck className="icon" />
                      No App Required
                    </span>
                    <span className="me-feature-tag">
                      <Award className="icon" />
                      Works Everywhere
                    </span>
                  </div>
                </Reveal>
                <Reveal delay={400}>
                  <div className="me-count-label">
                    <span className="me-count-num">12</span> Exclusive Designs
                  </div>
                </Reveal>
              </div>

              <div className="me-hero-visual">
                <div className="me-glow-ring"></div>
                <div className="me-platform">
                  <div className="me-platform-highlight"></div>
                </div>
                <img
                  src="/image/product-metal.png"
                  alt="Metal Edition Showcase Mockup"
                  className="me-showcase-card"
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
              <div className="me-filters-bar">
                <div className="me-filters-pills">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      className={`me-filter-pill ${activeFilter === filter ? "active" : ""}`}
                      onClick={() => setActiveFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <div className="me-sort-dropdown-wrap">
                  <span>Sort by:</span>
                  <select
                    className="me-sort-select"
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
        <section className="me-collection-section">
          <div className="container">
            {sortedProducts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 20px", background: "rgba(255, 255, 255, 0.02)", borderRadius: "24px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <Award className="icon" style={{ width: "48px", height: "48px", color: "rgba(255,255,255,0.2)", marginBottom: "16px", display: "inline-block" }} />
                <h3 style={{ color: "#FFFFFF", fontSize: "1.2rem", marginBottom: "8px" }}>No Cards Available</h3>
                <p style={{ color: "#a1a1a6", fontSize: "0.95rem" }}>No custom cards have been added to this collection yet.</p>
              </div>
            ) : (
              <div className="me-grid-5">
                <AnimatePresence mode="popLayout">
                  {sortedProducts.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    >
                      <div className="me-product-card">
                        {/* Heart Button */}
                        <button
                          className={`me-favorite-btn ${favorites[product.id] ? "active" : ""}`}
                          onClick={() => toggleFavorite(product.id, product.title)}
                          aria-label="Add to favorites"
                        >
                          <Heart className="icon" style={{ fill: favorites[product.id] ? "#ff4757" : "none" }} />
                        </button>

                        {/* Card Preview Area */}
                        <div className="me-card-preview-area">
                          {(product as any).images?.front ? (
                            <div className="metal-card-mockup" style={{ padding: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <img
                                src={(product as any).images.front}
                                alt={product.title}
                                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                              />
                            </div>
                          ) : (
                            <div
                              className="metal-card-mockup"
                              style={{
                                background: product.cardStyle.background,
                                border: product.cardStyle.border || "1px solid rgba(255, 255, 255, 0.08)",
                              }}
                            >
                              <div className="metal-card-mockup-glare"></div>

                              <div
                                className={`metal-mock-logo ${product.cardStyle.isLight ? "light-card-text" : ""
                                  }`}
                              >
                                H<span className={`metal-mock-logo-mark ${product.cardStyle.logoStyle === "gold" ? "gold-logo" : ""}`}>t</span>
                              </div>

                              <div className="metal-mock-details">
                                <div
                                  className={`metal-mock-brand ${product.cardStyle.isLight ? "light-card-text" : ""
                                    }`}
                                >
                                  {cardHolderName}
                                </div>
                                <div
                                  className={`metal-mock-chip ${product.cardStyle.isLight ? "light-card-text" : ""
                                    }`}
                                >
                                  <Wifi className="icon icon-sm" style={{ transform: "rotate(90deg)" }} />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Card Info Area */}
                        <div className="me-product-details">
                          <span className="ms-product-tag" style={{ color: "#86868b" }}>{product.category}</span>
                          <h3>{product.title}</h3>
                          <p>{product.description}</p>
                          <span className="me-product-price">₹{product.price.toLocaleString()}</span>
                        </div>

                        {/* View Details Button */}
                        <button
                          className="me-view-details-btn"
                          onClick={() => {
                            try {
                              localStorage.setItem("selected_card_id", product.id);
                              localStorage.setItem("selected_card", JSON.stringify(product));
                            } catch (err) {}
                            router.push(`/cards/metal-edition/preview-card`);
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

        {/* Trust Section */}
        <section className="me-trust-section">
          <div className="container">
            <div className="me-trust-grid">
              {trustItems.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 80}>
                  <div className="me-trust-card">
                    <div className="me-trust-icon-wrap">
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
        <section className="me-cta-newsletter-section">
          <div className="container">
            <div className="me-dual-grid">
              {/* Left CTA Split Card */}
              <Reveal>
                <div className="me-split-card">
                  <div className="me-split-card-glow"></div>
                  <div className="me-cta-card-layout">
                    <div className="me-cta-card-info">
                      <h2>Ready to Upgrade Your Networking?</h2>
                      <p>Choose your style. Tap to connect.</p>
                      <button onClick={() => openAuth("signup")} className="me-solid-purple-btn">
                        Explore Metal Edition
                        <ArrowRight className="icon" />
                      </button>
                    </div>

                    <div className="me-cta-visual-wrap">
                      <div className="me-cta-ring"></div>
                      <img
                        src="/image/product-metal.png"
                        alt="Metal Card Mockup"
                        className="me-cta-card-img"
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Right Newsletter Split Card */}
              <Reveal delay={100}>
                <div className="me-split-card">
                  <div className="me-split-card-glow"></div>
                  <h2>Stay Updated</h2>
                  <p>Get the latest updates on new designs and offers.</p>

                  <form onSubmit={handleNewsletterSubmit} className="me-input-wrap">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="me-email-input"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      required
                    />
                    <button type="submit" className="me-solid-purple-btn" style={{ padding: "0 28px" }}>
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
