"use client";

import { useState } from "react";
import { Layers, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { products } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { AuthModal } from "@/components/AuthModal";

export default function CardsPage() {
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

  return (
    <>
      <Navbar
        onLoginClick={() => openAuth("login")}
        user={user}
        onLogout={handleLogout}
      />
      <div className="cards-page">
        {/* Back Button */}
        <div className="cards-header-top">
          <Link href="/" className="back-button">
            <ArrowLeft className="icon" />
            <span>Back</span>
          </Link>
        </div>

        {/* Page Header */}
        <section className="cards-hero">
          <div className="container">
            <Reveal>
              <div className="section-header">
                <SectionLabel icon={Layers}>All Cards</SectionLabel>
                <h1 className="cards-title">Crafted for modern professionals.</h1>
                <p className="cards-subtitle">
                  Explore our complete collection of premium NFC card designs tailored for every professional need.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Products Grid */}
        <section className="cards-collection">
          <div className="container">
            <div className="cards-grid">
              {products.map((product, index) => (
                <Reveal key={product.title} delay={60 + index * 60}>
                  <div className="card-item">
                    <div className="card-overlay" />

                    <div className="card-img-wrap">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="card-img"
                        draggable={false}
                      />
                    </div>

                    <span className="card-tag">
                      <product.icon className="icon" aria-hidden />
                      {product.tag}
                    </span>

                    <div className="card-content">
                      <div className="card-text">
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                      </div>
                      <div className="card-cta">
                        <Link href={`/cards/${product.title.toLowerCase().replace(/\s+/g, "-")}`} className="explore-btn">
                          <span>Explore</span>
                          <svg viewBox="0  24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="cards-features">
          <div className="container">
            <Reveal>
              <div className="features-header">
                <h2 className="features-title">Why Choose Our Cards</h2>
              </div>
            </Reveal>

            <div className="features-grid">
              {[
                {
                  icon: "✨",
                  title: "Premium Design",
                  description: "Beautifully crafted with attention to every detail."
                },
                {
                  icon: "📱",
                  title: "NFC Technology",
                  description: "Instantly share your profile with a single tap."
                },
                {
                  icon: "🎨",
                  title: "Customizable",
                  description: "Personalize your card to match your brand identity."
                },
                {
                  icon: "📊",
                  title: "Analytics",
                  description: "Track interactions and optimize your networking strategy."
                },
              ].map((feature, index) => (
                <Reveal key={feature.title} delay={60 + index * 60}>
                  <div className="feature-card">
                    <div className="feature-icon">{feature.icon}</div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cards-cta">
          <div className="container">
            <Reveal>
              <div className="cta-content">
                <h2>Ready to make your first impression?</h2>
                <p>Choose your card design and start networking smarter today.</p>
                <Link href="#" className="cta-button">
                  Get Started Now
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialTab={authTab}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}
