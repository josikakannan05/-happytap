"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  Mail,
  Globe,
  MapPin,
  MessageSquare,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  UserPlus,
  Wifi,
  ArrowRight,
  Briefcase,
  Share2,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const DEFAULT: Record<string, string> = {
  fullName: "John Doe",
  designation: "Lead Designer",
  companyName: "HappyTap",
  companyDescription: "Digital designer and entrepreneur passionate about creating meaningful connections.",
  avatarSrc: "",
  coverSrc: "",
  mobileNumber: "+91 98765 43210",
  emailAddress: "john.doe@happytap.com",
  whatsAppNumber: "+91 98765 43210",
  website: "https://happytap.com",
  portfolio: "https://portfolio.johndoe.com",
  linkedin: "https://linkedin.com/in/johndoe",
  instagram: "https://instagram.com/johndoe",
  facebook: "https://facebook.com/johndoe",
  twitter: "https://x.com/johndoe",
  youtube: "https://youtube.com/johndoe",
  businessAddress: "123 Innovation Way, Tech Park, Bangalore, India",
  googleMapsLocation: "https://maps.google.com/?q=12.9716,77.5946",
  profileUrl: "happytap.com/u/johndoe",
  selectedTheme: "purple",
};

const THEME_GRADIENT: Record<string, string> = {
  purple:   "linear-gradient(135deg, #7c5dfa 0%, #5b45e8 100%)",
  lavender: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
  midnight: "linear-gradient(135deg, #0f172a 0%, #334155 100%)",
  emerald:  "linear-gradient(135deg, #10b981 0%, #059669 100%)",
};

const initials = (name: string) => {
  if (!name) return "JD";
  const p = name.trim().split(/\s+/);
  return p.length >= 2 ? (p[0][0] + p[1][0]).toUpperCase() : p[0].slice(0, 2).toUpperCase();
};

