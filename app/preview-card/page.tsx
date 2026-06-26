"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
} from "lucide-react";

/* ─────────────────────────────────────────────────
   Preview Card Page
   ───────────────────────────────────────────────── */
export default function PreviewCardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  // Form state
  const [fullName, setFullName] = useState("John Doe");
  const [designation, setDesignation] = useState("Lead Designer");
  const [companyName, setCompanyName] = useState("HappyTap");
  const [mobileNumber, setMobileNumber] = useState("+91 98765 43210");
  const [emailAddress, setEmailAddress] = useState("john.doe@example.com");
  const [companyDescription, setCompanyDescription] = useState("Digital designer and entrepreneur");
  const [businessAddress, setBusinessAddress] = useState("123 Innovation Way, Tech Park, Bangalore");
  const [selectedTheme, setSelectedTheme] = useState<"purple" | "lavender" | "midnight" | "emerald">("purple");
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  /* Load profile config on mount */
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("happytap_user_profile");
      if (stored) {
        const p = JSON.parse(stored);
        if (p.fullName) setFullName(p.fullName);
        if (p.designation) setDesignation(p.designation);
        if (p.companyName) setCompanyName(p.companyName);
        if (p.mobileNumber) setMobileNumber(p.mobileNumber);
        if (p.emailAddress) setEmailAddress(p.emailAddress);
        if (p.companyDescription) setCompanyDescription(p.companyDescription);
        if (p.businessAddress) setBusinessAddress(p.businessAddress);
        if (p.selectedTheme) setSelectedTheme(p.selectedTheme);
      }
    } catch (err) {
      console.error("Error loading profile:", err);
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="preview-card-page">
      {/* Header */}
      <header className="preview-card-header">
        <Link href="/" className="preview-card-back-btn">
          <ArrowLeft size={18} />
          Back to Product Details
        </Link>
        <h1 className="preview-card-title">Profile Preview Dashboard</h1>
      </header>

      {/* Main content */}
      <div className="preview-card-content">
        {/* Left Column: Edit Form */}
        <div className="preview-card-edit-panel">
          <h2 className="preview-card-section-title">Edit Profile Information</h2>

          {/* Full Name */}
          <div className="preview-card-form-group">
            <label className="preview-card-label">FULL NAME</label>
            <input
              type="text"
              className="preview-card-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
            />
          </div>

          {/* Designation & Company */}
          <div className="preview-card-form-row">
            <div className="preview-card-form-group">
              <label className="preview-card-label">DESIGNATION</label>
              <input
                type="text"
                className="preview-card-input"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="Job title"
              />
            </div>
            <div className="preview-card-form-group">
              <label className="preview-card-label">COMPANY NAME</label>
              <input
                type="text"
                className="preview-card-input"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Company"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="preview-card-form-row">
            <div className="preview-card-form-group">
              <label className="preview-card-label">PHONE NUMBER</label>
              <input
                type="tel"
                className="preview-card-input"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <div className="preview-card-form-group">
              <label className="preview-card-label">EMAIL ADDRESS</label>
              <input
                type="email"
                className="preview-card-input"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="email@example.com"
              />
            </div>
          </div>

          {/* Location */}
          <div className="preview-card-form-group">
            <label className="preview-card-label">LOCATION ADDRESS</label>
            <input
              type="text"
              className="preview-card-input"
              value={businessAddress}
              onChange={(e) => setBusinessAddress(e.target.value)}
              placeholder="Your address"
            />
          </div>


        </div>

        {/* Right Column: Preview */}
        <div className="preview-card-preview-panel">
          {/* Card Preview */}
          <div className="preview-card-card-section">
            <h3 className="preview-card-preview-title">Live Card Preview</h3>
            <div className="card-flip-container" onClick={() => setIsCardFlipped(!isCardFlipped)}>
              <div className={`card-flip-inner ${isCardFlipped ? "flipped" : ""}`}>
                {/* Front of Card */}
                <div className="card-front">
                  <div className="preview-card-card-mockup theme-copper">
                    <div className="card-face">
                      <div className="card-gradient"></div>
                      <div className="card-name">{fullName || "JOHN DOE"}</div>
                      <div className="card-brand">{companyName || "HAPPYTAP"}</div>
                      <div className="card-wave"></div>
                    </div>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="card-back">
                  <div className="preview-card-card-mockup-back theme-copper">
                    <div className="card-back-strip"></div>
                    <div className="card-back-content">
                      <div className="card-back-qr">
                        <img 
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1pAY7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEpklEQVR4nO2dv2rcQBDGV6AQRFIQ0qbwC1joIYhfIM/DwM5NETwYOSqsEjzYSZpAvURAEShFYDiE1FxhHJS6cJtNbDuJRJL/drczO7M7O7/vBwRSHHZnv9tpZndnJImiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqifNOQ53kFEO4dz/Pjbrd7srGxEUgSRRFFUa7X64s4jre32+35YrEI7Pf71el0ulwul+fjdDpdbDabQBiGvnM8z6vg8Xg8Ho/H4/H8QRRFeZZlkiQZCoVClmURCoWcz2cVEEFR1Xw+VxaLhVIqFeV6vQbwarUKfL1eVYhEq9UycBwHxXG8CjK49Xp94jgO0Ov1SCMX/cK2baVpGolEAkSjUSBKpRJ8PJ/PgSwWCxSPx4kVEPXCHo/Hs0aTJIkKBALBIHCvQPmhNS8Ly9RZ0xU9L7cNQzPPJcYY7TCQZKkNywPEaJ3gY3WPJcY4XqJ0Qp3Ph6PfzQNZZJJQzXlU5OXe7xekxXua5nJQ8d6vf7O8Xj8K2N9Pl8p27a3gVdB4vE4KPQB63Q6Hy9R7nUTJrm8pIaIAu8CjLdcok5qW6vYUqoWZVIqVg0NTU1rlxSj0ZSV1dXp3XfvgbCuLwq6jc1vqN7OWvZ2tr6pR0IBIIhEAhMVvX09PzSHotEIuMgMNgpI8jRQh2Px9+pxN8xDx8dHb1RQV1dXWPKxuNxINByuQRoNBoGJZPJhkpQqVS+k1r1q0gLvIrO53OwWq1AqVQygvYCblXh0W/DfQVKpRKopKSEHe12G9TtdsFsNgeyGdxSZ5/nqkgrPI1Go0Cv12OvQO1222CzyWT6yb95Y1RFNHR2dnJXdLlcgvF4DJRKJZDJZAZqtVoG1Wo1kMlkQDweBzqd7pPE/+qFFKwg6s9h/7/hYrGApVIJlMtlY8hRKZWKT/JKwQoiqnD5fHgfcPx8tVQ0A2J9pVkDgkfKhBSsqKDadDrlzGWz2QZ6vR7kcjkQj8dBNBo1hvYvhqWCbG1tfZQ9U3lkbW3tRygUGpIZYH7fMNTj8cBgMGhQOp0Ghw8fNhQKhQJ0u13odDrj7hUqb5Cj0SigsrKSUl7PsA2VSuUT2WoB4GKjWS1/CyVfHvvz5nYmPkdP5VQoxagV1dUVlUqlQj6fB6lUaoBSrlVGNF4qlBEr7BvLVYRVT8+WxRCKcHT1FZVJJfnX6+t4haPd+ngnjVmVWiUfMiZrLBT6cKTLGGMMAjSqHb7Xr88OmMON3qL6hA4RNTBbJG2E9hCwmL8KUaEm9KS3KaJQUGkB4XTvQSi1RWgGhFfUa1yj7VlWJPP2WcExWjPh+BkTBWuapSeLkKJhMtQvmUCv3/eV7eGqMqeU9rWqvSJ2Y5VNs61w0Rjs8O5bHuW1sVrWkVVVvlCWrjFxQkZJNHv9+OuOvX1d23wJmlUnNDCfbWDJkrPYQ5RnyVQFUEHo9bv9+m2n9PEWvP0AAAAASUVORK5CYII=" 
                          alt="QR Code"
                          className="qr-code-sample"
                        />
                      </div>
                      <div className="card-back-info">
                        <div className="card-back-field">
                          <span className="value">{fullName || "John Doe"}</span>
                        </div>
                        <div className="card-back-field">
                          <span className="value">{designation || "Lead Designer"}</span>
                        </div>
                        <div className="card-back-field">
                          <span className="value">{companyName || "HappyTap"}</span>
                        </div>
                        <div className="card-back-field">
                          <span className="value">{mobileNumber || "+91 98765 43210"}</span>
                        </div>
                        <div className="card-back-field">
                          <span className="value">{businessAddress || "123 Innovation Way"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="card-flip-hint">Click to flip card</p>
          </div>

          {/* CTA Section */}
          <div className="preview-card-cta-section">
            <div className="cta-box">
              <h4 className="cta-title">Ready to build your complete digital profile?</h4>
              <p className="cta-subtitle">Claim your custom username, choose premium themes, and connect your systems in the Dashboard.</p>
              <button className="cta-button" onClick={() => router.push('/dashboard')}>
                Continue to Build Profile
                <span className="cta-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
