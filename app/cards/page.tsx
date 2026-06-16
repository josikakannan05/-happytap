"use client";

import { useState } from "react";
import { SlidersHorizontal, ChevronDown, Heart, Wifi, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import { Reveal } from "@/components/Reveal";

interface ProductCard {
  id: string;
  title: string;
  category: "Metal Edition" | "Minimal Series" | "Executive Collection" | "Team Edition";
  price: number;
  description: string;
  link: string;
  cardStyle: {
    background: string;
    logoStyle: "gold" | "silver" | "white" | "rose";
    isLight?: boolean;
    border?: string;
    hasGoldLine?: boolean;
    wavesStyle: string;
  };
}

const productsData: ProductCard[] = [
  {
    id: "midnight-metal",
    title: "Midnight Metal",
    category: "Metal Edition",
    price: 999,
    description: "Premium black metal finish with subtle shine and durability.",
    link: "/cards/metal-edition/metal-black-luxury",
    cardStyle: {
      background: "linear-gradient(135deg, #121212 0%, #1a1a1a 100%)",
      logoStyle: "white",
      wavesStyle: "rgba(255, 255, 255, 0.8)",
    }
  },
  {
    id: "graphite-minimal",
    title: "Graphite Minimal",
    category: "Minimal Series",
    price: 899,
    description: "Sleek graphite finish with a clean and modern look.",
    link: "/cards/minimal-series/minimal-graphite",
    cardStyle: {
      background: "linear-gradient(135deg, #2c2d30 0%, #1e1f21 100%)",
      logoStyle: "silver",
      wavesStyle: "rgba(255, 255, 255, 0.7)",
    }
  },
  {
    id: "platinum-white",
    title: "Platinum White",
    category: "Executive Collection",
    price: 1199,
    description: "Premium platinum white for a luxurious and elegant presence.",
    link: "/cards/minimal-series/minimal-platinum",
    cardStyle: {
      background: "linear-gradient(135deg, #e5e5e9 0%, #ffffff 50%, #d1d1d6 100%)",
      logoStyle: "silver",
      isLight: true,
      wavesStyle: "rgba(12, 12, 15, 0.7)",
    }
  },
  {
    id: "ocean-blue",
    title: "Ocean Blue",
    category: "Team Edition",
    price: 1099,
    description: "Bold ocean blue finish that represents trust and confidence.",
    link: "/cards/team-edition/team-pro",
    cardStyle: {
      background: "linear-gradient(145deg, #0a1628 0%, #0d2856 35%, #1a4a9e 100%)",
      logoStyle: "white",
      wavesStyle: "rgba(255, 255, 255, 0.8)",
    }
  },
  {
    id: "rose-gold",
    title: "Rose Gold",
    category: "Metal Edition",
    price: 1299,
    description: "Elegant rose gold metal with premium polished finish.",
    link: "/cards/metal-edition/metal-rose-gold",
    cardStyle: {
      background: "linear-gradient(135deg, #e5b2a5 0%, #f7dcd5 50%, #d89687 100%)",
      logoStyle: "rose",
      isLight: true,
      wavesStyle: "rgba(12, 12, 15, 0.6)",
    }
  },
  {
    id: "black-gold",
    title: "Black Gold",
    category: "Executive Collection",
    price: 1499,
    description: "Iconic black and gold combination for a powerful impression.",
    link: "/cards/executive-collection/executive-classic",
    cardStyle: {
      background: "radial-gradient(circle at 100% 100%, rgba(212, 175, 55, 0.25) 0%, transparent 60%), #141417",
      logoStyle: "gold",
      border: "1px solid #ffd700",
      hasGoldLine: true,
      wavesStyle: "rgba(255, 255, 255, 0.8)",
    }
  },
  {
    id: "aurora-green",
    title: "Aurora Green",
    category: "Minimal Series",
    price: 1299,
    description: "Vibrant iridescent gradient reflecting the natural northern lights.",
    link: "/cards/minimal-series/minimal-aurora",
    cardStyle: {
      background: "linear-gradient(135deg, #0575e6 0%, #00f260 100%)",
      logoStyle: "white",
      wavesStyle: "rgba(255, 255, 255, 0.8)",
    }
  },
  {
    id: "titanium-silver",
    title: "Titanium Silver",
    category: "Metal Edition",
    price: 2499,
    description: "Space-grade titanium silver with a satin metallic luster.",
    link: "/cards/metal-edition/metal-titanium",
    cardStyle: {
      background: "linear-gradient(135deg, #8e8e93 0%, #d1d1d6 50%, #8e8e93 100%)",
      logoStyle: "white",
      isLight: true,
      wavesStyle: "rgba(12, 12, 15, 0.7)",
    }
  },
  {
    id: "carbon-weave",
    title: "Carbon Weave",
    category: "Minimal Series",
    price: 999,
    description: "Raw carbon fiber weaving aesthetic for high-tech professionals.",
    link: "/cards/minimal-series/minimal-carbon",
    cardStyle: {
      background: "linear-gradient(135deg, #151515 0%, #252525 100%)",
      logoStyle: "white",
      wavesStyle: "rgba(255, 255, 255, 0.8)",
    }
  }
];

export default function CardsPage() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<string | null>(null);

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

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <Navbar
        onLoginClick={() => openAuth("login")}
        user={user}
        onLogout={handleLogout}
      />
      
      <div className="cards-page-new">
        {/* Back Button */}
        <div className="cards-container-new" style={{ marginBottom: "16px" }}>
          <Link href="/" className="back-button" style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "#64647a", fontSize: "0.9rem", fontWeight: "600" }}>
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <header className="cards-container-new cards-header-new">
          <div className="cards-header-left">
            <Reveal>
              <h1>All Cards</h1>
              <p>Choose a design that matches your style and make every tap count.</p>
            </Reveal>
          </div>
          
          <div className="cards-header-right">
            <Reveal delay={100}>
              <button className="btn-filter-new" suppressHydrationWarning>
                <SlidersHorizontal size={15} />
                <span>Filters</span>
              </button>
              <button className="btn-sort-new" suppressHydrationWarning>
                <span>Sort by: <strong>Popular</strong></span>
                <ChevronDown size={15} />
              </button>
            </Reveal>
          </div>
        </header>

        {/* Products Grid */}
        <main className="cards-container-new">
          <div className="cards-grid-new">
            {productsData.map((product, index) => {
              const isLight = product.cardStyle.isLight;
              const logoStyle = product.cardStyle.logoStyle;
              return (
                <Reveal key={product.id} delay={120 + index * 60}>
                  <div className="card-item-new">
                    
                    {/* Favorite Heart Button */}
                    <button
                      className={`card-fav-btn ${favorites[product.id] ? "active" : ""}`}
                      onClick={() => toggleFavorite(product.id)}
                      aria-label="Add to favorites"
                    >
                      <Heart
                        size={18}
                        style={{
                          fill: favorites[product.id] ? "#ff4757" : "none",
                          stroke: favorites[product.id] ? "#ff4757" : "currentColor"
                        }}
                      />
                    </button>

                    {/* Card Preview Graphic Area */}
                    <div className="card-mockup-container">
                      <div
                        className={`nfc-mockup-new ${isLight ? "mockup-light" : ""}`}
                        style={{
                          background: product.cardStyle.background,
                          border: product.cardStyle.border || "1px solid rgba(255, 255, 255, 0.08)",
                        }}
                      >
                        <div className="nfc-mockup-new-glare"></div>
                        
                        {product.cardStyle.hasGoldLine && (
                          <div className="mockup-gold-line"></div>
                        )}

                        <div
                          className={`mockup-logo-new logo-${logoStyle} ${
                            isLight ? "light-text" : ""
                          }`}
                        >
                          Ht
                        </div>

                        <div
                          className={`mockup-details-new ${
                            isLight ? "light-text" : ""
                          }`}
                        >
                          <div className="mockup-brand-new">
                            HAPPYTAP
                          </div>
                          <div className="mockup-chip-new" style={{ color: product.cardStyle.wavesStyle }}>
                            <Wifi size={20} style={{ transform: "rotate(90deg)" }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Details Area */}
                    <div className="card-info-area">
                      <span className="card-category-new">{product.category}</span>
                      <h2 className="card-title-new">{product.title}</h2>
                      <p className="card-desc-new">{product.description}</p>
                    </div>

                    {/* Footer / Price Row */}
                    <div className="card-footer-new">
                      <span className="card-price-new">₹{product.price.toLocaleString("en-IN")}</span>
                      <Link href={product.link} className="card-btn-new">
                        View Details
                      </Link>
                    </div>

                  </div>
                </Reveal>
              );
            })}
          </div>
        </main>
      </div>

      <Footer />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialTab={authTab}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}
