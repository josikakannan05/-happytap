"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { heroStats } from "@/lib/data";
import { Reveal } from "./Reveal";

interface HeroProps {
  onGetCardClick?: () => void;
}

export function Hero({ onGetCardClick }: HeroProps) {
  return (
    <section className="hero">
      <div className="blur-orb orb-1" aria-hidden />
      <div className="blur-orb orb-2" aria-hidden />

      <div className="container hero-grid">
        <div className="hero-content">
          <Reveal>
            <div className="hero-badge">
              <Zap className="icon" aria-hidden />
              NFC-powered digital identity
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1>
              The digital
              <br />
              <span>handshake.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="hero-desc">
              Replace outdated business cards with a seamless digital identity.
              Tap once, share instantly, and stay remembered.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="hero-actions">
              <button onClick={onGetCardClick} className="btn">
                Get Your Card
                <ArrowRight className="icon" aria-hidden />
              </button>
              <Link href="#how-it-works" className="btn btn-outline">
                See how it works
              </Link>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="hero-stats">
              {heroStats.map((stat) => (
                <div key={stat.label} className="hero-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="trust-line">
              <ShieldCheck className="icon" aria-hidden />
              Trusted by creators, founders, agencies, and modern professionals.
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="hero-visual-wrap">
          <div className="hero-visual">
            <div className="hero-glow" aria-hidden />
            <img
              src="/hero-mockup.png"
              alt="HappyTap NFC card and phone profile mockup"
              className="hero-mockup-img"
              draggable={false}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
