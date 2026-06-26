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
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import { Reveal } from "@/components/Reveal";

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
  {
    id: "minimal-midnight",
    title: "Minimal Midnight",
    category: "Standard",
    price: 799,
    description: "Deep charcoal matte finish business card featuring refined reflective silver foil styling details.",
    colorName: "Midnight Black",
    cardStyle: {
      background: "linear-gradient(135deg, #0f0f13 0%, #1a1a24 100%)",
      logoStyle: "silver",
    },
  },
  {
    id: "minimal-graphite",
    title: "Minimal Graphite",
    category: "Standard",
    price: 899,
    description: "Industrial dark grey brushed texture card accented with a polished silver metallic engraving.",
    colorName: "Graphite Grey",
    cardStyle: {
      background: "linear-gradient(135deg, #2c2d30 0%, #1e1f21 100%)",
      logoStyle: "silver",
    },
  },
  {
    id: "minimal-carbon",
    title: "Minimal Carbon",
    category: "Standard",
    price: 999,
    description: "Raw carbon fiber weaving aesthetic card crafted specifically for modern tech industry professionals.",
    colorName: "Carbon Weave",
    cardStyle: {
      background: "linear-gradient(135deg, #151515 0%, #252525 100%)",
      logoStyle: "white",
    },
  },
  {
    id: "minimal-titanium",
    title: "Minimal Titanium",
    category: "Premium",
    price: 1199,
    description: "Space-grade titanium silver satin card reflecting a beautiful and clean metallic luster.",
    colorName: "Satin Titanium",
    cardStyle: {
      background: "linear-gradient(135deg, #8e8e93 0%, #d1d1d6 50%, #8e8e93 100%)",
      logoStyle: "white",
      isLight: true,
    },
  },
  {
    id: "minimal-eclipse",
    title: "Minimal Eclipse",
    category: "Premium",
    price: 1299,
    description: "Mystical deep purple gradient card reflecting the subtle hues of celestial twilight shadows.",
    colorName: "Eclipse Purple",
    cardStyle: {
      background: "linear-gradient(135deg, #1d0f39 0%, #0d061a 100%)",
      logoStyle: "rose",
    },
  },
  {
    id: "minimal-aurora",
    title: "Minimal Aurora",
    category: "Premium",
    price: 1399,
    description: "Vibrant iridescent green and blue color gradient card depicting the natural northern lights.",
    colorName: "Aurora Green/Blue",
    cardStyle: {
      background: "linear-gradient(135deg, #0575e6 0%, #00f260 100%)",
      logoStyle: "white",
    },
  },
  {
    id: "minimal-rose-gold",
    title: "Minimal Rose Gold",
    category: "Luxury",
    price: 1499,
    description: "Warm pink-gold satin finish card featuring beautiful reflective copper-rose highlights and accents.",
    colorName: "Rose Gold",
    cardStyle: {
      background: "linear-gradient(135deg, #e5b2a5 0%, #f7dcd5 50%, #d89687 100%)",
      logoStyle: "rose",
      isLight: true,
    },
  },
  {
    id: "minimal-platinum",
    title: "Minimal Platinum",
    category: "Luxury",
    price: 1699,
    description: "Radiant high-polished platinum silver card detailed with a matching chrome logo emblem.",
    colorName: "Platinum Chrome",
    cardStyle: {
      background: "linear-gradient(135deg, #e5e5e9 0%, #ffffff 50%, #d1d1d6 100%)",
      logoStyle: "silver",
      isLight: true,
    },
  },
  {
    id: "minimal-executive",
    title: "Minimal Executive",
    category: "Luxury",
    price: 1999,
    description: "Deep navy blue executive card beautifully highlighted with a 24k polished gold accent.",
    colorName: "Executive Navy & Gold",
    cardStyle: {
      background: "linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%)",
      logoStyle: "gold",
    },
  },
  {
    id: "minimal-signature",
    title: "Minimal Signature",
    category: "Signature",
    price: 2499,
    description: "Matte obsidian card styled with a premium gold trim border and monogram.",
    colorName: "Velvet Obsidian & Gold",
    cardStyle: {
      background: "linear-gradient(135deg, #141414 0%, #2a2a2a 100%)",
      logoStyle: "gold",
      border: "1px solid #ffd700",
    },
  },
  {
    id: "minimal-forest",
    title: "Minimal Forest",
    category: "Standard",
    price: 899,
    description: "Sleek deep forest green matte shell card featuring a clean minimalist professional layout.",
    colorName: "Forest Green",
    cardStyle: {
      background: "linear-gradient(135deg, #13221b 0%, #08120d 100%)",
      logoStyle: "silver",
    },
  },
  {
    id: "minimal-horizon",
    title: "Minimal Horizon",
    category: "Premium",
    price: 1299,
    description: "Sleek dark twilight sunset gradient card capturing the smooth hues of the horizon.",
    colorName: "Horizon Sunset",
    cardStyle: {
      background: "linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)",
      logoStyle: "white",
    },
  },
];

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
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  const filters = ["All", "Standard", "Premium", "Luxury", "Signature"];

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
    showToast("Subscribed successfully! Welcome to the future of networking.");
    setEmailInput("");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  const filteredProducts = productsData.filter((product) => {
    if (activeFilter === "All") return true;
    return product.category === activeFilter;
  });

  return (
    <>
      <Navbar
        onLoginClick={() => openAuth("login")}
        user={user}
        onLogout={handleLogout}
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
                  <span className="ms-badge">
                    <Sparkles className="icon icon-sm" style={{ marginRight: "4px" }} />
                    Minimal Collection
                  </span>
                </Reveal>
                <Reveal delay={100}>
                  <h1>
                    The Minimal <br />
                    <span className="highlight">Series</span>
                  </h1>
                </Reveal>
                <Reveal delay={200}>
                  <p className="ms-hero-subtitle">
                    Elegant simplicity engineered for the modern professional.
                    Instantly share your contact details, social links, and portfolio with a single, contactless tap.
                  </p>
                </Reveal>
                <Reveal delay={300}>
                  <div className="hero-actions" style={{ justifyContent: "flex-start" }}>
                    <a href="#collection" className="btn">
                      Explore Cards
                      <ArrowRight className="icon" />
                    </a>
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

        {/* Dynamic Filters Section */}
        <section className="ms-filters-section" id="collection">
          <div className="container">
            <Reveal>
              <div className="ms-filters-container">
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
            </Reveal>
          </div>
        </section>

        {/* Product Collection Grid */}
        <section className="ms-collection-section">
          <div className="container">
            <div className="ms-grid-5">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, idx) => (
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
                              HAPPYTAP
                            </div>
                            <div
                              className={`nfc-mock-chip ${product.cardStyle.isLight ? "light-card-text" : ""
                                }`}
                            >
                              <Wifi className="icon icon-sm" style={{ transform: "rotate(90deg)" }} />
                            </div>
                          </div>
                        </div>
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
                          onClick={() => {
                            try {
                              localStorage.setItem("selected_card_id", product.id);
                              localStorage.setItem("selected_card", JSON.stringify(product));
                            } catch (err) {}
                            router.push(`/cards/minimal-series/preview-card`);
                          }}
                        >
                          View Details
                        </button>
                      </div>

                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="ms-trust-section">
          <div className="container">
            <div className="ms-trust-grid">
              {trustItems.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 80}>
                  <div className="ms-trust-card">
                    <div className="ms-trust-icon-box">
                      <item.icon className="icon" />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Split CTA Section */}
        <section className="cta-new" style={{ padding: "80px 0" }}>
          <div className="container">
            <Reveal>
              <div className="cta-new-card" style={{ minHeight: "380px" }}>
                <div className="cta-bg-glow"></div>
                <div className="cta-bg-grid"></div>
                <div className="cta-bg-lines"></div>

                {/* Left Card Visual */}
                <div className="cta-left-visual">
                  <div className="cta-ring-base">
                    <div className="ring-1"></div>
                    <div className="ring-2"></div>
                    <div className="ring-3"></div>
                  </div>
                  <div
                    className="floating-card-left"
                    style={{
                      background: "linear-gradient(135deg, #0f0f13 0%, #1a1a24 100%)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                    }}
                  >
                    <div className="fc-inner">
                      <div className="fc-logo-wrap">
                        <span className="fc-logo" style={{ color: "#FFFFFF" }}>Ht</span>
                        <Wifi className="fc-wifi" style={{ color: "rgba(255, 255, 255, 0.6)" }} />
                      </div>
                      <div className="fc-brand" style={{ color: "#FFFFFF" }}>HAPPYTAP</div>
                      <div className="fc-slogan" style={{ color: "#5b45e8" }}>MINIMAL SERIES</div>
                    </div>
                  </div>
                </div>

                {/* Center Content */}
                <div className="cta-center-text" style={{ maxWidth: "560px" }}>
                  <span className="cta-badge-new">PREMIUM MATERIALS</span>
                  <h2>Ready to Upgrade Your Networking?</h2>
                  <p>
                    Step into the digital age with our Minimal Series. Touch to connect, manage from your phone, and build relationships smoothly.
                  </p>
                  <button onClick={() => openAuth("signup")} className="btn cta-btn-primary" style={{ padding: "0 32px" }}>
                    Get Started Now
                    <ArrowRight className="icon" />
                  </button>
                </div>

                {/* Right Visual (Iridescent Aurora card floating) */}
                <div className="cta-right-visual">
                  <div className="cta-ring-base right-ring">
                    <div className="ring-1"></div>
                    <div className="ring-2"></div>
                    <div className="ring-3"></div>
                  </div>
                  <div
                    className="floating-card-left"
                    style={{
                      background: "linear-gradient(135deg, #0575e6 0%, #00f260 100%)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      transform: "rotateY(-20deg) rotateX(15deg) rotateZ(5deg) translateY(-20px)",
                      animation: "float-right 6s ease-in-out infinite",
                    }}
                  >
                    <div className="fc-inner">
                      <div className="fc-logo-wrap">
                        <span className="fc-logo" style={{ color: "#FFFFFF" }}>Ht</span>
                        <Wifi className="fc-wifi" style={{ color: "rgba(255, 255, 255, 0.8)" }} />
                      </div>
                      <div className="fc-brand" style={{ color: "#FFFFFF" }}>HAPPYTAP</div>
                      <div className="fc-slogan" style={{ color: "#FFFFFF" }}>AURORA</div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="ms-newsletter-section">
          <div className="container">
            <div className="ms-newsletter-container">
              <div className="ms-newsletter-content">
                <Reveal>
                  <span className="ms-badge" style={{ marginBottom: "16px" }}>Newsletter</span>
                </Reveal>
                <Reveal delay={100}>
                  <h2>Join the Future of Networking</h2>
                </Reveal>
                <Reveal delay={200}>
                  <p>
                    Subscribe to our newsletter for exclusive launches, networking tips, and member-only events. No spam, only premium insights.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={300}>
                <div className="ms-newsletter-card">
                  <form onSubmit={handleNewsletterSubmit} className="ms-newsletter-form">
                    <label htmlFor="newsletter-email">Email Address</label>
                    <div className="ms-newsletter-input-group">
                      <input
                        type="email"
                        id="newsletter-email"
                        placeholder="Enter your email"
                        className="ms-newsletter-input"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        required
                      />
                      <button type="submit" className="ms-newsletter-submit-btn">
                        Subscribe
                        <Mail className="icon icon-sm" />
                      </button>
                    </div>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      {/* Floating Success Notification (Toast) */}
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
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}
