"use client";

import { ListOrdered } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const stepData = [
  {
    number: "STEP 01",
    title: "Choose your card",
    description:
      "Pick from premium NFC card collections crafted for professionals, creators, and modern teams.",
    image: "/image/step1-nfc-card.png",
    alt: "HappyTap premium dark NFC business card with rose gold branding",
    accent: "rgba(184, 117, 58, 0.18)",
    accentBorder: "rgba(184, 117, 58, 0.25)",
  },
  {
    number: "STEP 02",
    title: "Create your identity",
    description:
      "Build a living profile with social links, portfolio, contact details, booking, and digital presence.",
    image: "/image/step2-phone-profile.png",
    alt: "HappyTap mobile app showing digital business profile dashboard",
    accent: "rgba(91, 69, 232, 0.18)",
    accentBorder: "rgba(91, 69, 232, 0.28)",
  },
  {
    number: "STEP 03",
    title: "Tap and connect",
    description:
      "Share instantly with one tap. No apps. No friction. Just seamless modern networking.",
    image: "/image/step3-tap-connect.png",
    alt: "Two phones connecting via NFC tap showing instant profile sharing",
    accent: "rgba(91, 69, 232, 0.15)",
    accentBorder: "rgba(124, 108, 240, 0.28)",
  },
];

export function Steps() {
  return (
    <section className="steps" id="how-it-works">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <SectionLabel icon={ListOrdered}>How it works</SectionLabel>
            <h2 className="section-title">Simple. Elegant. Instant.</h2>
          </div>
        </Reveal>

        <div className="steps-grid">
          {stepData.map((step, index) => (
            <Reveal key={step.number} delay={80 + index * 80}>
              <div
                className="step step-img-card"
                data-step={String(index + 1).padStart(2, "0")}
                style={
                  {
                    "--step-accent": step.accent,
                    "--step-accent-border": step.accentBorder,
                  } as React.CSSProperties
                }
              >
                {/* Image area */}
                <div className="step-img-wrap">
                  <div
                    className="step-img-glow"
                    style={{ background: step.accent }}
                  />
                  <img
                    src={step.image}
                    alt={step.alt}
                    className="step-img"
                    draggable={false}
                  />
                </div>

                {/* Text area */}
                <div className="step-body">
                  <div className="step-badge">{step.number}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  
                  <div className="step-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
