"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Brands } from "@/components/Brands";
import { Problem } from "@/components/Problem";
import { Steps } from "@/components/Steps";
import { Products } from "@/components/Products";
import { Ecosystem } from "@/components/Ecosystem";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";

export default function HomePage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<string | null>(null);

  const openAuth = (tab: "login" | "signup") => {
    setAuthTab(tab);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (name: string) => {
    setUser(name);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <Navbar
        onLoginClick={() => openAuth("login")}
        user={user}
        onLogout={handleLogout}
      />
      <main>
        <Hero onGetCardClick={() => openAuth("signup")} />
        <Brands />
        <Problem />
        <Steps />
        <Products />
        <Ecosystem />
        <CTA onGetCardClick={() => openAuth("signup")} />
      </main>
      <Footer />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialTab={authTab}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}


