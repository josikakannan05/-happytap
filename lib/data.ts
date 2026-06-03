import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Briefcase,
  Building,
  Building2,
  CreditCard,
  Crown,
  FolderOpen,
  Gem,
  Grid3x3,
  Handshake,
  Info,
  Instagram,
  Landmark,
  Layers,
  Lightbulb,
  Linkedin,
  Mail,
  Minimize2,
  Nfc,
  Palette,
  QrCode,
  Rocket,
  Sparkles,
  Target,
  UserCog,
  UserPlus,
  Users,
  UsersRound,
} from "lucide-react";

export const heroStats = [
  { value: "50K+", label: "Active profiles" },
  { value: "1M+", label: "Connections made" },
  { value: "<1s", label: "Tap to share" },
];

export const navLinks = [
  { href: "#products", label: "Products" },
  { href: "#ecosystem", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#cta", label: "Contact" },
];

export const socialLinks = [
  { icon: FolderOpen, title: "Portfolio", subtitle: "View projects" },
  { icon: Linkedin, title: "LinkedIn", subtitle: "Connect" },
  { icon: Instagram, title: "Instagram", subtitle: "Follow" },
  { icon: Mail, title: "Contact", subtitle: "Save instantly" },
];

export const brandItems: { icon: LucideIcon; label: string }[] = [
  { icon: Palette, label: "Creators" },
  { icon: Rocket, label: "Startups" },
  { icon: Lightbulb, label: "Founders" },
  { icon: Building2, label: "Agencies" },
  { icon: UsersRound, label: "Teams" },
  { icon: Landmark, label: "Enterprises" },
];

export const steps = [
  {
    icon: CreditCard,
    number: "STEP 01",
    title: "Choose your card",
    description:
      "Pick from premium NFC card collections crafted for professionals, creators, and modern teams.",
  },
  {
    icon: UserCog,
    number: "STEP 02",
    title: "Create your identity",
    description:
      "Build a living profile with social links, portfolio, contact details, booking, and digital presence.",
  },
  {
    icon: Handshake,
    number: "STEP 03",
    title: "Tap and connect",
    description:
      "Share instantly with one tap. No apps. No friction. Just seamless modern networking.",
  },
];

export const products = [
  {
    icon: Minimize2,
    tag: "Minimal",
    title: "Minimal Series",
    description: "Elegant simplicity for modern professionals.",
    image: "/image/product-minimal.png",
  },
  {
    icon: Gem,
    tag: "Premium",
    title: "Metal Edition",
    description: "Luxury-crafted networking identity.",
    image: "/image/product-metal.png",
  },
  {
    icon: Crown,
    tag: "Executive",
    title: "Executive Collection",
    description: "Premium identity for leadership presence.",
    image: "/image/product-executive.png",
  },
  {
    icon: Users,
    tag: "Teams",
    title: "Team Edition",
    description: "Unified digital identity for organizations.",
    image: "/image/product-team.png",
  },
];

export const ecosystemFeatures = [
  {
    icon: Nfc,
    title: "Instant NFC Connect",
    description: "Share your digital profile instantly with a simple tap experience.",
    image: "/image/feature-nfc.png",
  },
  {
    icon: QrCode,
    title: "Smart QR Sharing",
    description: "Let anyone access your profile instantly through dynamic QR sharing.",
    image: "/image/feature-qr.png",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Track profile views, taps, interactions, and networking performance.",
    image: "/image/feature-analytics.png",
  },
  {
    icon: UserPlus,
    title: "Lead & Contact Capture",
    description: "Convert every interaction into valuable business connections automatically.",
    image: "/image/feature-lead.png",
  },
];

export const footerProductLinks = [
  { icon: CreditCard, href: "#products", label: "Cards" },
  { icon: Users, href: "#", label: "Teams" },
  { icon: Building, href: "#", label: "Enterprise" },
];

export const footerCompanyLinks = [
  { icon: Info, href: "#", label: "About" },
  { icon: Briefcase, href: "#", label: "Careers" },
  { icon: Mail, href: "#cta", label: "Contact" },
];
