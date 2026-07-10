"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import ProfilePage from "@/app/profile/page";

export default function DashboardPage() {
  const router = useRouter();
  const params = useParams();
  const collection = params.collection as string;

  const handleSaveAndPublish = () => {
    // Save profile to localStorage
    try {
      const profileData = {
        fullName: localStorage.getItem("happytap_fullName") || "",
        designation: localStorage.getItem("happytap_designation") || "",
        companyName: localStorage.getItem("happytap_companyName") || "",
        mobileNumber: localStorage.getItem("happytap_mobileNumber") || "",
        emailAddress: localStorage.getItem("happytap_emailAddress") || "",
        companyDescription: localStorage.getItem("happytap_companyDescription") || "",
        businessAddress: localStorage.getItem("happytap_businessAddress") || "",
      };
      localStorage.setItem("happytap_user_profile", JSON.stringify(profileData));
    } catch (err) {
      console.error("Error saving profile:", err);
    }

    // Extract selected card ID from URL or use first available
    const selectedCardId = localStorage.getItem("selected_card_id") || "minimal-midnight";
    router.push(`/cards/${collection}/${selectedCardId}`);
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header-nav">
        <Link href={`/cards/${collection}/preview-card`} className="dashboard-back-link">
          <ArrowLeft size={18} />
          Back
        </Link>
        <h1>Dashboard</h1>
      </div>

      <ProfilePage />

      <div className="dashboard-cta-footer">
        <button className="cta-btn save-btn" onClick={handleSaveAndPublish}>
          <Save size={18} />
          Save & Publish
        </button>
        <button className="cta-btn cancel-btn" onClick={() => router.back()}>
          <Trash2 size={18} />
          Cancel
        </button>
      </div>
    </div>
  );
}