export default function PreviewProfilePage() {
  const [p, setP] = useState(DEFAULT);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("happytap_user_profile");
      if (stored) setP((prev) => ({ ...prev, ...JSON.parse(stored) }));
    } catch (_) {}
  }, []);

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: p.fullName, url: window.location.href });
      else { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2500); }
    } catch (_) {}
  };

  const cover = THEME_GRADIENT[p.selectedTheme] ?? THEME_GRADIENT.purple;

  if (!mounted) return (
    <div className="pvp2-loading">
      <span /><span /><span />
    </div>
  );

  return (
    <div className="pvp2-page">

      {/* ── NAV ── */}
      <nav className="pvp2-nav">
        <button className="pvp2-nav-back" onClick={() => window.history.back()}>
          <ArrowLeft size={15} /> Back
        </button>
        <div className="pvp2-nav-center">
          <Sparkles size={14} /> Profile Preview
        </div>
        <button className="pvp2-nav-share" onClick={share}>
          {copied ? <CheckCircle2 size={14} /> : <Share2 size={14} />}
          {copied ? "Copied!" : "Share"}
        </button>
      </nav>

      {/* ── HERO ── */}
      <div className="pvp2-hero">
        <div className="pvp2-live-badge"><span className="pvp2-pulse" />Live Preview</div>
        <h1 className="pvp2-hero-h1">Your Digital Profile — <span>Ready to Impress</span></h1>
        <p className="pvp2-hero-p">This is exactly how visitors see your profile when they tap your HappyTap card.</p>
      </div>

      {/* ── TWO COLUMNS ── */}
      <div className="pvp2-grid">

        {/* ════ LEFT — Desktop Profile Card ════ */}
        <div className="pvp2-profile-card">

          {/* Cover banner */}
          <div className="pvp2-cover" style={{
            background: p.coverSrc ? undefined : cover,
            backgroundImage: p.coverSrc ? `url(${p.coverSrc})` : undefined,
            backgroundSize: "cover", backgroundPosition: "center"
          }}>
            <div className="pvp2-cover-orb pvp2-cover-orb-1" />
            <div className="pvp2-cover-orb pvp2-cover-orb-2" />
          </div>

          {/* Avatar + identity row */}
          <div className="pvp2-header-row">
            <div className="pvp2-avatar">
              {p.avatarSrc
                ? <img src={p.avatarSrc} alt={p.fullName} />
                : <span>{initials(p.fullName)}</span>}
              <span className="pvp2-online" />
            </div>
            <div className="pvp2-identity">
              <h2 className="pvp2-name">{p.fullName || "Your Name"}</h2>
              <p className="pvp2-role">
                {p.designation || "Designation"}
                {p.companyName && <> &nbsp;·&nbsp; <strong>{p.companyName}</strong></>}
              </p>
              {p.profileUrl && (
                <span className="pvp2-url-chip">
                  <Globe size={11} />
                  {String(p.profileUrl).replace(/^https?:\/\//, "")}
                </span>
              )}
            </div>
          </div>

          {/* Bio */}
          {p.companyDescription && (
            <p className="pvp2-bio">{p.companyDescription}</p>
          )}

          {/* Action buttons */}
          <div className="pvp2-actions">
            {p.mobileNumber && (
              <a href={`tel:${p.mobileNumber}`} className="pvp2-action pvp2-act-call">
                <Phone size={15} /> Call
              </a>
            )}
            {p.emailAddress && (
              <a href={`mailto:${p.emailAddress}`} className="pvp2-action pvp2-act-email">
                <Mail size={15} /> Email
              </a>
            )}
            <button className="pvp2-action pvp2-act-save">
              <UserPlus size={15} /> Save Contact
            </button>
          </div>

          {/* Contact details */}
          <div className="pvp2-contacts">
            {p.mobileNumber && (
              <div className="pvp2-contact-row">
                <div className="pvp2-contact-icon"><Phone size={14} /></div>
                <div>
                  <span className="pvp2-contact-lbl">Phone</span>
                  <a href={`tel:${p.mobileNumber}`} className="pvp2-contact-val">{p.mobileNumber}</a>
                </div>
              </div>
            )}
            {p.emailAddress && (
              <div className="pvp2-contact-row">
                <div className="pvp2-contact-icon"><Mail size={14} /></div>
                <div>
                  <span className="pvp2-contact-lbl">Email</span>
                  <a href={`mailto:${p.emailAddress}`} className="pvp2-contact-val">{p.emailAddress}</a>
                </div>
              </div>
            )}
            {p.website && (
              <div className="pvp2-contact-row">
                <div className="pvp2-contact-icon"><Globe size={14} /></div>
                <div>
                  <span className="pvp2-contact-lbl">Website</span>
                  <a href={p.website} target="_blank" rel="noopener noreferrer" className="pvp2-contact-val">
                    {String(p.website).replace(/^https?:\/\//, "")}
                  </a>
                </div>
              </div>
            )}
            {p.businessAddress && (
              <div className="pvp2-contact-row">
                <div className="pvp2-contact-icon"><MapPin size={14} /></div>
                <div>
                  <span className="pvp2-contact-lbl">Location</span>
                  <a href={p.googleMapsLocation || "#"} target="_blank" rel="noopener noreferrer" className="pvp2-contact-val">
                    {p.businessAddress}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Social icons */}
          <div className="pvp2-socials">
            {p.linkedin   && <a href={p.linkedin}   target="_blank" rel="noopener noreferrer" className="pvp2-soc"><Linkedin  size={17}/></a>}
            {p.instagram  && <a href={p.instagram}  target="_blank" rel="noopener noreferrer" className="pvp2-soc"><Instagram size={17}/></a>}
            {p.facebook   && <a href={p.facebook}   target="_blank" rel="noopener noreferrer" className="pvp2-soc"><Facebook  size={17}/></a>}
            {p.twitter    && <a href={p.twitter}    target="_blank" rel="noopener noreferrer" className="pvp2-soc"><Twitter   size={17}/></a>}
            {p.youtube    && <a href={p.youtube}    target="_blank" rel="noopener noreferrer" className="pvp2-soc"><Youtube   size={17}/></a>}
          </div>

          <div className="pvp2-card-brand">Powered by <span>HappyTap</span></div>
        </div>

        {/* ════ RIGHT — Phone Mockup ════ */}
        <div className="pvp2-phone-col">
          <p className="pvp2-mobile-lbl">Mobile View</p>

          <div className="pvp2-phone">
            <div className="pvp2-phone-notch" />
            <div className="pvp2-phone-status">
              <span>9:41</span>
              <div className="pvp2-phone-status-right">
                <Wifi size={10} />
                <div className="pvp2-phone-batt" />
              </div>
            </div>

            <div className="pvp2-phone-scroll">
              {/* Phone cover */}
              <div className="pvp2-ph-cover" style={{
                background: p.coverSrc ? undefined : cover,
                backgroundImage: p.coverSrc ? `url(${p.coverSrc})` : undefined,
                backgroundSize: "cover", backgroundPosition: "center"
              }} />

              {/* Phone avatar */}
              <div className="pvp2-ph-av-wrap">
                <div className="pvp2-ph-av">
                  {p.avatarSrc ? <img src={p.avatarSrc} alt="" /> : <span>{initials(p.fullName)}</span>}
                </div>
              </div>

              {/* Phone identity */}
              <div className="pvp2-ph-identity">
                <div className="pvp2-ph-name">{p.fullName || "Your Name"}</div>
                <div className="pvp2-ph-role">
                  {p.designation || "Designation"}{p.companyName && <> @ {p.companyName}</>}
                </div>
                {p.companyDescription && <div className="pvp2-ph-bio">{p.companyDescription}</div>}
              </div>

              {/* Phone CTA buttons */}
              <div className="pvp2-ph-ctas">
                {p.whatsAppNumber && (
                  <a href={`https://wa.me/${String(p.whatsAppNumber).replace(/[^0-9]/g,"")}`} target="_blank" rel="noopener noreferrer" className="pvp2-ph-cta pvp2-cta-wa">
                    <MessageSquare size={12}/> WhatsApp
                  </a>
                )}
                {p.portfolio && (
                  <a href={p.portfolio} target="_blank" rel="noopener noreferrer" className="pvp2-ph-cta pvp2-cta-port">
                    <Briefcase size={12}/> Portfolio
                  </a>
                )}
                {p.website && (
                  <a href={p.website} target="_blank" rel="noopener noreferrer" className="pvp2-ph-cta pvp2-cta-web">
                    <Globe size={12}/> Website
                  </a>
                )}
              </div>

              {/* Address */}
              {p.businessAddress && (
                <a href={p.googleMapsLocation || "#"} target="_blank" rel="noopener noreferrer" className="pvp2-ph-addr">
                  <MapPin size={12} style={{color:"#7c5dfa",flexShrink:0}}/>
                  <span>{p.businessAddress}</span>
                  <ArrowRight size={10} style={{color:"#94a3b8",flexShrink:0}}/>
                </a>
              )}

              {/* Social icons */}
              <div className="pvp2-ph-socials">
                {p.linkedin   && <a href={p.linkedin}   target="_blank" rel="noopener noreferrer" className="pvp2-ph-soc"><Linkedin  size={14}/></a>}
                {p.instagram  && <a href={p.instagram}  target="_blank" rel="noopener noreferrer" className="pvp2-ph-soc"><Instagram size={14}/></a>}
                {p.facebook   && <a href={p.facebook}   target="_blank" rel="noopener noreferrer" className="pvp2-ph-soc"><Facebook  size={14}/></a>}
                {p.twitter    && <a href={p.twitter}    target="_blank" rel="noopener noreferrer" className="pvp2-ph-soc"><Twitter   size={14}/></a>}
                {p.youtube    && <a href={p.youtube}    target="_blank" rel="noopener noreferrer" className="pvp2-ph-soc"><Youtube   size={14}/></a>}
              </div>

              <div className="pvp2-ph-brand">Powered by <span>HappyTap</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="pvp2-cta-bar">
        <div className="pvp2-cta-inner">
          <div className="pvp2-cta-left">
            <div className="pvp2-cta-icon"><Sparkles size={20}/></div>
            <div>
              <div className="pvp2-cta-title">Love what you see?</div>
              <div className="pvp2-cta-sub">Personalise your profile — name, photo, links, theme — in the Dashboard.</div>
            </div>
          </div>
          <Link href="/dashboard" className="pvp2-cta-btn">
            Continue to Build Profile <ChevronRight size={16}/>
          </Link>
        </div>
      </div>

    </div>
  );
}
