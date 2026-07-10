"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  CheckCircle2,
  Sparkles,
  Star,
} from "lucide-react";

export default function CompanyUserProfilePage() {
  const router = useRouter();
  const params = useParams<{ companyUrl: string }>();
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("happytap_user_profile");
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error loading profile:", e);
    }
  }, []);

  if (loading || !user) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0a0a0f", color: "#fff", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "30px", height: "30px", border: "3px solid rgba(255,255,255,0.1)", borderTopColor: "#6366f1", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <span>Loading profile...</span>
        </div>
      </div>
    );
  }

  const companyUrl = params?.companyUrl || "";
  const companyName = user.companyName || (companyUrl
    ? decodeURIComponent(companyUrl).replace(/-/g, " ")
    : "Acme");

  const initials = `${user.firstName ? user.firstName[0] : ""}${user.lastName ? user.lastName[0] : ""}`.toUpperCase() || "JO";

  // Dynamic values from profile settings
  const mobileNumber = profile?.mobileNumber || "";
  const businessAddress = profile?.businessAddress || "";

  return (
    <div className="company-profile-shell">
      <div className="company-profile-container">
        <header className="company-profile-header">
          <div className="company-profile-badge-row">
            <Link href={`/company/${companyUrl}`} className="company-profile-back">
              <ArrowLeft size={16} /> Back to {companyName}
            </Link>
            <span className="company-profile-pill">
              <Building2 size={14} /> {companyName} team
            </span>
          </div>

          <div className="company-profile-hero-card">
            <div className="company-profile-avatar">{initials}</div>
            <div>
              <div className="company-profile-title-row">
                <h1>{user.firstName} {user.lastName}</h1>
                <span className="company-profile-status active">
                  <CheckCircle2 size={14} /> Active
                </span>
              </div>
              <p className="company-profile-lead">
                {profile?.designation || "Elite team member driving premium experiences for our workspace."}
              </p>

              <div className="company-profile-keyline">
                <span>
                  <Sparkles size={16} /> Team Owner & Workspace Admin
                </span>
                <span>
                  <Star size={16} /> Verified Account
                </span>
              </div>
            </div>
          </div>
        </header>

        <section className="company-dashboard-card company-profile-card premium-card">
          <div className="company-profile-card-head">
            <div>
              <p className="company-dashboard-card-label">Profile</p>
              <h3>Contact details</h3>
            </div>
          </div>
          <div className="company-profile-detail-row">
            <Mail size={18} />
            <div>
              <strong>{user.email}</strong>
              <span>Work email</span>
            </div>
          </div>
          <div className="company-profile-detail-row">
            <Phone size={18} />
            <div>
              <strong>{mobileNumber || "Not provided"}</strong>
              <span>Direct line</span>
            </div>
          </div>
          <div className="company-profile-detail-row">
            <MapPin size={18} />
            <div>
              <strong>{businessAddress || "Not provided"}</strong>
              <span>Office location</span>
            </div>
          </div>
          <div className="company-profile-detail-row">
            <Globe size={18} />
            <div>
              <strong>{companyName.toLowerCase().replace(/\s+/g, "")}.com</strong>
              <span>Company website</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
