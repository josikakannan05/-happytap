"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  Check,
  Plus,
  Zap,
  Sliders,
  Cpu,
  Layers,
  Nfc,
  Eye,
  CheckCircle2,
} from "lucide-react";

interface ThemeCustomizerProps {
  firstName: string;
  lastName: string;
  role: string;
  onSaveStatus: (saved: boolean) => void;
}

export interface ThemeCustomizerHandle {
  save: () => void;
}

// SVG Background Patterns as Components or inline SVGs
const WavePattern = () => (
  <svg
    className="card-pattern-svg"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    opacity="0.12"
  >
    <path
      d="M -20,60 C 20,40 40,80 80,60 C 120,40 140,80 180,60 C 220,40 240,80 280,60 C 320,40 340,80 380,60"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M -20,100 C 20,80 40,120 80,100 C 120,80 140,120 180,100 C 220,80 240,120 280,100 C 320,80 340,120 380,100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M -20,140 C 20,120 40,160 80,140 C 120,120 140,160 180,140 C 220,120 240,160 280,140 C 320,120 340,160 380,140"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const DotsPattern = () => (
  <svg
    className="card-pattern-svg"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="1.5" fill="currentColor" opacity="0.15" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>
);

const LinesPattern = () => (
  <svg
    className="card-pattern-svg"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="lines" width="20" height="20" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="20" stroke="currentColor" strokeWidth="1.5" opacity="0.12" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#lines)" />
  </svg>
);

const GeometricPattern = () => (
  <svg
    className="card-pattern-svg"
    width="100%"
    height="100%"
    viewBox="0 0 400 250"
    xmlns="http://www.w3.org/2000/svg"
    opacity="0.08"
    fill="none"
    stroke="currentColor"
  >
    <polygon points="50,20 120,80 40,140" strokeWidth="1.5" />
    <polygon points="320,30 380,100 280,120" strokeWidth="1.5" />
    <circle cx="200" cy="125" r="60" strokeWidth="1.5" />
    <line x1="0" y1="0" x2="400" y2="250" strokeWidth="1" />
    <line x1="400" y1="0" x2="0" y2="250" strokeWidth="1" />
  </svg>
);

// Wood grain SVG filter
const WoodGrainFilter = () => (
  <svg style={{ position: "absolute", width: 0, height: 0 }}>
    <defs>
      <filter id="procedural-wood-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.015 0.08" numOctaves="4" result="noise" />
        <feColorMatrix
          type="matrix"
          values="
            0.55 0    0    0    0.35
            0    0.35 0    0    0.20
            0    0    0.15 0    0.10
            0    0    0    1    0"
        />
      </filter>
    </defs>
  </svg>
);

