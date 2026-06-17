"use client";

import React, { useEffect, useState } from "react";

/* ─────────────────────────────────────────────────
   Animated progress bar width hook
   ───────────────────────────────────────────────── */
function useAnimatedWidth(target: number, delay: number = 0) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(target), 80 + delay);
    return () => clearTimeout(t);
  }, [target, delay]);
  return width;
}

/* ─────────────────────────────────────────────────
   Social Brand Icon SVGs
   ───────────────────────────────────────────────── */
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden>
    <rect x="1" y="1" width="22" height="22" rx="5" fill="#0077B5" />
    <path
      d="M8 11v7H5v-7h3zm-1.5-5.5a1.75 1.75 0 110 3.5 1.75 1.75 0 010-3.5zM19 18h-3v-3.5C16 13.12 14.88 12 13.5 12S11 13.12 11 14.5V18H8v-7h3v1.2c.57-.87 1.6-1.4 2.5-1.4C15.65 10.8 19 12.55 19 15.5V18z"
      fill="#fff"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden>
    <circle cx="12" cy="12" r="11" fill="#25D366" />
    <path
      d="M12 5.5c-3.58 0-6.5 2.92-6.5 6.5 0 1.25.35 2.41.97 3.4L5.63 18.5l3.22-.84c.94.51 2.02.84 3.15.84 3.58 0 6.5-2.92 6.5-6.5s-2.92-6.5-6.5-6.5z"
      fill="#fff"
      fillOpacity="0.9"
    />
    <path
      d="M15.62 14.57c-.15.42-.77.78-1.07.83-.3.05-.69.08-2.07-.48-1.76-.72-2.88-2.52-2.97-2.64-.09-.12-.72-.96-.72-1.84 0-.88.46-1.31.62-1.48.16-.17.36-.21.48-.21.12 0 .24 0 .34.01.11 0 .26-.04.41.32.16.38.54 1.3.59 1.4.05.1.08.21.01.34-.07.13-.11.21-.21.34s-.21.29-.31.39c-.1.1-.21.21-.09.42.12.21.52.86 1.12 1.4.77.69 1.42.9 1.62 1 .2.1.32.08.44-.06.12-.14.52-.61.66-.82.14-.21.28-.18.47-.11.19.07 1.21.57 1.42.67.21.1.35.15.4.24.05.09.05.53-.1.95z"
      fill="#25D366"
    />
  </svg>
);

const PortfolioIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden>
    <circle cx="12" cy="12" r="11" fill="#2563EB" />
    <path
      d="M12 3.5A8.5 8.5 0 103.5 12 8.51 8.51 0 0012 3.5zm-1 14.93V17a1 1 0 00-1-1H7.5a7 7 0 01-4-7.45A6.5 6.5 0 0111 5.07v13.36zm2 0V5.07A6.5 6.5 0 0117.5 8.55 7 7 0 0113.5 16h-.5v2.43z"
      fill="#fff"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden>
    <defs>
      <radialGradient id="ig-g2" cx="30%" cy="107%" r="130%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <rect x="1" y="1" width="22" height="22" rx="5.5" fill="url(#ig-g2)" />
    <rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="#fff" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3.5" fill="none" stroke="#fff" strokeWidth="1.5" />
    <circle cx="16" cy="8" r="1" fill="#fff" />
  </svg>
);

/* ─────────────────────────────────────────────────
   Stat Card
   ───────────────────────────────────────────────── */
interface StatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  value: string;
  label: string;
  growth: string;
}

