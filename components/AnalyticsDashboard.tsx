"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MousePointerClick,
  Eye,
  UserCheck,
  Clock,
  TrendingUp,
  ArrowUpRight,
  Target,
  ChevronDown,
} from "lucide-react";

/* ─────────────────────────────────────────────────
   Custom Social Brand Icons (mockup matching)
   ───────────────────────────────────────────────── */
const LinkedInIcon = () => (
  <svg className="social-icon-svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#0077B5" />
    <path d="M8 11v7h-3v-7h3zm-1.5-1.5c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zM20 18h-3v-3.5c0-1.1-.9-2-2-2s-2 .9-2 2V18h-3v-7h3v1.2c.5-.8 1.5-1.4 2.5-1.4 2.2 0 4 1.8 4 4V18z" fill="#FFF" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="social-icon-svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden>
    <circle cx="12" cy="12" r="11" fill="#25D366" />
    <path d="M12 5.5c-3.58 0-6.5 2.92-6.5 6.5 0 1.25.35 2.41.97 3.4L5.63 18.5l3.22-.84c.94.51 2.02.84 3.15.84 3.58 0 6.5-2.92 6.5-6.5s-2.92-6.5-6.5-6.5zm3.62 9.07c-.15.42-.77.78-1.07.83-.3.05-.69.08-2.07-.48-1.76-.72-2.88-2.52-2.97-2.64-.09-.12-.72-.96-.72-1.84 0-.88.46-1.31.62-1.48.16-.17.36-.21.48-.21.12 0 .24 0 .34.01.11 0 .26-.04.41.32.16.38.54 1.3.59 1.4.05.1.08.21.01.34-.07.13-.11.21-.21.34-.1.13-.22.29-.31.39-.1.1-.21.21-.09.42.12.21.52.86 1.12 1.4.77.69 1.42.9 1.62 1 .2.1.32.08.44-.06.12-.14.52-.61.66-.82.14-.21.28-.18.47-.11.19.07 1.21.57 1.42.67.21.1.35.15.4.24.05.09.05.53-.1.95z" fill="#FFF" />
  </svg>
);

const PortfolioIcon = () => (
  <svg className="social-icon-svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden>
    <circle cx="12" cy="12" r="11" fill="#0EA5E9" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.4z" fill="#FFF" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="social-icon-svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden>
    <defs>
      <radialGradient id="ig-grad" cx="30%" cy="107%" r="130%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-grad)" />
    <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" fill="none" stroke="#FFF" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" fill="none" stroke="#FFF" strokeWidth="1.5" />
    <circle cx="15.5" cy="8.5" r="0.75" fill="#FFF" />
  </svg>
);

/* ─────────────────────────────────────────────────
   Mock Dataset (May 8 – Jun 5)
   ───────────────────────────────────────────────── */
const chartData = [
  { date: "May 8, 2024", taps: 24 },
  { date: "May 9, 2024", taps: 30 },
  { date: "May 10, 2024", taps: 42 },
  { date: "May 11, 2024", taps: 55 },
  { date: "May 12, 2024", taps: 66 },
  { date: "May 13, 2024", taps: 58 },
  { date: "May 14, 2024", taps: 48 },
  { date: "May 15, 2024", taps: 56 },
  { date: "May 16, 2024", taps: 71 },
  { date: "May 17, 2024", taps: 62 },
  { date: "May 18, 2024", taps: 52 },
  { date: "May 19, 2024", taps: 49 },
  { date: "May 20, 2024", taps: 63 }, // Active dot in reference image
  { date: "May 21, 2024", taps: 60 },
  { date: "May 22, 2024", taps: 58 },
  { date: "May 23, 2024", taps: 52 },
  { date: "May 24, 2024", taps: 48 },
  { date: "May 25, 2024", taps: 67 },
  { date: "May 26, 2024", taps: 59 },
  { date: "May 27, 2024", taps: 48 },
  { date: "May 28, 2024", taps: 40 },
  { date: "May 29, 2024", taps: 53 },
  { date: "May 30, 2024", taps: 67 },
  { date: "May 31, 2024", taps: 60 },
  { date: "Jun 1, 2024", taps: 48 },
  { date: "Jun 2, 2024", taps: 52 },
  { date: "Jun 3, 2024", taps: 45 },
  { date: "Jun 4, 2024", taps: 39 },
  { date: "Jun 5, 2024", taps: 42 }
];

