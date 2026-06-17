"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Check, Plus, Nfc } from "lucide-react";

/* ─────────────────────────────────────────────────
   Types
   ───────────────────────────────────────────────── */
interface ThemeCustomizerProps {
  firstName: string;
  lastName: string;
  role: string;
  onSaveStatus: (saved: boolean) => void;
}

export interface ThemeCustomizerHandle {
  save: () => void;
}

/* ─────────────────────────────────────────────────
   SVG Background Patterns
   ───────────────────────────────────────────────── */
const WavePattern = () => (
  <svg className="tc-pat-svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" opacity="0.13">
    <path d="M-20,30 C20,10 40,50 80,30 C120,10 140,50 180,30 C220,10 240,50 280,30" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M-20,60 C20,40 40,80 80,60 C120,40 140,80 180,60 C220,40 240,80 280,60" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M-20,90 C20,70 40,110 80,90 C120,70 140,110 180,90" fill="none" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const DotsPattern = () => (
  <svg className="tc-pat-svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="tc-dots" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="8" cy="8" r="1.4" fill="currentColor" opacity="0.18"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#tc-dots)"/>
  </svg>
);

const LinesPattern = () => (
  <svg className="tc-pat-svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="tc-lines" width="16" height="16" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="16" stroke="currentColor" strokeWidth="1.2" opacity="0.15"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#tc-lines)"/>
  </svg>
);

const GeometricPattern = () => (
  <svg className="tc-pat-svg" width="100%" height="100%" viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" opacity="0.1" fill="none" stroke="currentColor">
    <polygon points="30,10 80,60 20,100" strokeWidth="1.5"/>
    <polygon points="220,20 270,70 180,90" strokeWidth="1.5"/>
    <circle cx="150" cy="90" r="50" strokeWidth="1.5"/>
    <line x1="0" y1="0" x2="300" y2="180" strokeWidth="1"/>
    <line x1="300" y1="0" x2="0" y2="180" strokeWidth="1"/>
  </svg>
);

/* ─────────────────────────────────────────────────
   Helper: Toggle Switch
   ───────────────────────────────────────────────── */
function ToggleSwitch({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onToggle}
      style={{
        width: 44,
        height: 24,
        borderRadius: 100,
        background: on ? "#5b45e8" : "#d1d5db",
        border: "none",
        cursor: "pointer",
        position: "relative",
        flexShrink: 0,
        transition: "background 0.22s",
        padding: 0,
      }}
    >
      <span style={{
        position: "absolute",
        top: 3,
        left: on ? 23 : 3,
        width: 18,
        height: 18,
        borderRadius: "50%",
        background: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.22)",
        transition: "left 0.22s",
        display: "block",
      }}/>
    </button>
  );
}