function StatCard({ icon, iconBg, value, label, growth }: StatCardProps) {
  return (
    <div className="ad2-stat-card">
      <div className="ad2-stat-icon" style={{ background: iconBg }}>
        {icon}
      </div>
      <div className="ad2-stat-body">
        <div className="ad2-stat-value">{value}</div>
        <div className="ad2-stat-label">{label}</div>
        <div className="ad2-stat-growth">↑ {growth}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Link Row
   ───────────────────────────────────────────────── */
interface LinkRowProps {
  icon: React.ReactNode;
  name: string;
  count: number;
  pct: number;
  color: string;
  delay: number;
}

function LinkRow({ icon, name, count, pct, color, delay }: LinkRowProps) {
  const w = useAnimatedWidth(pct, delay);
  return (
    <div className="ad2-link-row">
      <div className="ad2-link-brand">
        {icon}
        <span className="ad2-link-name">{name}</span>
      </div>
      <div className="ad2-link-bar-track">
        <div
          className="ad2-link-bar-fill"
          style={{
            width: `${w}%`,
            background: color,
            transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
      <span className="ad2-link-count">{count}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────────── */
export function AnalyticsDashboard() {
  const tabs = ["PROFILE", "LINKS", "THEME", "ANALYTICS"];

  return (
    <div className="ad2-wrapper">
      {/* ── Header ── */}
      <div className="ad2-header">
        <h2 className="ad2-title">Profile Editor</h2>
        <button className="ad2-publish-btn">Save &amp; Publish</button>
      </div>

      {/* ── Tabs ── */}
      <div className="ad2-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`ad2-tab${tab === "ANALYTICS" ? " active" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="ad2-content">
        {/* Period label */}
        <p className="ad2-period">LAST 30 DAYS</p>

        {/* 2×2 Stats Grid */}
        <div className="ad2-stats-grid">
          <StatCard
            iconBg="#e8f5e9"
            icon={
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#34a853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 11a6 6 0 01-12 0V5a6 6 0 0112 0v6z" />
                <path d="M12 17v4M8 21h8" />
              </svg>
            }
            value="512"
            label="TOTAL TAPS"
            growth="28%"
          />
          <StatCard
            iconBg="#e3f2fd"
            icon={
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#2196f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12C1 12 5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            }
            value="2,847"
            label="PROFILE VIEWS"
            growth="34%"
          />
          <StatCard
            iconBg="#ede7f6"
            icon={
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M3 9h18M9 4v5" />
                <circle cx="15" cy="15" r="2" />
              </svg>
            }
            value="38"
            label="CONTACTS SAVED"
            growth="12%"
          />
          <StatCard
            iconBg="#fff8e1"
            icon={
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            }
            value="7.4%"
            label="TAP→SAVE RATE"
            growth="2%"
          />
        </div>

        {/* Top Link Clicks */}
        <div className="ad2-links-section">
          <h3 className="ad2-links-title">TOP LINK CLICKS</h3>
          <div className="ad2-links-list">
            <LinkRow icon={<LinkedInIcon />}  name="LinkedIn"  count={214} pct={100} color="#111"   delay={0} />
            <LinkRow icon={<WhatsAppIcon />}  name="WhatsApp"  count={163} pct={76}  color="#25D366" delay={80} />
            <LinkRow icon={<PortfolioIcon />} name="Portfolio" count={112} pct={52}  color="#2563EB" delay={160} />
            <LinkRow icon={<InstagramIcon />} name="Instagram" count={58}  pct={27}  color="#e1306c" delay={240} />
          </div>
        </div>
      </div>

      <style>{`
        /* ── Wrapper ── */
        .ad2-wrapper {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.06);
          overflow: hidden;
          font-family: inherit;
        }

        /* ── Header ── */
        .ad2-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px 0;
        }
        .ad2-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111;
          margin: 0;
        }
        .ad2-publish-btn {
          background: #84cc16;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 10px 20px;
          font-size: 0.875rem;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: background 0.2s;
        }
        .ad2-publish-btn:hover { background: #65a30d; }

        /* ── Tabs ── */
        .ad2-tabs {
          display: flex;
          gap: 0;
          padding: 0 28px;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          margin-top: 18px;
        }
        .ad2-tab {
          background: none;
          border: none;
          border-bottom: 2.5px solid transparent;
          padding: 12px 18px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #86868b;
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: color 0.15s, border-color 0.15s;
          margin-bottom: -1px;
        }
        .ad2-tab:hover { color: #111; }
        .ad2-tab.active {
          color: #5b45e8;
          border-bottom-color: #5b45e8;
        }

        /* ── Content area ── */
        .ad2-content {
          padding: 24px 28px 28px;
        }
        .ad2-period {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #86868b;
          margin: 0 0 16px;
        }

        /* ── Stats 2×2 grid ── */
        .ad2-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 28px;
        }
        .ad2-stat-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: #f9f9fb;
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 12px;
          padding: 18px 20px;
        }
        .ad2-stat-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .ad2-stat-body { display: flex; flex-direction: column; gap: 2px; }
        .ad2-stat-value {
          font-size: 1.6rem;
          font-weight: 800;
          color: #111;
          line-height: 1.1;
        }
        .ad2-stat-label {
          font-size: 0.67rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          color: #86868b;
          text-transform: uppercase;
        }
        .ad2-stat-growth {
          font-size: 0.8rem;
          font-weight: 600;
          color: #22c55e;
          margin-top: 2px;
        }

        /* ── Links section ── */
        .ad2-links-section {}
        .ad2-links-title {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #86868b;
          margin: 0 0 16px;
          text-transform: uppercase;
        }
        .ad2-links-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .ad2-link-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .ad2-link-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 120px;
          flex-shrink: 0;
        }
        .ad2-link-name {
          font-size: 0.875rem;
          font-weight: 500;
          color: #111;
          white-space: nowrap;
        }
        .ad2-link-bar-track {
          flex: 1;
          height: 7px;
          background: #f0f0f0;
          border-radius: 100px;
          overflow: hidden;
        }
        .ad2-link-bar-fill {
          height: 100%;
          border-radius: 100px;
          width: 0;
        }
        .ad2-link-count {
          font-size: 0.875rem;
          font-weight: 700;
          color: #111;
          width: 36px;
          text-align: right;
          flex-shrink: 0;
        }

        @media (max-width: 600px) {
          .ad2-stats-grid { grid-template-columns: 1fr; }
          .ad2-header, .ad2-tabs, .ad2-content { padding-left: 16px; padding-right: 16px; }
          .ad2-link-brand { width: 100px; }
        }
      `}</style>
    </div>
  );
}