export function AnalyticsDashboard() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  /* SVG Coordinates Calculation */
  const getX = (index: number) => 40 + (index / (chartData.length - 1)) * 940;
  const getY = (taps: number) => 220 - (taps / 100) * 190;

  const points = chartData.map((d, i) => [getX(i), getY(d.taps)]);

  // Generate cubic bezier curve path
  let pathD = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];
    const cp1x = p1[0] + (p2[0] - p0[0]) * 0.15;
    const cp1y = p1[1] + (p2[1] - p0[1]) * 0.15;
    const cp2x = p2[0] - (p3[0] - p1[0]) * 0.15;
    const cp2y = p2[1] - (p3[1] - p1[1]) * 0.15;
    pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`;
  }

  const fillD = `${pathD} L ${points[points.length - 1][0]} 220 L ${points[0][0]} 220 Z`;

  // Active hover coordinates
  const activeIndex = hoveredIndex !== null ? hoveredIndex : 12; // Default to index 12 (May 20)
  const activeItem = chartData[activeIndex];
  const activeX = getX(activeIndex);
  const activeY = getY(activeItem.taps);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    
    // Scale clientX to SVG viewBox space (1000 wide)
    const svgWidth = 1000;
    const viewBoxX = (clientX / rect.width) * svgWidth;
    
    let closestIndex = 0;
    let minDistance = Infinity;
    
    for (let i = 0; i < chartData.length; i++) {
      const x = getX(i);
      const dist = Math.abs(viewBoxX - x);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = i;
      }
    }
    
    setHoveredIndex(closestIndex);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  /* Stats Cards Data */
  const stats = [
    {
      title: "Total Taps",
      value: "512",
      growth: "28%",
      comparison: "vs Apr 8 – May 7",
      icon: MousePointerClick,
      iconBg: "rgba(91, 69, 232, 0.08)",
      iconColor: "var(--purple)",
    },
    {
      title: "Profile Views",
      value: "2,847",
      growth: "34%",
      comparison: "vs Apr 8 – May 7",
      icon: Eye,
      iconBg: "rgba(59, 130, 246, 0.08)",
      iconColor: "#3b82f6",
    },
    {
      title: "Contacts Saved",
      value: "38",
      growth: "12%",
      comparison: "vs Apr 8 – May 7",
      icon: UserCheck,
      iconBg: "rgba(34, 197, 94, 0.08)",
      iconColor: "#22c55e",
    },
    {
      title: "Tap-to-Save Rate",
      value: "7.4%",
      growth: "2%",
      comparison: "vs Apr 8 – May 7",
      icon: Clock,
      iconBg: "rgba(245, 158, 11, 0.08)",
      iconColor: "#f59e0b",
    },
  ];

  /* Link Clicks Data */
  const linksData = [
    { name: "LinkedIn", count: 214, percentage: 34, icon: LinkedInIcon, color: "var(--purple)" },
    { name: "WhatsApp", count: 163, percentage: 26, icon: WhatsAppIcon, color: "#10b981" },
    { name: "Portfolio", count: 112, percentage: 18, icon: PortfolioIcon, color: "#3b82f6" },
    { name: "Instagram", count: 58, percentage: 9, icon: InstagramIcon, color: "#e1306c" },
  ];

  /* Footer Cards Data */
  const footerInsights = [
    {
      title: "Best Performing Link",
      subtitle: "LinkedIn drives the most traffic",
      linkText: "View Details",
      icon: TrendingUp,
      iconColor: "var(--purple)",
      iconBg: "rgba(91, 69, 232, 0.08)",
    },
    {
      title: "Engagement Growth",
      subtitle: "Your profile views are up 34%",
      linkText: "View Details",
      icon: ArrowUpRight,
      iconColor: "#22c55e",
      iconBg: "rgba(34, 197, 94, 0.08)",
    },
    {
      title: "Top Activity Time",
      subtitle: "Mon - Wed, 10AM - 2PM",
      linkText: "View Details",
      icon: Clock,
      iconColor: "#f59e0b",
      iconBg: "rgba(245, 158, 11, 0.08)",
    },
    {
      title: "Improve Your Rate",
      subtitle: "Add more links to increase saves",
      linkText: "View Tips",
      icon: Target,
      iconColor: "var(--purple-light)",
      iconBg: "rgba(124, 108, 240, 0.08)",
    },
  ];

  return (
    <div className="analytics-dashboard-wrap">
      {/* ── 1. Taps Trend Chart Card ── */}
      <section className="analytics-card chart-card" aria-label="Taps Trend Section">
        <header className="chart-header">
          <h2 className="chart-title">Taps Trend</h2>
          <div className="chart-dropdown">
            <span>Daily</span>
            <ChevronDown size={14} aria-hidden />
          </div>
        </header>

        <div className="chart-plot-wrap">
          {/* Tooltip */}
          <div
            className="chart-tooltip"
            style={{
              left: `${(activeX / 1000) * 100}%`,
              top: `${(activeY / 250) * 100}%`,
            }}
          >
            <div className="tooltip-date">{activeItem.date}</div>
            <div className="tooltip-value">
              <span className="tooltip-dot" />
              <strong>{activeItem.taps} Taps</strong>
            </div>
            <div className="tooltip-arrow" />
          </div>

          <svg
            viewBox="0 0 1000 250"
            className="analytics-chart-svg"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            aria-label="Taps trend line chart"
          >
            <defs>
              <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--purple)" stopOpacity="0.24" />
                <stop offset="100%" stopColor="var(--purple)" stopOpacity="0.00" />
              </linearGradient>
            </defs>

            {/* Gridlines */}
            {[0, 20, 40, 60, 80, 100].map((val) => {
              const y = getY(val);
              return (
                <g key={val}>
                  <line
                    x1="40"
                    y1={y}
                    x2="980"
                    y2={y}
                    stroke="rgba(12, 12, 15, 0.05)"
                    strokeWidth="1"
                    strokeDasharray={val === 0 ? "none" : "4 4"}
                  />
                  <text x="10" y={y + 4} className="chart-y-label">
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Filled Area */}
            <path d={fillD} fill="url(#chart-glow)" />

            {/* Stroke Line */}
            <path
              d={pathD}
              fill="none"
              stroke="var(--purple)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Hover Dashed Vertical Line */}
            <line
              x1={activeX}
              y1="20"
              x2={activeX}
              y2="220"
              stroke="var(--purple)"
              strokeOpacity="0.2"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Active Marker Dot */}
            <circle cx={activeX} cy={activeY} r="9" fill="var(--purple)" fillOpacity="0.15" />
            <circle cx={activeX} cy={activeY} r="4.5" fill="var(--purple)" stroke="#ffffff" strokeWidth="2" />

            {/* X Axis Date Labels */}
            {[0, 4, 8, 12, 16, 20, 24, 28].map((idx) => {
              const item = chartData[idx];
              if (!item) return null;
              // Format label to match mockup: "May 8", "May 12", etc.
              const labelParts = item.date.split(",");
              const shortDate = labelParts[0]; // e.g. "May 8"
              return (
                <text
                  key={idx}
                  x={getX(idx)}
                  y="244"
                  className="chart-x-label"
                  textAnchor="middle"
                >
                  {shortDate}
                </text>
              );
            })}
          </svg>
        </div>
      </section>

      {/* ── 2. Statistics Grid (4 Cards) ── */}
      <section className="analytics-stats-grid" aria-label="Key Performance Indicators">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              className="analytics-stat-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              whileHover={{ y: -4, boxShadow: "var(--shadow-md)" }}
            >
              <div
                className="stat-icon-wrap"
                style={{ backgroundColor: item.iconBg, color: item.iconColor }}
              >
                <Icon size={20} className="stat-icon" aria-hidden />
              </div>
              <div className="stat-content">
                <div className="stat-value">{item.value}</div>
                <div className="stat-title">{item.title}</div>
                <div className="stat-growth-row">
                  <span className="stat-growth">↑ {item.growth}</span>
                  <span className="stat-comparison">{item.comparison}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* ── 3. Top Link Clicks Card ── */}
      <section className="analytics-card link-clicks-card" aria-labelledby="link-clicks-title">
        <h2 className="card-section-title" id="link-clicks-title">
          Top Link Clicks
        </h2>
        <div className="link-clicks-list">
          {linksData.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={item.name} className="link-click-row">
                <div className="link-brand">
                  <IconComponent />
                  <span className="link-name">{item.name}</span>
                </div>

                <div className="link-progress-wrap">
                  <motion.div
                    className="link-progress-bar"
                    style={{ backgroundColor: item.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ delay: 0.15 + idx * 0.1, duration: 0.85, ease: "easeOut" }}
                  />
                </div>

                <div className="link-numbers">
                  <span className="link-count">{item.count}</span>
                  <span className="link-percentage">{item.percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 4. Secondary Analytics Grid (4 Cards) ── */}
      <section className="analytics-insights-grid" aria-label="Insights & Actions">
        {footerInsights.map((insight, idx) => {
          const InsightIcon = insight.icon;
          return (
            <motion.div
              key={insight.title}
              className="analytics-insight-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + idx * 0.08, duration: 0.4 }}
              whileHover={{ y: -3 }}
            >
              <div className="insight-card-main">
                <div
                  className="insight-icon-wrap"
                  style={{ backgroundColor: insight.iconBg, color: insight.iconColor }}
                >
                  <InsightIcon size={18} aria-hidden />
                </div>
                <div className="insight-info">
                  <h3 className="insight-title">{insight.title}</h3>
                  <p className="insight-subtitle">{insight.subtitle}</p>
                  <button className="insight-action-link">
                    {insight.linkText} <span className="arrow-glyph">→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
}