/* ─────────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────────── */
export const ThemeCustomizer = forwardRef<ThemeCustomizerHandle, ThemeCustomizerProps>(
  ({ firstName, lastName, role, onSaveStatus }, ref) => {

    const [cardStyle,          setCardStyle]          = useState("classic");
    const [cardColor,          setCardColor]          = useState("#161618");
    const [backgroundPattern,  setBackgroundPattern]  = useState("none");
    const [showLogo,           setShowLogo]           = useState(true);
    const [logoPosition,       setLogoPosition]       = useState("top-left");
    const [textColor,          setTextColor]          = useState("white");
    const [showNfcBadge,       setShowNfcBadge]       = useState(true);
    const [material,           setMaterial]           = useState("metal");
    const [finish,             setFinish]             = useState("matte");
    const [customColor,        setCustomColor]        = useState("#8a2be2");

    const colorInputRef = useRef<HTMLInputElement>(null);
    const cardRef       = useRef<HTMLDivElement>(null);
    const [tiltStyle,   setTiltStyle]   = useState("");
    const [glare,       setGlare]       = useState<React.CSSProperties>({ opacity: 0 });

    /* Persist / Load */
    useEffect(() => {
      try {
        const raw = localStorage.getItem("happytap_theme_config");
        if (raw) {
          const c = JSON.parse(raw);
          if (c.cardStyle)         setCardStyle(c.cardStyle);
          if (c.cardColor)         setCardColor(c.cardColor);
          if (c.backgroundPattern) setBackgroundPattern(c.backgroundPattern);
          if (c.showLogo           != null) setShowLogo(c.showLogo);
          if (c.logoPosition)      setLogoPosition(c.logoPosition);
          if (c.textColor)         setTextColor(c.textColor);
          if (c.showNfcBadge       != null) setShowNfcBadge(c.showNfcBadge);
          if (c.material)          setMaterial(c.material);
          if (c.finish)            setFinish(c.finish);
        }
      } catch {}
    }, []);

    useImperativeHandle(ref, () => ({
      save() {
        const config = { cardStyle, cardColor, backgroundPattern, showLogo, logoPosition, textColor, showNfcBadge, material, finish };
        localStorage.setItem("happytap_theme_config", JSON.stringify(config));
        onSaveStatus(true);
        setTimeout(() => onSaveStatus(false), 3000);
      },
    }));

    /* 3D Tilt */
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const r  = card.getBoundingClientRect();
      const x  = e.clientX - r.left  - r.width  / 2;
      const y  = e.clientY - r.top   - r.height / 2;
      const tx = -(y / (r.height / 2)) * 13;
      const ty =  (x / (r.width  / 2)) * 13;
      setTiltStyle(`perspective(900px) rotateX(${tx}deg) rotateY(${ty}deg) scale3d(1.025,1.025,1.025)`);
      const gx = ((e.clientX - r.left)  / r.width)  * 100;
      const gy = ((e.clientY - r.top)   / r.height) * 100;
      setGlare({
        opacity: finish === "glossy" ? 0.35 : 0.15,
        background: `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,${finish === "glossy" ? 0.6 : 0.28}) 0%, rgba(255,255,255,0) 60%)`,
      });
    };
    const handleMouseLeave = () => {
      setTiltStyle("perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
      setGlare({ opacity: 0 });
    };

    /* Card appearance helpers */
    const getCardBg = () => {
      if (cardStyle === "minimal")  return "#f7f9fa";
      if (cardStyle === "gradient") return `linear-gradient(135deg, ${cardColor} 0%, #3e1b85 100%)`;
      if (cardStyle === "premium")  return "linear-gradient(135deg, #111112 0%, #26262b 50%, #0c0c0e 100%)";
      return cardColor;
    };
    const getCardBorder = () => {
      if (cardStyle === "minimal") return "1px solid rgba(12,12,15,0.08)";
      if (cardStyle === "premium") return "1.5px solid #d4af37";
      return "1px solid rgba(255,255,255,0.06)";
    };
    const txtHex = () => {
      const map: Record<string,string> = { white: "#ffffff", black: "#161618", gray: "#71717a", gold: "#c5a880" };
      return map[textColor] ?? "#ffffff";
    };

    /* Preset colors */
    const presetColors = [
      { hex: "#161618", label: "Black" },
      { hex: "#c5a880", label: "Gold"  },
      { hex: "#2e4374", label: "Navy"  },
      { hex: "#5b45e8", label: "Purple"},
      { hex: "#10b981", label: "Green" },
      { hex: "#ef4444", label: "Red"   },
      { hex: "#ffffff", label: "White" },
    ];
    const presetHexes = presetColors.map(c => c.hex);
    const isCustomColor = !presetHexes.includes(cardColor);

    /* ── Shared style tokens ── */
    const S = {
      wrap: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 0,
        minHeight: 600,
        fontFamily: "inherit",
      } as React.CSSProperties,

      /* Left panel */
      left: {
        padding: "28px 28px 36px",
        borderRight: "1px solid #f0f0f2",
        overflowY: "auto" as const,
        maxHeight: "calc(100vh - 180px)",
      } as React.CSSProperties,

      sectionTitle: {
        fontSize: "0.82rem",
        fontWeight: 600,
        color: "#111",
        margin: "0 0 12px",
        letterSpacing: "0.01em",
      } as React.CSSProperties,

      section: {
        marginBottom: 24,
        paddingBottom: 24,
        borderBottom: "1px solid #f3f3f5",
      } as React.CSSProperties,

      sectionLast: {
        marginBottom: 0,
        paddingBottom: 0,
        borderBottom: "none",
      } as React.CSSProperties,

      /* Card style grid */
      styleGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 10,
      } as React.CSSProperties,

      styleCard: (active: boolean): React.CSSProperties => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        background: "none",
        border: `2px solid ${active ? "#5b45e8" : "transparent"}`,
        borderRadius: 10,
        padding: "8px 6px 6px",
        cursor: "pointer",
        transition: "border-color 0.18s",
      }),

      miniCard: (bg: string, border?: string): React.CSSProperties => ({
        width: "100%",
        aspectRatio: "1.6/1",
        borderRadius: 6,
        background: bg,
        border: border ?? "1px solid rgba(0,0,0,0.06)",
        position: "relative",
        overflow: "hidden",
      }),

      styleLabel: (active: boolean): React.CSSProperties => ({
        fontSize: "0.7rem",
        fontWeight: active ? 600 : 400,
        color: active ? "#5b45e8" : "#6b7280",
      }),

      /* Color swatches */
      swatchRow: {
        display: "flex",
        flexWrap: "wrap" as const,
        gap: 8,
      } as React.CSSProperties,

      swatch: (hex: string, active: boolean): React.CSSProperties => ({
        width: 30,
        height: 30,
        borderRadius: "50%",
        background: hex,
        border: active
          ? `3px solid #5b45e8`
          : hex === "#ffffff"
            ? "1.5px solid #e5e7eb"
            : "2px solid transparent",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        flexShrink: 0,
        transition: "border-color 0.15s, transform 0.15s",
        boxShadow: active ? "0 0 0 2px #fff, 0 0 0 4px #5b45e8" : "none",
      }),

      /* Pattern grid */
      patternGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 8,
      } as React.CSSProperties,

      patternCard: (active: boolean): React.CSSProperties => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        background: "none",
        border: `1.5px solid ${active ? "#5b45e8" : "#e5e7eb"}`,
        borderRadius: 8,
        padding: "6px 4px 5px",
        cursor: "pointer",
        transition: "border-color 0.18s",
      }),

      patternThumb: {
        width: "100%",
        aspectRatio: "1.4/1",
        borderRadius: 4,
        background: "#f5f5f7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative" as const,
        overflow: "hidden",
      } as React.CSSProperties,

      patternLabel: (active: boolean): React.CSSProperties => ({
        fontSize: "0.62rem",
        fontWeight: active ? 600 : 400,
        color: active ? "#5b45e8" : "#6b7280",
      }),

      /* Toggle rows */
      toggleRow: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      } as React.CSSProperties,

      toggleLabel: {
        fontSize: "0.82rem",
        fontWeight: 500,
        color: "#374151",
      } as React.CSSProperties,

      toggleSub: {
        fontSize: "0.72rem",
        color: "#9ca3af",
        marginTop: 1,
      } as React.CSSProperties,

      /* Pills */
      pillsRow: {
        display: "flex",
        flexWrap: "wrap" as const,
        gap: 7,
      } as React.CSSProperties,

      pill: (active: boolean): React.CSSProperties => ({
        background: active ? "#5b45e8" : "#fff",
        color:      active ? "#fff"    : "#374151",
        border:     active ? "1.5px solid #5b45e8" : "1.5px solid #e5e7eb",
        borderRadius: 100,
        padding: "6px 16px",
        fontSize: "0.78rem",
        fontWeight: active ? 600 : 500,
        cursor: "pointer",
        transition: "all 0.18s",
        letterSpacing: "0.01em",
      }),

      /* Right: preview */
      right: {
        padding: "24px 28px",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        background: "#fafafa",
      } as React.CSSProperties,

      liveLabel: {
        display: "flex",
        alignItems: "center",
        gap: 7,
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        color: "#6b7280",
        alignSelf: "flex-start",
        marginBottom: 20,
      } as React.CSSProperties,

      pulse: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "#22c55e",
        boxShadow: "0 0 0 2px rgba(34,197,94,0.25)",
        flexShrink: 0,
      } as React.CSSProperties,

      cardOuter: {
        width: "100%",
        maxWidth: 380,
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        gap: 18,
      } as React.CSSProperties,

      liveCard: (bg: string, border: string, tilt: string): React.CSSProperties => ({
        width: "100%",
        aspectRatio: "1.586/1",
        borderRadius: 18,
        background: bg,
        border: border,
        position: "relative",
        overflow: "hidden",
        cursor: "grab",
        transition: "transform 0.12s ease, box-shadow 0.12s ease",
        transform: tilt || "perspective(900px) rotateX(0deg) rotateY(0deg)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.32), 0 8px 20px rgba(0,0,0,0.18)",
        userSelect: "none",
      }),

      glareOverlay: (g: React.CSSProperties): React.CSSProperties => ({
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        pointerEvents: "none",
        zIndex: 10,
        ...g,
      }),

      chip: {
        position: "absolute" as const,
        top: 22,
        left: 22,
        width: 36,
        height: 28,
        borderRadius: 5,
        background: "linear-gradient(135deg, #e8c96a 0%, #b8960a 100%)",
        border: "1px solid rgba(255,255,255,0.18)",
        overflow: "hidden" as const,
        zIndex: 2,
      } as React.CSSProperties,

      badgeRow: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap" as const,
        justifyContent: "center",
      } as React.CSSProperties,

      badge: (filled: boolean): React.CSSProperties => ({
        display: "flex",
        alignItems: "center",
        gap: 5,
        padding: "6px 14px",
        borderRadius: 100,
        fontSize: "0.75rem",
        fontWeight: 600,
        background: filled ? "#111" : "#fff",
        color:      filled ? "#fff" : "#374151",
        border: filled ? "none" : "1.5px solid #e5e7eb",
        letterSpacing: "0.01em",
      }),

      hint: {
        fontSize: "0.75rem",
        color: "#9ca3af",
        textAlign: "center" as const,
        margin: 0,
      } as React.CSSProperties,

      notice: {
        fontSize: "0.72rem",
        color: "#bbb",
        textAlign: "center" as const,
        margin: 0,
      } as React.CSSProperties,
    };

    const textHex = txtHex();

    return (
      <div style={S.wrap}>

        {/* ═══════════════════════════════════════
            LEFT: Controls
            ═══════════════════════════════════════ */}
        <div style={S.left}>

          {/* 1. Card Style */}
          <div style={S.section}>
            <p style={S.sectionTitle}>1. Card Style</p>
            <div style={S.styleGrid}>
              {[
                { id: "classic",  label: "Classic",  bg: "#161618" },
                { id: "gradient", label: "Gradient", bg: "linear-gradient(135deg,#2e4374 0%,#5b45e8 100%)" },
                { id: "minimal",  label: "Minimal",  bg: "#f7f9fa", border: "1px solid #e5e7eb" },
                { id: "premium",  label: "Premium",  bg: "radial-gradient(circle,#26262b 0%,#0c0c0e 100%)", border: "1px solid #c5a880" },
              ].map(s => (
                <button key={s.id} type="button" style={S.styleCard(cardStyle === s.id)} onClick={() => setCardStyle(s.id)}>
                  <div style={S.miniCard(s.bg, s.border)}>
                    {cardStyle === s.id && (
                      <span style={{ position:"absolute",top:4,right:4,background:"#5b45e8",borderRadius:"50%",width:16,height:16,display:"flex",alignItems:"center",justifyContent:"center" }}>
                        <Check size={9} color="#fff" strokeWidth={3}/>
                      </span>
                    )}
                  </div>
                  <span style={S.styleLabel(cardStyle === s.id)}>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Card Color */}
          <div style={S.section}>
            <p style={S.sectionTitle}>2. Card Color</p>
            <div style={S.swatchRow}>
              {presetColors.map(col => (
                <button key={col.hex} type="button" style={S.swatch(col.hex, cardColor === col.hex)} onClick={() => setCardColor(col.hex)} title={col.label} aria-label={`${col.label} color`}>
                  {cardColor === col.hex && <Check size={13} color={col.hex === "#ffffff" ? "#000" : "#fff"} strokeWidth={3}/>}
                </button>
              ))}
              {/* Custom */}
              <button type="button" style={S.swatch(isCustomColor ? cardColor : "transparent", isCustomColor)} onClick={() => colorInputRef.current?.click()} title="Custom color" aria-label="Custom color">
                {isCustomColor
                  ? <Check size={13} color="#fff" strokeWidth={3}/>
                  : <Plus size={14} color="#9ca3af"/>
                }
                <input ref={colorInputRef} type="color" value={customColor} onChange={e => { setCustomColor(e.target.value); setCardColor(e.target.value); }} style={{ position:"absolute",opacity:0,width:0,height:0,pointerEvents:"none" }}/>
              </button>
            </div>
          </div>

          {/* 3. Background */}
          <div style={S.section}>
            <p style={S.sectionTitle}>3. Background</p>
            <div style={S.patternGrid}>
              {[
                { id: "none",      label: "None"      },
                { id: "wave",      label: "Wave"      },
                { id: "dots",      label: "Dots"      },
                { id: "lines",     label: "Lines"     },
                { id: "geometric", label: "Geometric" },
              ].map(pat => (
                <button key={pat.id} type="button" style={S.patternCard(backgroundPattern === pat.id)} onClick={() => setBackgroundPattern(pat.id)}>
                  <div style={{ ...S.patternThumb, color: "#374151" }}>
                    {pat.id === "none"      && <span style={{ fontSize:18, color:"#d1d5db", lineHeight:1 }}>⊘</span>}
                    {pat.id === "wave"      && <WavePattern/>}
                    {pat.id === "dots"      && <DotsPattern/>}
                    {pat.id === "lines"     && <LinesPattern/>}
                    {pat.id === "geometric" && <GeometricPattern/>}
                  </div>
                  <span style={S.patternLabel(backgroundPattern === pat.id)}>{pat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Logo */}
          <div style={S.section}>
            <div style={{ ...S.toggleRow, marginBottom: 12 }}>
              <div>
                <p style={{ ...S.sectionTitle, margin: 0 }}>4. Logo</p>
                <span style={S.toggleSub}>Show Logo</span>
              </div>
              <ToggleSwitch on={showLogo} onToggle={() => setShowLogo(v => !v)} label="Toggle logo"/>
            </div>
            <span style={{ ...S.toggleSub, display:"block", marginBottom: 8 }}>Logo Position</span>
            <div style={S.pillsRow}>
              {[
                { id: "top-left",     label: "Top Left"     },
                { id: "top-right",    label: "Top Right"    },
                { id: "bottom-left",  label: "Bottom Left"  },
                { id: "bottom-right", label: "Bottom Right" },
              ].map(pos => (
                <button key={pos.id} type="button" style={S.pill(logoPosition === pos.id)} onClick={() => setLogoPosition(pos.id)}>
                  {pos.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Text Color */}
          <div style={S.section}>
            <p style={S.sectionTitle}>5. Text Color</p>
            <div style={S.swatchRow}>
              {[
                { hex: "#ffffff", id: "white", label: "White" },
                { hex: "#161618", id: "black", label: "Black" },
                { hex: "#71717a", id: "gray",  label: "Gray"  },
                { hex: "#c5a880", id: "gold",  label: "Gold"  },
              ].map(col => (
                <button key={col.id} type="button" style={S.swatch(col.hex, textColor === col.id)} onClick={() => setTextColor(col.id)} title={col.label} aria-label={`${col.label} text color`}>
                  {textColor === col.id && <Check size={13} color={col.hex === "#ffffff" ? "#000" : "#fff"} strokeWidth={3}/>}
                </button>
              ))}
            </div>
          </div>

          {/* 6. NFC Badge */}
          <div style={S.section}>
            <div style={S.toggleRow}>
              <div>
                <p style={{ ...S.sectionTitle, margin: 0 }}>6. NFC Badge</p>
                <span style={S.toggleSub}>Show NFC Enabled Badge</span>
              </div>
              <ToggleSwitch on={showNfcBadge} onToggle={() => setShowNfcBadge(v => !v)} label="Toggle NFC badge"/>
            </div>
          </div>

          {/* 7. Material */}
          <div style={S.section}>
            <p style={S.sectionTitle}>7. Material / Theme Presets</p>
            <div style={S.pillsRow}>
              {["Metal","PVC","Bamboo","Wood"].map(m => (
                <button key={m} type="button" style={S.pill(material === m.toLowerCase())} onClick={() => setMaterial(m.toLowerCase())}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* 8. Finish */}
          <div style={S.sectionLast}>
            <p style={S.sectionTitle}>8. Finish / Effect</p>
            <div style={S.pillsRow}>
              {["Matte","Glossy","Brushed","Shadow"].map(f => (
                <button key={f} type="button" style={S.pill(finish === f.toLowerCase())} onClick={() => setFinish(f.toLowerCase())}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            RIGHT: Live Preview
            ═══════════════════════════════════════ */}
        <div style={S.right}>

          {/* LIVE PREVIEW label */}
          <div style={S.liveLabel}>
            <span style={S.pulse}/>
            LIVE PREVIEW
          </div>

          <div style={S.cardOuter}>
            {/* The card */}
            <div
              ref={cardRef}
              style={S.liveCard(getCardBg(), getCardBorder(), tiltStyle)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Glare */}
              <div style={S.glareOverlay(glare)}/>

              {/* Background patterns */}
              {backgroundPattern !== "none" && (
                <div style={{ position:"absolute",inset:0,color:textHex,zIndex:1,pointerEvents:"none" }}>
                  {backgroundPattern === "wave"      && <WavePattern/>}
                  {backgroundPattern === "dots"      && <DotsPattern/>}
                  {backgroundPattern === "lines"     && <LinesPattern/>}
                  {backgroundPattern === "geometric" && <GeometricPattern/>}
                </div>
              )}

              {/* Material textures */}
              {material === "metal" && finish === "brushed" && (
                <div style={{ position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(90deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 4px)",zIndex:1,pointerEvents:"none" }}/>
              )}

              {/* Gold chip — top left */}
              <div style={S.chip}>
                <div style={{ position:"absolute",top:9,left:0,right:0,height:"1px",background:"rgba(0,0,0,0.25)"}}/>
                <div style={{ position:"absolute",top:0,bottom:0,left:12,width:"1px",background:"rgba(0,0,0,0.2)"}}/>
                <div style={{ position:"absolute",top:0,bottom:0,left:22,width:"1px",background:"rgba(0,0,0,0.2)"}}/>
              </div>

              {/* HAPPYTAP wordmark — top right */}
              <div style={{ position:"absolute",top:22,right:22,display:"flex",alignItems:"center",gap:6,zIndex:2 }}>
                <span style={{ fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.14em",color:textHex,opacity:0.9 }}>HAPPYTAP</span>
                {showNfcBadge && (
                  <div style={{ width:28,height:28,borderRadius:"50%",border:`1.5px solid ${textHex}`,display:"flex",alignItems:"center",justifyContent:"center",opacity:0.7 }}>
                    <Nfc size={14} color={textHex}/>
                  </div>
                )}
              </div>

              {/* User info — bottom left */}
              <div style={{ position:"absolute",bottom:22,left:22,zIndex:2 }}>
                <div style={{ fontSize:"1.35rem",fontWeight:800,color:textHex,letterSpacing:"-0.01em",lineHeight:1.15 }}>
                  {firstName || "Priya"} {lastName || "Sharma"}
                </div>
                <div style={{ fontSize:"0.62rem",fontWeight:600,letterSpacing:"0.12em",color:textHex,opacity:0.65,marginTop:4,textTransform:"uppercase" }}>
                  {role ? role.toUpperCase().slice(0,30) : "PRODUCT DESIGNER"}
                </div>
              </div>

              {/* Bottom right wordmark */}
              <div style={{ position:"absolute",bottom:22,right:22,fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.14em",color:textHex,opacity:0.35,zIndex:2 }}>
                HAPPYTAP
              </div>

              {/* Logo (if positioned elsewhere) */}
              {showLogo && logoPosition === "top-left" && (
                <div style={{ position:"absolute",top:18,left:18,display:"flex",alignItems:"center",gap:5,zIndex:3 }}>
                  <Nfc size={13} color={textHex}/>
                  <span style={{ fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.12em",color:textHex }}>HAPPYTAP</span>
                </div>
              )}
            </div>

            {/* Badges row */}
            <div style={S.badgeRow}>
              <div style={S.badge(true)}>
                <span style={{ fontSize:"0.8rem" }}>📦</span>
                {material.charAt(0).toUpperCase() + material.slice(1)}
              </div>
              <div style={S.badge(false)}>
                <span style={{ width:8,height:8,borderRadius:"50%",background:"#374151",display:"inline-block" }}/>
                {finish.charAt(0).toUpperCase() + finish.slice(1)}
              </div>
              {showNfcBadge && (
                <div style={S.badge(false)}>
                  <Nfc size={13} color="#374151"/>
                  NFC Enabled
                </div>
              )}
            </div>

            <p style={S.hint}>Hover over the card to see the 3D effect ✨</p>
            <p style={S.notice}>Your card will look exactly like this</p>
          </div>
        </div>

        {/* Pattern SVG baseline styles */}
        <style>{`
          .tc-pat-svg { position:absolute; inset:0; width:100%; height:100%; }
        `}</style>
      </div>
    );
  }
);

ThemeCustomizer.displayName = "ThemeCustomizer";