export const ThemeCustomizer = forwardRef<ThemeCustomizerHandle, ThemeCustomizerProps>(
  ({ firstName, lastName, role, onSaveStatus }, ref) => {
    // Customization states
    const [cardStyle, setCardStyle] = useState<string>("classic");
    const [cardColor, setCardColor] = useState<string>("#161618");
    const [backgroundPattern, setBackgroundPattern] = useState<string>("none");
    const [showLogo, setShowLogo] = useState<boolean>(true);
    const [logoPosition, setLogoPosition] = useState<string>("top-right");
    const [textColor, setTextColor] = useState<string>("white");
    const [showNfcBadge, setShowNfcBadge] = useState<boolean>(true);
    const [material, setMaterial] = useState<string>("metal");
    const [finish, setFinish] = useState<string>("matte");

    const [customColor, setCustomColor] = useState<string>("#8a2be2");
    const colorInputRef = useRef<HTMLInputElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    // 3D tilt states (computed dynamically on mouse move)
    const [transformStyle, setTransformStyle] = useState<string>("");
    const [glareStyle, setGlareStyle] = useState<any>({ opacity: 0 });

    // Load initial settings from localStorage on mount
    useEffect(() => {
      const savedSettings = localStorage.getItem("happytap_theme_config");
      if (savedSettings) {
        try {
          const config = JSON.parse(savedSettings);
          if (config.cardStyle) setCardStyle(config.cardStyle);
          if (config.cardColor) setCardColor(config.cardColor);
          if (config.backgroundPattern) setBackgroundPattern(config.backgroundPattern);
          if (config.showLogo !== undefined) setShowLogo(config.showLogo);
          if (config.logoPosition) setLogoPosition(config.logoPosition);
          if (config.textColor) setTextColor(config.textColor);
          if (config.showNfcBadge !== undefined) setShowNfcBadge(config.showNfcBadge);
          if (config.material) setMaterial(config.material);
          if (config.finish) setFinish(config.finish);
        } catch (e) {
          console.error("Failed to parse theme settings", e);
        }
      }
    }, []);

    // Expose Save method to parent
    useImperativeHandle(ref, () => ({
      save() {
        const config = {
          cardStyle,
          cardColor,
          backgroundPattern,
          showLogo,
          logoPosition,
          textColor,
          showNfcBadge,
          material,
          finish,
        };
        localStorage.setItem("happytap_theme_config", JSON.stringify(config));
        onSaveStatus(true);
        setTimeout(() => onSaveStatus(false), 3000);
      },
    }));

    // Handle color picker change
    const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const col = e.target.value;
      setCustomColor(col);
      setCardColor(col);
    };

    // 3D Tilt Card Effects
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Max Tilt angle
      const tiltX = -(y / (rect.height / 2)) * 14;
      const tiltY = (x / (rect.width / 2)) * 14;

      setTransformStyle(
        `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`
      );

      // Glare gradient calculation
      const glareX = ((e.clientX - rect.left) / rect.width) * 100;
      const glareY = ((e.clientY - rect.top) / rect.height) * 100;

      setGlareStyle({
        opacity: finish === "glossy" ? 0.35 : 0.15,
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, ${
          finish === "glossy" ? "0.65" : "0.3"
        }) 0%, rgba(255, 255, 255, 0) 60%)`,
      });
    };

    const handleMouseLeave = () => {
      setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
      setGlareStyle({ opacity: 0 });
    };

    // Card background styling logic
    const getCardBackground = () => {
      if (cardStyle === "minimal") {
        return "#f7f9fa";
      }

      if (cardStyle === "gradient") {
        // Generate a beautiful, cohesive gradient based on selected cardColor
        return `linear-gradient(135deg, ${cardColor} 0%, #3e1b85 100%)`;
      }

      if (cardStyle === "premium") {
        // Metallic reflection premium texture
        return `linear-gradient(135deg, #111112 0%, #26262b 50%, #0c0c0e 100%)`;
      }

      // Default/Classic: Solid color background
      return cardColor;
    };

    // Card border outline logic
    const getCardBorder = () => {
      if (cardStyle === "minimal") {
        return "1px solid rgba(12, 12, 15, 0.08)";
      }
      if (cardStyle === "premium") {
        return "1.5px solid #d4af37";
      }
      return "1px solid rgba(255, 255, 255, 0.06)";
    };

    // Text color classes / styling
    const getTextColorHex = () => {
      switch (textColor) {
        case "black":
          return "#161618";
        case "gray":
          return "#71717a";
        case "gold":
          return "#c5a880";
        case "white":
        default:
          return "#ffffff";
      }
    };

    return (
      <div className="theme-redesign-container">
        {/* Procedural SVGs */}
        <WoodGrainFilter />

        {/* LEFT COLUMN: Customization Panel */}
        <div className="theme-control-panel">
          {/* 1. Card Style */}
          <div className="theme-control-section">
            <h3 className="theme-section-title">1. Card Style</h3>
            <div className="theme-style-grid">
              {[
                { id: "classic", label: "Classic", bg: "#161618" },
                {
                  id: "gradient",
                  label: "Gradient",
                  bg: "linear-gradient(135deg, #2e4374 0%, #5b45e8 100%)",
                },
                { id: "minimal", label: "Minimal", bg: "#f7f9fa", border: "1px solid rgba(0,0,0,0.08)" },
                { id: "premium", label: "Premium", bg: "radial-gradient(circle, #26262b 0%, #0c0c0e 100%)", border: "1px solid #c5a880" },
              ].map((style) => (
                <button
                  key={style.id}
                  type="button"
                  className={`theme-style-card${cardStyle === style.id ? " active" : ""}`}
                  onClick={() => setCardStyle(style.id)}
                >
                  <div
                    className="theme-style-mini-card"
                    style={{ background: style.bg, border: style.border }}
                  >
                    {cardStyle === style.id && (
                      <span className="theme-style-mini-check">
                        <Check size={10} strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <span className="theme-style-label">{style.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Card Color */}
          <div className="theme-control-section">
            <h3 className="theme-section-title">2. Card Color</h3>
            <div className="theme-colors-row">
              {[
                { hex: "#161618", label: "Black" },
                { hex: "#c5a880", label: "Gold" },
                { hex: "#2e4374", label: "Dark Blue" },
                { hex: "#5b45e8", label: "Purple" },
                { hex: "#10b981", label: "Green" },
                { hex: "#ef4444", label: "Red" },
                { hex: "#ffffff", label: "White" },
              ].map((col) => (
                <button
                  key={col.hex}
                  type="button"
                  className={`theme-color-swatch${cardColor === col.hex ? " active" : ""}`}
                  style={{ backgroundColor: col.hex }}
                  onClick={() => setCardColor(col.hex)}
                  title={col.label}
                  aria-label={`Select ${col.label} card color`}
                >
                  {cardColor === col.hex && (
                    <Check
                      size={14}
                      className="swatch-check"
                      strokeWidth={3}
                      style={{ color: col.hex === "#ffffff" ? "#000" : "#fff" }}
                    />
                  )}
                </button>
              ))}

              {/* Custom Color Selector */}
              <button
                type="button"
                className={`theme-color-swatch custom-picker-btn${
                  cardColor !== "#161618" &&
                  cardColor !== "#c5a880" &&
                  cardColor !== "#2e4374" &&
                  cardColor !== "#5b45e8" &&
                  cardColor !== "#10b981" &&
                  cardColor !== "#ef4444" &&
                  cardColor !== "#ffffff"
                    ? " active"
                    : ""
                }`}
                style={{
                  background:
                    cardColor !== "#161618" &&
                    cardColor !== "#c5a880" &&
                    cardColor !== "#2e4374" &&
                    cardColor !== "#5b45e8" &&
                    cardColor !== "#10b981" &&
                    cardColor !== "#ef4444" &&
                    cardColor !== "#ffffff"
                      ? cardColor
                      : "transparent",
                }}
                onClick={() => colorInputRef.current?.click()}
                title="Select custom color"
                aria-label="Select custom color"
              >
                <Plus size={16} />
                <input
                  ref={colorInputRef}
                  type="color"
                  value={customColor}
                  onChange={handleCustomColorChange}
                  className="theme-hidden-color-input"
                />
              </button>
            </div>
          </div>

          {/* 3. Background Pattern */}
          <div className="theme-control-section">
            <h3 className="theme-section-title">3. Background</h3>
            <div className="theme-pattern-grid">
              {[
                { id: "none", label: "None" },
                { id: "wave", label: "Wave" },
                { id: "dots", label: "Dots" },
                { id: "lines", label: "Lines" },
                { id: "geometric", label: "Geometric" },
              ].map((pattern) => (
                <button
                  key={pattern.id}
                  type="button"
                  className={`theme-pattern-card${backgroundPattern === pattern.id ? " active" : ""}`}
                  onClick={() => setBackgroundPattern(pattern.id)}
                >
                  <div className="theme-pattern-mini-wrap">
                    {pattern.id === "none" && (
                      <div className="pattern-none-slash" />
                    )}
                    {pattern.id === "wave" && <WavePattern />}
                    {pattern.id === "dots" && <DotsPattern />}
                    {pattern.id === "lines" && <LinesPattern />}
                    {pattern.id === "geometric" && <GeometricPattern />}
                  </div>
                  <span className="theme-pattern-label">{pattern.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Logo Settings */}
          <div className="theme-control-section">
            <div className="theme-toggle-row">
              <span className="theme-toggle-label">Show Logo</span>
              <button
                type="button"
                className={`theme-switch-btn${showLogo ? " active" : ""}`}
                onClick={() => setShowLogo(!showLogo)}
                aria-label="Toggle showing logo"
              >
                <span className="theme-switch-thumb" />
              </button>
            </div>

            <div className="theme-sub-settings-wrap">
              <span className="theme-sub-label">Logo Position</span>
              <div className="theme-pills-row">
                {[
                  { id: "top-left", label: "Top Left" },
                  { id: "top-right", label: "Top Right" },
                  { id: "bottom-left", label: "Bottom Left" },
                  { id: "bottom-right", label: "Bottom Right" },
                ].map((pos) => (
                  <button
                    key={pos.id}
                    type="button"
                    className={`theme-pill-btn${logoPosition === pos.id ? " active" : ""}`}
                    onClick={() => setLogoPosition(pos.id)}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Text Color */}
          <div className="theme-control-section">
            <h3 className="theme-section-title">5. Text Color</h3>
            <div className="theme-colors-row">
              {[
                { hex: "#ffffff", id: "white", label: "White" },
                { hex: "#161618", id: "black", label: "Black" },
                { hex: "#71717a", id: "gray", label: "Gray" },
                { hex: "#c5a880", id: "gold", label: "Gold" },
              ].map((col) => (
                <button
                  key={col.id}
                  type="button"
                  className={`theme-color-swatch${textColor === col.id ? " active" : ""}`}
                  style={{ backgroundColor: col.hex }}
                  onClick={() => setTextColor(col.id)}
                  title={col.label}
                  aria-label={`Select ${col.label} text color`}
                >
                  {textColor === col.id && (
                    <Check
                      size={14}
                      className="swatch-check"
                      strokeWidth={3}
                      style={{ color: col.hex === "#ffffff" ? "#000" : "#fff" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 6. NFC Badge */}
          <div className="theme-control-section">
            <div className="theme-toggle-row">
              <div className="theme-toggle-info">
                <span className="theme-toggle-label">NFC Badge</span>
                <span className="theme-toggle-sub">Show NFC Enabled Badge</span>
              </div>
              <button
                type="button"
                className={`theme-switch-btn${showNfcBadge ? " active" : ""}`}
                onClick={() => setShowNfcBadge(!showNfcBadge)}
                aria-label="Toggle showing NFC badge"
              >
                <span className="theme-switch-thumb" />
              </button>
            </div>
          </div>

          {/* 7. Material / Theme Presets */}
          <div className="theme-control-section">
            <h3 className="theme-section-title">7. Material / Theme Presets</h3>
            <div className="theme-pills-row">
              {[
                { id: "metal", label: "Metal" },
                { id: "pvc", label: "PVC" },
                { id: "bamboo", label: "Bamboo" },
                { id: "wood", label: "Wood" },
              ].map((mat) => (
                <button
                  key={mat.id}
                  type="button"
                  className={`theme-pill-btn${material === mat.id ? " active" : ""}`}
                  onClick={() => setMaterial(mat.id)}
                >
                  {mat.label}
                </button>
              ))}
            </div>
          </div>

          {/* 8. Finish / Effect */}
          <div className="theme-control-section">
            <h3 className="theme-section-title">8. Finish / Effect</h3>
            <div className="theme-pills-row">
              {[
                { id: "matte", label: "Matte" },
                { id: "glossy", label: "Glossy" },
                { id: "brushed", label: "Brushed" },
                { id: "shadow", label: "Shadow" },
              ].map((fin) => (
                <button
                  key={fin.id}
                  type="button"
                  className={`theme-pill-btn${finish === fin.id ? " active" : ""}`}
                  onClick={() => setFinish(fin.id)}
                >
                  {fin.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Preview Panel */}
        <div className="theme-preview-panel">
          <div className="theme-preview-header">
            <span className="theme-preview-pulse" />
            <span className="theme-preview-title">LIVE PREVIEW</span>
          </div>

          <div className="theme-card-outer-wrap">
            {/* The 3D Hoverable Card */}
            <div
              ref={cardRef}
              className={`theme-live-card material-${material} finish-${finish}`}
              style={{
                background: getCardBackground(),
                border: getCardBorder(),
                transform: transformStyle,
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Dynamic Glare/Gloss overlay */}
              <div className="card-glare-overlay" style={glareStyle} />

              {/* Procedural Textures based on Material */}
              {material === "wood" && (
                <div className="card-material-wood-grain" />
              )}
              {material === "bamboo" && (
                <div className="card-material-bamboo-grain" />
              )}
              {material === "metal" && finish === "brushed" && (
                <div className="card-material-metal-brushed" />
              )}

              {/* Background patterns */}
              {backgroundPattern === "wave" && (
                <div className="card-bg-pattern-overlay" style={{ color: getTextColorHex() }}>
                  <WavePattern />
                </div>
              )}
              {backgroundPattern === "dots" && (
                <div className="card-bg-pattern-overlay" style={{ color: getTextColorHex() }}>
                  <DotsPattern />
                </div>
              )}
              {backgroundPattern === "lines" && (
                <div className="card-bg-pattern-overlay" style={{ color: getTextColorHex() }}>
                  <LinesPattern />
                </div>
              )}
              {backgroundPattern === "geometric" && (
                <div className="card-bg-pattern-overlay" style={{ color: getTextColorHex() }}>
                  <GeometricPattern />
                </div>
              )}

              {/* Smart Card Chip (Top Left) */}
              {!(showLogo && logoPosition === "top-left") && (
                <div className="card-smart-chip">
                  <div className="chip-lines line-v1" />
                  <div className="chip-lines line-v2" />
                  <div className="chip-lines line-h" />
                </div>
              )}

              {/* Dynamic HappyTap Logo */}
              {showLogo && (
                <div className={`card-corner-logo logo-pos-${logoPosition}`} style={{ color: getTextColorHex() }}>
                  <div className="logo-icon-circle">
                    <Nfc size={14} className="nfc-logo-waves" />
                  </div>
                  <span className="logo-wordmark">HAPPYTAP</span>
                </div>
              )}

              {/* Card User Information */}
              <div className="card-user-info-section" style={{ color: getTextColorHex() }}>
                <h2 className="card-preview-name">
                  {firstName || "Priya"} {lastName || "Sharma"}
                </h2>
                <p
                  className="card-preview-role"
                  style={{ opacity: textColor === "white" ? 0.7 : 0.8 }}
                >
                  {role ? role.toUpperCase() : "PRODUCT DESIGNER"}
                </p>
              </div>

              {/* Card Footer wordmark (Bottom Right) */}
              {!(showLogo && logoPosition === "bottom-right") && (
                <span
                  className="card-footer-wordmark"
                  style={{
                    color: getTextColorHex(),
                    opacity: textColor === "white" ? 0.35 : 0.45,
                  }}
                >
                  HAPPYTAP
                </span>
              )}
            </div>

            {/* Selection Badges/Chips */}
            <div className="theme-preview-badges-row">
              <div className="theme-badge-pill material-badge">
                <span className="badge-cube-icon" />
                {material.charAt(0).toUpperCase() + material.slice(1)}
              </div>
              <div className="theme-badge-pill border-badge">
                <span className="badge-dot-icon" />
                {finish.charAt(0).toUpperCase() + finish.slice(1)}
              </div>
              {showNfcBadge && (
                <div className="theme-badge-pill border-badge">
                  <Nfc size={12} className="badge-nfc-icon" />
                  NFC Enabled
                </div>
              )}
            </div>

            <p className="theme-interaction-hint">Hover over the card to see the 3D effect ✨</p>
            <p className="theme-final-notice">Your card will look exactly like this</p>
          </div>
        </div>
      </div>
    );
  }
);

ThemeCustomizer.displayName = "ThemeCustomizer";
