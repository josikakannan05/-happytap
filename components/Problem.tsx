"use client";

import { CheckCircle2, Target, X, XCircle, Phone, Mail, Globe, MapPin, Wifi, Signal } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Problem() {
  return (
    <section className="problem">
      <div className="problem-bg">
        <div className="problem-blob problem-blob-1"></div>
        <div className="problem-blob problem-blob-2"></div>
        <div className="problem-blob problem-blob-3"></div>
        <div className="problem-bg-glass"></div>
      </div>
      <div className="container relative z-10">
        <Reveal>
          <div className="section-header problem-header">
            <SectionLabel icon={Target}>The problem</SectionLabel>
            <h2 className="section-title">
              Traditional Networking <br />
              <span className="text-purple-highlight">Is Outdated.</span>
            </h2>
            <p className="section-sub">
              Business cards are static and easily forgotten. HappyTap <br />
              creates a smarter digital networking experience for modern professionals.
            </p>
          </div>
        </Reveal>

        <div className="problem-grid">
          {/* Left Card */}
          <Reveal delay={80}>
            <div className="problem-card-new old-card group">
              <div className="card-top">
                <div className="card-content">
                  <div className="card-icon-box">
                    <X className="icon" strokeWidth={3} />
                  </div>
                  <h3>Old Business<br/>Cards</h3>
                  <div className="card-divider"></div>
                  <p>Paper cards get lost,<br/>damaged, and quickly<br/>become outdated.</p>
                </div>
                <div className="card-graphic-area">
                  <div className="torn-paper-wrapper">
                    <div className="paper-left">
                      <div className="paper-name">John Doe</div>
                      <div className="paper-title">Marketing Manager</div>
                      <div className="paper-company">Acme Studio</div>
                    </div>
                    <div className="paper-right"></div>
                    
                    <svg className="old-graphic-path" viewBox="0 0 100 80">
                      <path d="M 10 70 Q 40 10 90 20" fill="transparent" stroke="#a0a0a0" strokeWidth="2" strokeDasharray="5 5"/>
                    </svg>
                    <div className="old-graphic-x">
                      <X size={16} strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-badges">
                <span className="card-badge"><XCircle className="icon"/> Easily Lost</span>
                <span className="card-badge"><XCircle className="icon"/> Not Updated</span>
                <span className="card-badge"><XCircle className="icon"/> No Analytics</span>
              </div>
            </div>
          </Reveal>

          {/* Right Card */}
          <Reveal delay={160}>
            <div className="problem-card-new digital-card group">
              <div className="digital-card-glow"></div>
              <div className="particles-container">
                <div className="particle p1"></div>
                <div className="particle p2"></div>
                <div className="particle p3"></div>
                <div className="particle p4"></div>
              </div>
              <div className="card-top">
                <div className="card-content">
                  <div className="card-icon-box">
                    <Signal className="icon" strokeWidth={2.5} />
                  </div>
                  <h3>Smart Digital<br/><span className="text-purple-light">Identity</span></h3>
                  <div className="card-divider"></div>
                  <p>HappyTap helps professionals<br/>share, connect, and grow<br/>instantly through modern<br/>NFC technology.</p>
                </div>
                <div className="card-graphic-area">
                  <div className="digital-graphic-wrapper">
                    <div className="digital-rings"></div>
                    <div className="digital-phone-card">
                      <div className="phone-avatar">JD</div>
                      <div className="phone-name">John Doe</div>
                      <div className="phone-title">Product Designer</div>
                      <div className="phone-company">Acme Studio</div>
                      
                      <div className="phone-icons">
                        <div className="phone-icon-btn"><Phone /></div>
                        <div className="phone-icon-btn"><Mail /></div>
                        <div className="phone-icon-btn"><Globe /></div>
                        <div className="phone-icon-btn"><MapPin /></div>
                      </div>
                      
                      <div className="phone-connect-btn">
                        <Signal /> Tap to Connect
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-badges digital-badges">
                <span className="card-badge"><CheckCircle2 className="icon"/> Always Updated</span>
                <span className="card-badge"><CheckCircle2 className="icon"/> Smart Analytics</span>
                <span className="card-badge"><CheckCircle2 className="icon"/> Instant Connections</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
