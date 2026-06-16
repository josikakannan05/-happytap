"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail, Globe, MapPin, Wifi, QrCode, BarChart2 } from "lucide-react";
import { Reveal } from "./Reveal";

interface CTAProps {
  onGetCardClick?: () => void;
}

export function CTA({ onGetCardClick }: CTAProps) {
  return (
    <section className="cta-new" id="cta">
      <div className="container">
        <Reveal>
          <div className="cta-new-card">
            
            {/* Background elements */}
            <div className="cta-bg-glow"></div>
            <div className="cta-bg-grid"></div>
            <div className="cta-bg-lines"></div>

            {/* Left Card */}
            <div className="cta-left-visual">
              <div className="cta-ring-base">
                <div className="ring-1"></div>
                <div className="ring-2"></div>
                <div className="ring-3"></div>
              </div>
              <div className="floating-card-left">
                <div className="fc-inner">
                  <div className="fc-logo-wrap">
                    <span className="fc-logo">Ht</span>
                    <Wifi className="fc-wifi" />
                  </div>
                  <div className="fc-brand">HAPPYTAP</div>
                  <div className="fc-slogan">TAP • CONNECT • GROW</div>
                </div>
              </div>
            </div>

            {/* Center Content */}
            <div className="cta-center-text">
              <span className="cta-badge-new">NEXT-GEN NETWORKING</span>
              <h2>Start Your <br/> <span className="text-purple-glow">Smart Networking</span> <br/> Journey</h2>
              <p>
                Create unforgettable first impressions with HappyTap's
                <br className="hide-mobile" /> next-generation digital networking experience.
              </p>
              <button onClick={onGetCardClick} className="btn cta-btn-primary" suppressHydrationWarning>
                <BarChart2 className="icon" />
                Get Your Card
                <ArrowRight className="icon" />
              </button>
            </div>

            {/* Right Visuals */}
            <div className="cta-right-visual">
              <div className="cta-ring-base right-ring">
                <div className="ring-1"></div>
                <div className="ring-2"></div>
                <div className="ring-3"></div>
              </div>
              
              <div className="floating-phone">
                <div className="fp-inner">
                  <div className="fp-avatar">JD</div>
                  <h3 className="fp-name">John Doe</h3>
                  <p className="fp-title">Product Designer<br/>Acme Studio</p>
                  
                  <div className="fp-actions">
                    <div className="fp-icon"><Phone size={14}/></div>
                    <div className="fp-icon"><Mail size={14}/></div>
                    <div className="fp-icon"><Globe size={14}/></div>
                    <div className="fp-icon"><MapPin size={14}/></div>
                  </div>
                  
                  <div className="fp-btn">
                    <Wifi size={14} className="fp-btn-icon left"/>
                    Connect Instantly
                    <Wifi size={14} className="fp-btn-icon right"/>
                  </div>
                </div>
              </div>

              <div className="floating-qr">
                 <div className="fq-inner">
                    <QrCode size={48} className="fq-icon" />
                 </div>
              </div>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
