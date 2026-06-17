"use client";

import { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShieldCheck,
  RefreshCw,
  Truck,
  Award,
  ArrowRight,
  Sparkles,
  Wifi,
  Mail,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Users,
  Zap,
  Code,
  Palette,
  Megaphone,
  BarChart3,
  Headset,
  Shield,
  Briefcase,
  Building2,
  Lock,
  Bell,
  Star,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Layers,
  Settings,
  Scale,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import { Reveal } from "@/components/Reveal";

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  colorName: string;
  category: string;
  cardStyle: {
    background?: string;
    logoStyle: "gold" | "silver" | "white" | "rose";
    isLight?: boolean;
    border?: string;
    sideCoreClass?: string;
  };
  hasExtraLines?: "graphite" | "prestige" | "titanium" | "legacy";
  isTeamLayout?: boolean;
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  cssClass?: string;
}

const collectionsData: Record<string, {
  name: string;
  badge: string;
  slug: string;
  products: Product[];
}> = {
  "minimal-series": {
    name: "Minimal Series",
    badge: "Minimal Series",
    slug: "minimal-series",
    products: [
      {
        id: "minimal-midnight",
        title: "Minimal Midnight",
        category: "Standard",
        price: 799,
        description: "Premium deep charcoal matte finish NFC card featuring elegant reflective silver foil detailing, designed to share contact profiles instantly and leave a lasting impression on business connections.",
        colorName: "Midnight Black",
        cardStyle: {
          background: "linear-gradient(135deg, #0f0f13 0%, #1a1a24 100%)",
          logoStyle: "silver",
          sideCoreClass: "side-core-black",
        },
      },
      {
        id: "minimal-graphite",
        title: "Minimal Graphite",
        category: "Standard",
        price: 899,
        description: "Industrial dark grey brushed card accented with polished silver metallic engraving and NFC chip connectivity, created to deliver your business info seamlessly with one modern contactless tap.",
        colorName: "Graphite Grey",
        cardStyle: {
          background: "linear-gradient(135deg, #2c2d30 0%, #1e1f21 100%)",
          logoStyle: "silver",
          sideCoreClass: "side-core-silver",
        },
      },
      {
        id: "minimal-carbon",
        title: "Minimal Carbon",
        category: "Standard",
        price: 999,
        description: "High-tech raw carbon fiber weaving aesthetic card equipped with integrated NFC sharing, designed specifically for tech entrepreneurs looking to stand out and connect instantly in networking events.",
        colorName: "Carbon Weave",
        cardStyle: {
          background: "linear-gradient(135deg, #151515 0%, #252525 100%)",
          logoStyle: "white",
          sideCoreClass: "side-core-black",
        },
      },
      {
        id: "minimal-titanium",
        title: "Minimal Titanium",
        category: "Premium",
        price: 1199,
        description: "Premium space-grade titanium silver satin card featuring a raw metallic luster and seamless NFC profile sharing, perfect for modern leaders requiring a sophisticated and durable identity card.",
        colorName: "Satin Titanium",
        cardStyle: {
          background: "linear-gradient(135deg, #8e8e93 0%, #d1d1d6 50%, #8e8e93 100%)",
          logoStyle: "white",
          isLight: true,
          sideCoreClass: "side-core-silver",
        },
      },
      {
        id: "minimal-eclipse",
        title: "Minimal Eclipse",
        category: "Premium",
        price: 1299,
        description: "Mystical deep purple twilight gradient card featuring integrated smart NFC sharing, designed for creative leaders who want to share their portfolio and socials with a clean tap.",
        colorName: "Eclipse Purple",
        cardStyle: {
          background: "linear-gradient(135deg, #1d0f39 0%, #0d061a 100%)",
          logoStyle: "rose",
          sideCoreClass: "side-core-purple",
        },
      },
      {
        id: "minimal-aurora",
        title: "Minimal Aurora",
        category: "Premium",
        price: 1299,
        description: "Vibrant iridescent green and blue aurora color gradient card featuring advanced NFC connectivity, crafted to make your profile pop and share contact details instantly during business meetings.",
        colorName: "Aurora Green/Blue",
        cardStyle: {
          background: "linear-gradient(135deg, #0575e6 0%, #00f260 100%)",
          logoStyle: "white",
          sideCoreClass: "side-core-green",
        },
      },
      {
        id: "minimal-rose-gold",
        title: "Minimal Rose Gold",
        category: "Luxury",
        price: 1499,
        description: "Elegant warm pink-gold satin finish card showcasing reflective copper-rose highlights and integrated NFC chip, perfect for professionals who want a sophisticated and stylish digital handshake card.",
        colorName: "Rose Gold",
        cardStyle: {
          background: "linear-gradient(135deg, #e5b2a5 0%, #f7dcd5 50%, #d89687 100%)",
          logoStyle: "rose",
          isLight: true,
          sideCoreClass: "side-core-copper",
        },
      },
      {
        id: "minimal-platinum",
        title: "Minimal Platinum",
        category: "Luxury",
        price: 1699,
        description: "Radiant high-polished platinum silver card accented with a chrome logo emblem and built-in NFC chip, crafted for visionaries seeking a refined minimalist appearance to connect instantly.",
        colorName: "Platinum Chrome",
        cardStyle: {
          background: "linear-gradient(135deg, #e5e5e9 0%, #ffffff 50%, #d1d1d6 100%)",
          logoStyle: "silver",
          isLight: true,
          sideCoreClass: "side-core-silver",
        },
      },
      {
        id: "minimal-executive",
        title: "Minimal Executive",
        category: "Luxury",
        price: 1999,
        description: "Deep navy blue executive card highlighted by a 24k polished gold logo accent and smart NFC technology, tailored specifically for leadership presence and seamless boardroom networking interactions.",
        colorName: "Executive Navy & Gold",
        cardStyle: {
          background: "linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%)",
          logoStyle: "gold",
          sideCoreClass: "side-core-gold",
        },
      },
      {
        id: "minimal-signature",
        title: "Minimal Signature",
        category: "Signature",
        price: 2499,
        description: "Premium matte obsidian card styled with double gold trim borders, signature monogram, and advanced NFC sharing capabilities, ideal for executives who prioritize legacy identity and modern convenience.",
        colorName: "Velvet Obsidian & Gold",
        cardStyle: {
          background: "linear-gradient(135deg, #141414 0%, #2a2a2a 100%)",
          logoStyle: "gold",
          border: "1px solid #ffd700",
          sideCoreClass: "side-core-gold",
        },
      },
      {
        id: "minimal-forest",
        title: "Minimal Forest",
        category: "Standard",
        price: 899,
        description: "Sleek deep forest green matte shell card featuring a clean minimalist layout and integrated NFC profile sharing, designed for eco-conscious professionals seeking to update their networking tool.",
        colorName: "Forest Green",
        cardStyle: {
          background: "linear-gradient(135deg, #13221b 0%, #08120d 100%)",
          logoStyle: "silver",
          sideCoreClass: "side-core-green",
        },
      },
      {
        id: "minimal-horizon",
        title: "Minimal Horizon",
        category: "Premium",
        price: 1299,
        description: "Sleek dark twilight sunset gradient card featuring high-performance NFC chip technology, designed to share digital business profiles instantly and match creative styles with an elegant design layout.",
        colorName: "Horizon Sunset",
        cardStyle: {
          background: "linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)",
          logoStyle: "white",
          sideCoreClass: "side-core-purple",
        },
      },
    ]
  },
  "metal-edition": {
    name: "Metal Edition",
    badge: "Metal Edition",
    slug: "metal-edition",
    products: [
      {
        id: "metal-bronze",
        title: "Metal Bronze",
        category: "Standard",
        price: 1999,
        description: "Raw brushed bronze metal card featuring warm rustic copper undertones, built-in NFC chip, and a heavy weight designed to establish premium authority when exchanging professional business contacts.",
        colorName: "Bronze Finish",
        cardStyle: {
          background: "linear-gradient(135deg, #a76b43 0%, #834f2b 100%)",
          logoStyle: "gold",
          sideCoreClass: "side-core-bronze",
        },
      },
      {
        id: "metal-copper",
        title: "Metal Copper",
        category: "Standard",
        price: 2199,
        description: "Satin metallic copper metal card emitting a brilliant rose-amber luxury glow, featuring NFC profile sharing and durable metal construction for modern professionals seeking a memorable first impression.",
        colorName: "Copper Glow",
        cardStyle: {
          background: "linear-gradient(135deg, #c5796d 0%, #eebd89 100%)",
          logoStyle: "rose",
          sideCoreClass: "side-core-copper",
        },
      },
      {
        id: "metal-titanium",
        title: "Metal Titanium",
        category: "Premium",
        price: 2499,
        description: "Space-grade brushed titanium silver metal card displaying a sleek industrial design and NFC sharing capabilities, created for innovators and leaders requiring a solid and modern digital presence.",
        colorName: "Titanium Silver",
        cardStyle: {
          background: "linear-gradient(135deg, #8e8e93 0%, #c7c7cc 50%, #8e8e93 100%)",
          logoStyle: "silver",
          isLight: true,
          sideCoreClass: "side-core-silver",
        },
      },
      {
        id: "metal-graphite",
        title: "Metal Graphite",
        category: "Premium",
        price: 2699,
        description: "Deep gunmetal charcoal brushed metal card featuring subtle laser engravings and advanced NFC connectivity, crafted to share corporate info instantly while maintaining an elite industrial aesthetic design.",
        colorName: "Graphite Charcoal",
        cardStyle: {
          background: "linear-gradient(135deg, #2a2a2e 0%, #151517 100%)",
          logoStyle: "silver",
          sideCoreClass: "side-core-silver",
        },
      },
      {
        id: "metal-rose-gold",
        title: "Metal Rose Gold",
        category: "Premium",
        price: 2999,
        description: "Luxurious brushed rose-gold plated metal card reflecting a warm satin luster, equipped with NFC sharing for instant networking, designed for business leaders seeking elegant modern professionalism.",
        colorName: "Rose Gold",
        cardStyle: {
          background: "linear-gradient(135deg, #d49a89 0%, #f3d4cc 50%, #b87b6a 100%)",
          logoStyle: "rose",
          isLight: true,
          sideCoreClass: "side-core-copper",
        },
      },
      {
        id: "metal-silver",
        title: "Metal Silver",
        category: "Luxury",
        price: 3299,
        description: "Brilliant brushed silver metal card showcasing high-reflectivity chrome highlights and built-in NFC chip, crafted to share digital profiles instantly with a refined, highly-polished premium metallic appearance.",
        colorName: "Sliver Chrome",
        cardStyle: {
          background: "linear-gradient(135deg, #d1d1d6 0%, #f2f2f7 50%, #c7c7cc 100%)",
          logoStyle: "silver",
          isLight: true,
          sideCoreClass: "side-core-silver",
        },
      },
      {
        id: "metal-platinum",
        title: "Metal Platinum",
        category: "Luxury",
        price: 3499,
        description: "Deep luster platinum chrome metal card reflecting high wealth, prestige, and advanced NFC technology, perfect for elite executives seeking to replace traditional paper cards with luxury modern tools.",
        colorName: "Platinum Mirror",
        cardStyle: {
          background: "linear-gradient(135deg, #e5e5ea 0%, #ffffff 50%, #aeaeB2 100%)",
          logoStyle: "white",
          isLight: true,
          sideCoreClass: "side-core-silver",
        },
      },
      {
        id: "metal-executive",
        title: "Metal Executive",
        category: "Luxury",
        price: 3999,
        description: "Premium midnight black metal card trimmed with polished 24k gold borders and integrated NFC chip, designed to make a commanding statement and share corporate identities in executive suites.",
        colorName: "Obsidian Gold Trim",
        cardStyle: {
          background: "linear-gradient(135deg, #121212 0%, #222222 100%)",
          logoStyle: "gold",
          border: "1px solid #ffd700",
          sideCoreClass: "side-core-gold",
        },
      },
      {
        id: "metal-signature",
        title: "Metal Signature",
        category: "Signature",
        price: 4499,
        description: "Mirror-finish gold plated metal card featuring an exclusive signature initials engraving and built-in NFC sharing, providing the absolute gold standard in luxury networking tools for business visionaries.",
        colorName: "24K Gold Plated",
        cardStyle: {
          background: "linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%)",
          logoStyle: "gold",
          isLight: true,
          sideCoreClass: "side-core-gold",
        },
      },
      {
        id: "metal-black-luxury",
        title: "Metal Black Luxury",
        category: "Signature",
        price: 4999,
        description: "Deep obsidian matte black metal card showcasing double-anodized laser engraving and smart NFC sharing, designed to deliver high-impact professional impressions with a stealth, premium metallic design layout.",
        colorName: "Matte Black",
        cardStyle: {
          background: "linear-gradient(135deg, #050505 0%, #1a1a1a 100%)",
          logoStyle: "white",
          sideCoreClass: "side-core-black",
        },
      },
      {
        id: "metal-brass",
        title: "Metal Brass",
        category: "Standard",
        price: 2099,
        description: "Brushed brass yellow metal card representing classic longevity, featuring built-in NFC connectivity and a durable layout, designed to share digital profiles with a traditional yet modern touch.",
        colorName: "Brushed Brass",
        cardStyle: {
          background: "linear-gradient(135deg, #b58d3d 0%, #e5c060 50%, #a0782a 100%)",
          logoStyle: "gold",
          isLight: true,
          sideCoreClass: "side-core-gold",
        },
      },
      {
        id: "metal-obsidian",
        title: "Metal Obsidian",
        category: "Signature",
        price: 4799,
        description: "Mirror polished high-gloss obsidian black metal card styled with a gold monogram border and integrated NFC technology, crafted for signature identity and high-impact digital networking connections.",
        colorName: "Obsidian Mirror",
        cardStyle: {
          background: "linear-gradient(135deg, #101010 0%, #000000 100%)",
          logoStyle: "gold",
          border: "1px solid rgba(255, 215, 0, 0.3)",
          sideCoreClass: "side-core-gold",
        },
      },
    ]
  },
  "executive-collection": {
    name: "Executive Collection",
    badge: "Executive Collection",
    slug: "executive-collection",
    products: [
      {
        id: "executive-classic",
        title: "Executive Classic",
        category: "Standard",
        price: 3999,
        description: "Midnight black executive card decorated with a premium radial gold wave pattern and built-in NFC chip, providing a classic, highly professional tool to exchange business profiles instantly.",
        colorName: "Gold Wave Accent",
        cssClass: "ec-card-classic",
        cardStyle: {
          background: "radial-gradient(circle at 100% 100%, rgba(212, 175, 55, 0.25) 0%, transparent 60%), #141417",
          logoStyle: "gold",
          sideCoreClass: "side-core-gold",
        },
      },
      {
        id: "executive-graphite",
        title: "Executive Graphite",
        category: "Standard",
        price: 4499,
        description: "Geometric matte textured executive card built on a deep charcoal background with NFC technology, crafted to offer a highly structured, modern aesthetic for contemporary corporate leadership profiles.",
        colorName: "Graphite Charcoal",
        cssClass: "ec-card-graphite",
        cardStyle: {
          background: "linear-gradient(155deg, rgba(255,255,255,0.03) 0%, transparent 50%), linear-gradient(35deg, rgba(0,0,0,0.2) 0%, transparent 50%), #252528",
          logoStyle: "silver",
          sideCoreClass: "side-core-silver",
        },
        hasExtraLines: "graphite",
      },
      {
        id: "executive-rose-gold",
        title: "Executive Rose Gold",
        category: "Premium",
        price: 4999,
        description: "Brushed metal finish executive card reflecting a warm rose-gold metallic luster and equipped with NFC connectivity, designed for leaders who want to share contact portfolios with premium warmth.",
        colorName: "Rose Gold Finish",
        cssClass: "ec-card-rosegold",
        cardStyle: {
          background: "linear-gradient(135deg, #d49a89 0%, #f3d4cc 50%, #b87b6a 100%)",
          logoStyle: "rose",
          isLight: true,
          sideCoreClass: "side-core-copper",
        },
      },
      {
        id: "executive-prestige",
        title: "Executive Prestige",
        category: "Premium",
        price: 5499,
        description: "Elegant diamond quilt pattern executive card engraved into a premium matte body with built-in NFC, offering a tactile feel and modern sharing experience for highly distinguished professionals.",
        colorName: "Midnight Prestige",
        cssClass: "ec-card-prestige",
        cardStyle: {
          background: "#111113",
          logoStyle: "gold",
          sideCoreClass: "side-core-gold",
        },
        hasExtraLines: "prestige",
      },
      {
        id: "executive-titanium",
        title: "Executive Titanium",
        category: "Luxury",
        price: 5999,
        description: "Modern hexagon textured executive card finished with a satin titanium silver coat and advanced NFC sharing, designed specifically to deliver technical and creative corporate profiles with a tap.",
        colorName: "Titanium Hexagon",
        cssClass: "ec-card-titanium",
        cardStyle: {
          background: "linear-gradient(135deg, #7e7e82 0%, #b0b0b8 50%, #68686c 100%)",
          logoStyle: "silver",
          isLight: true,
          sideCoreClass: "side-core-silver",
        },
        hasExtraLines: "titanium",
      },
      {
        id: "executive-elite",
        title: "Executive Elite",
        category: "Luxury",
        price: 6999,
        description: "Elite deep charcoal executive card detailed with stunning diagonal gold lines and NFC sharing, designed to present a sleek and powerful modern identity for high-profile business networking events.",
        colorName: "Elite Diagonal Gold",
        cssClass: "ec-card-elite",
        cardStyle: {
          background: "#151518",
          logoStyle: "gold",
          sideCoreClass: "side-core-gold",
        },
      },
      {
        id: "executive-chairman",
        title: "Executive Chairman",
        category: "Executive",
        price: 7499,
        description: "Exquisite mahogany wood veneer executive card combined with a sleek rose-gold accent and built-in NFC, designed for chairmen and executive directors seeking to project natural leadership authority.",
        colorName: "Mahogany & Gold",
        cssClass: "ec-card-chairman",
        cardStyle: {
          background: "linear-gradient(to right, #4a2f22 55%, #c88775 55%)",
          logoStyle: "gold",
          isLight: true,
          sideCoreClass: "side-core-copper",
        },
      },
      {
        id: "executive-black-label",
        title: "Executive Black Label",
        category: "Executive",
        price: 7999,
        description: "Deep obsidian matte executive card featuring horizontal micro-textures and integrated NFC sharing, created for elite board members who require a silent, powerful, and absolutely premium calling card.",
        colorName: "Obsidian Black",
        cssClass: "ec-card-blacklabel",
        cardStyle: {
          background: "#0d0d0f",
          logoStyle: "white",
          sideCoreClass: "side-core-black",
        },
      },
      {
        id: "executive-signature",
        title: "Executive Signature",
        category: "Signature",
        price: 8999,
        description: "Minimalist executive card defined by double 24k polished gold borders and smart NFC technology, created to offer a clean, premium signature identity that shares corporate credentials with one tap.",
        colorName: "Double Gold Border",
        cssClass: "ec-card-signature",
        cardStyle: {
          background: "#0d0d0e",
          logoStyle: "gold",
          sideCoreClass: "side-core-gold",
        },
      },
      {
        id: "executive-legacy",
        title: "Executive Legacy",
        category: "Signature",
        price: 9999,
        description: "Flagship royal emblem and crest executive card featuring heritage aesthetics and advanced NFC connectivity, perfect for legacy business leaders who want to combine traditional prestige with digital sharing.",
        colorName: "Royal Emblem",
        cssClass: "ec-card-legacy",
        cardStyle: {
          background: "#111113",
          logoStyle: "gold",
          sideCoreClass: "side-core-gold",
        },
        hasExtraLines: "legacy",
      },
      {
        id: "executive-royal",
        title: "Executive Royal",
        category: "Premium",
        price: 5299,
        description: "Royal blue leatherette textured executive card styled with a luxury gold monogram and NFC connectivity, designed for top executives seeking to make a bold, colorful, and commanding presentation.",
        colorName: "Royal Blue & Gold",
        cssClass: "ec-card-royal",
        cardStyle: {
          background: "radial-gradient(circle at 100% 0%, rgba(212, 175, 55, 0.2) 0%, transparent 60%), #0d1e3d",
          logoStyle: "gold",
          sideCoreClass: "side-core-gold",
        },
      },
      {
        id: "executive-monarch",
        title: "Executive Monarch",
        category: "Signature",
        price: 9499,
        description: "Imperial purple matte executive card accented by gold curves and integrated NFC technology, crafted for legacy leaders and high-level corporate directors seeking to establish instant prestigious connections.",
        colorName: "Imperial Purple & Gold",
        cssClass: "ec-card-monarch",
        cardStyle: {
          background: "linear-gradient(135deg, #1f0f2b 0%, #3d1b54 100%)",
          logoStyle: "gold",
          sideCoreClass: "side-core-gold",
        },
      },
    ]
  },
  "team-edition": {
    name: "Team Edition",
    badge: "Team Edition",
    slug: "team-edition",
    products: [
      {
        id: "team-basic",
        title: "Team Basic",
        category: "Team Edition",
        price: 1499,
        description: "Black and gold team card designed for small business setups, featuring NFC connectivity and dashboard integration to manage and update employee profiles easily from a centralized administration panel.",
        colorName: "Black & Gold",
        cssClass: "te-card-basic",
        icon: Users,
        cardStyle: {
          logoStyle: "gold",
          sideCoreClass: "side-core-gold",
        },
        isTeamLayout: true,
      },
      {
        id: "team-pro",
        title: "Team Pro",
        category: "Premium",
        price: 1999,
        description: "Deep blue premium team card crafted for high-performance corporate teams, featuring built-in NFC sharing and bulk management capabilities to maintain a consistent digital brand presence across departments.",
        colorName: "Deep Blue Premium",
        cssClass: "te-card-pro",
        icon: Zap,
        cardStyle: {
          logoStyle: "silver",
          sideCoreClass: "side-core-silver",
        },
        isTeamLayout: true,
      },
      {
        id: "developers-pack",
        title: "Developers Pack",
        category: "Role Based",
        price: 2499,
        description: "Dark graphite team card featuring a custom integrated code developer icon and NFC chip, perfect for engineering teams who want to share portfolios and professional socials instantly.",
        colorName: "Dark Graphite",
        cssClass: "te-card-dev",
        icon: Code,
        cardStyle: {
          logoStyle: "silver",
          sideCoreClass: "side-core-silver",
        },
        isTeamLayout: true,
      },
      {
        id: "design-team",
        title: "Design Team",
        category: "Department",
        price: 2499,
        description: "Vibrant emerald green team card created for design agencies, utilizing advanced NFC sharing and customizable layouts to display team creativity and connect with clients during initial meetings.",
        colorName: "Emerald Creative",
        cssClass: "te-card-design",
        icon: Palette,
        cardStyle: {
          logoStyle: "silver",
          sideCoreClass: "side-core-green",
        },
        isTeamLayout: true,
      },
      {
        id: "marketing-team",
        title: "Marketing Team",
        category: "Department",
        price: 2999,
        description: "Purple branding team card designed for marketing departments, featuring built-in NFC profile sharing to let PR and advertising professionals exchange social channels and campaign portfolios instantly.",
        colorName: "Purple Branding",
        cssClass: "te-card-marketing",
        icon: Megaphone,
        cardStyle: {
          logoStyle: "silver",
          sideCoreClass: "side-core-purple",
        },
        isTeamLayout: true,
      },
      {
        id: "sales-team",
        title: "Sales Team",
        category: "Role Based",
        price: 2999,
        description: "Metallic copper team card customized with a growth chart icon and built-in NFC chip, crafted for sales agents to capture leads and share company brochures with a tap.",
        colorName: "Copper Finish",
        cssClass: "te-card-sales",
        icon: BarChart3,
        cardStyle: {
          logoStyle: "silver",
          sideCoreClass: "side-core-copper",
        },
        isTeamLayout: true,
      },
      {
        id: "support-team",
        title: "Support Team",
        category: "Department",
        price: 2499,
        description: "Navy support team card custom-engraved with a dedicated headset symbol and NFC technology, designed for customer success divisions to share support hotlines and contact coordinates instantly with clients.",
        colorName: "Navy Support",
        cssClass: "te-card-support",
        icon: Headset,
        cardStyle: {
          logoStyle: "silver",
          sideCoreClass: "side-core-silver",
        },
        isTeamLayout: true,
      },
      {
        id: "hr-team",
        title: "HR Team",
        category: "Premium",
        price: 2499,
        description: "Gold-plated pattern team card featuring a security shield icon and NFC sharing, tailored for human resource professionals to share corporate portal links and recruit talent during hiring campaigns.",
        colorName: "Gold Premium HR",
        cssClass: "te-card-hr",
        icon: Shield,
        cardStyle: {
          logoStyle: "gold",
          isLight: true,
          sideCoreClass: "side-core-gold",
        },
        isTeamLayout: true,
      },
      {
        id: "finance-team",
        title: "Finance Team",
        category: "Department",
        price: 2999,
        description: "Dark blue corporate team card customized with an asset briefcase icon and NFC chip, designed for finance departments and corporate accountants to exchange secure contact coordinates with client partners.",
        colorName: "Dark Corporate",
        cssClass: "te-card-finance",
        icon: Briefcase,
        cardStyle: {
          logoStyle: "silver",
          sideCoreClass: "side-core-silver",
        },
        isTeamLayout: true,
      },
      {
        id: "enterprise-team",
        title: "Enterprise Team",
        category: "Enterprise",
        price: 3499,
        description: "Gunmetal grey enterprise team card crafted for large-scale organizations, featuring advanced NFC chip sharing and full enterprise dashboard integration to manage company-wide digital business card deployments smoothly.",
        colorName: "Gunmetal Enterprise",
        cssClass: "te-card-enterprise",
        icon: Building2,
        cardStyle: {
          logoStyle: "silver",
          sideCoreClass: "side-core-silver",
        },
        isTeamLayout: true,
      },
      {
        id: "operations-team",
        title: "Operations Team",
        category: "Department",
        price: 2799,
        description: "Teal operations team card custom-engraved with a modern gears icon and NFC connectivity, engineered for operations managers and logistics leads to share scheduling and contact profiles instantly.",
        colorName: "Teal Operations",
        cssClass: "te-card-ops",
        icon: Settings,
        cardStyle: {
          logoStyle: "silver",
          sideCoreClass: "side-core-green",
        },
        isTeamLayout: true,
      },
      {
        id: "legal-team",
        title: "Legal Team",
        category: "Department",
        price: 2999,
        description: "Burgundy legal team card customized with a traditional scales of justice icon and NFC chip, built for corporate counsels and legal compliance divisions to share secure networking credentials.",
        colorName: "Burgundy Legal",
        cssClass: "te-card-legal",
        icon: Scale,
        cardStyle: {
          logoStyle: "silver",
          sideCoreClass: "side-core-copper",
        },
        isTeamLayout: true,
      },
    ]
  }
};

export default function ProductDetailPage({ params }: { params: Promise<{ collection: string; product: string }> }) {
  const resolvedParams = use(params);
  const { collection, product } = resolvedParams;

  const currentCollection = collectionsData[collection];
  const activeProduct = currentCollection?.products.find((p) => p.id === product);

  const [activeView, setActiveView] = useState<"front" | "back" | "side">("front");
  const [quantity, setQuantity] = useState(1);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<string | null>(null);

  // If page doesn't match a collection or product, render a simple error view
  if (!currentCollection || !activeProduct) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "120px 20px", textAlign: "center", minHeight: "60vh" }}>
          <h2>Product Not Found</h2>
          <p style={{ color: "#86868b", marginTop: "10px" }}>The requested card product page could not be located.</p>
          <Link href="/cards" className="te-solid-purple-btn" style={{ marginTop: "24px" }}>
            Browse All Cards
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const relatedProducts = currentCollection.products
    .filter((p) => p.id !== activeProduct.id)
    .slice(0, 5);

  const handleQtyChange = (type: "inc" | "dec") => {
    setQuantity((q) => {
      if (type === "dec") return q > 1 ? q - 1 : 1;
      return q + 1;
    });
  };

  const toggleFavorite = (id: string, name: string) => {
    setFavorites((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      showToast(updated[id] ? `Added ${name} to favorites` : `Removed ${name} from favorites`);
      return updated;
    });
  };

  const handleAddToCart = (name: string) => {
    showToast(`Added ${quantity} x ${name} to cart successfully!`);
  };

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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  const getLogoMarkStyle = (logoStyle: "gold" | "silver" | "white" | "rose") => {
    if (logoStyle === "rose") {
      return {
        background: "linear-gradient(135deg, #b87b6a 0%, #f3d4cc 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      };
    }
    return {};
  };

  const renderFrontCard = (isThumb = false) => {
    const isTeamLayout = activeProduct.isTeamLayout;
    const isLight = activeProduct.cardStyle.isLight;
    const logoStyle = activeProduct.cardStyle.logoStyle;

    // Team Edition styling
    if (isTeamLayout) {
      const Icon = activeProduct.icon || Users;
      return (
        <div className={`te-card-mockup ${activeProduct.cssClass}`} style={{ width: "100%", height: "100%" }}>
          <div className="te-card-left">
            <div className={`te-mock-logo ${isLight ? "light-card-text" : ""}`}>
              H<span className={`te-mock-logo-mark ${logoStyle === "gold" ? "gold-logo" : ""}`}>t</span>
            </div>
            <div className={`te-card-name ${isLight ? "light-card-text" : ""}`} style={{ fontSize: isThumb ? "0.32rem" : "0.52rem" }}>
              {activeProduct.title}
            </div>
          </div>
          <div className="te-card-right">
            <div className={`te-card-icon-wrap ${isLight ? "light-card-text" : ""}`}>
              <Icon className="icon" style={{ width: isThumb ? "14px" : "24px", height: isThumb ? "14px" : "24px" }} />
            </div>
          </div>
        </div>
      );
    }

    // Metal or Executive or Minimal styling
    const specificClass = activeProduct.cssClass || "";
    const hasExtraLines = activeProduct.hasExtraLines;

    return (
      <div
        className={`ec-card-mockup ${specificClass}`}
        style={{
          width: "100%",
          height: "100%",
          background: activeProduct.cardStyle.background,
          border: activeProduct.cardStyle.border || "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div className="ec-card-mockup-glare"></div>

        {hasExtraLines === "graphite" && <div className="ec-card-graphite-lines" />}
        {hasExtraLines === "prestige" && <div className="ec-card-prestige-texture" />}
        {hasExtraLines === "titanium" && <div className="ec-card-titanium-texture" />}
        {hasExtraLines === "legacy" && (
          <div className="ec-card-legacy-crest" style={{ transform: isThumb ? "translate(-50%, -50%) scale(0.6)" : "translate(-50%, -50%)" }}>
            <Award className="icon" style={{ width: "24px", height: "24px", color: "rgba(212, 175, 55, 0.75)" }} />
          </div>
        )}

        <div className={`ec-mock-logo ${isLight ? "light-card-text" : ""}`} style={{ padding: isThumb ? "6px 8px" : "14px" }}>
          H
          <span
            className={`ec-mock-logo-mark ${logoStyle === "gold" ? "gold-logo" : ""}`}
            style={getLogoMarkStyle(logoStyle)}
          >
            t
          </span>
        </div>

        <div className="ec-mock-details" style={{ padding: isThumb ? "6px 8px" : "14px" }}>
          <div className={`ec-mock-brand ${isLight ? "light-card-text" : ""}`} style={{ fontSize: isThumb ? "0.35rem" : "0.5rem" }}>
            HAPPYTAP
          </div>
          <div className={`ec-mock-chip ${isLight ? "light-card-text" : ""}`}>
            <Wifi className="icon icon-sm" style={{ transform: "rotate(90deg)", width: isThumb ? "10px" : "14px" }} />
          </div>
        </div>
      </div>
    );
  };

  const renderBackCard = (isThumb = false) => {
    const isLight = activeProduct.cardStyle.isLight;
    const logoStyle = activeProduct.cardStyle.logoStyle;
    return (
      <div
        className="ec-card-back"
        style={{
          background: activeProduct.cardStyle.background,
          border: activeProduct.cardStyle.border || "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div className="pd-back-top" style={{ padding: isThumb ? "0 2px" : "0 6px" }}>
          <div className={`pd-back-logo ${isLight ? "light-card-text" : ""}`} style={{ fontSize: isThumb ? "0.6rem" : "1rem" }}>
            H<span className={`pd-back-logo-mark ${logoStyle === "gold" ? "gold-logo" : ""}`}>t</span>
          </div>
          <Wifi className="icon" style={{ transform: "rotate(90deg)", width: isThumb ? "10px" : "14px", color: isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)" }} />
        </div>
        <div className="pd-back-middle">
          <div className="pd-back-qr" style={{ width: isThumb ? "28px" : "54px", height: isThumb ? "28px" : "54px", borderRadius: isThumb ? "3px" : "6px" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "#000", width: "100%", height: "100%" }}>
              <rect x="2" y="2" width="6" height="6" />
              <rect x="16" y="2" width="6" height="6" />
              <rect x="2" y="16" width="6" height="6" />
              <path d="M16 16h2v2h-2zm4 4h2v2h-2zm-4 4h2v-2h-2zm6-4h-2v-2h2zm-2 2v2h-2v-2zm-6-6h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2z" />
            </svg>
          </div>
          {!isThumb && (
            <div className="pd-back-info">
              <div className={`pd-back-name ${isLight ? "light-card-text" : ""}`}>Alex Bennett</div>
              <div className={`pd-back-title ${isLight ? "light-card-text" : ""}`}>CEO | Horizon Technologies</div>
              <div className="pd-back-details">
                +91 98765 43210 <br />
                alex@horizon.com <br />
                Bengaluru, India
              </div>
            </div>
          )}
        </div>
        {!isThumb ? (
          <div className="pd-back-bottom">Tap to Connect</div>
        ) : (
          <div className={`pd-back-name ${isLight ? "light-card-text" : ""}`} style={{ fontSize: "0.36rem", textAlign: "center" }}>Alex Bennett</div>
        )}
      </div>
    );
  };

  const renderSideCard = (isThumb = false) => {
    const coreClass = activeProduct.cardStyle.sideCoreClass || "side-core-silver";
    return (
      <div className={`ec-card-side ${coreClass}`} style={{ width: isThumb ? "90%" : "85%", height: isThumb ? "3px" : "6px" }}>
        <div className="ec-card-side-glow"></div>
        {/* Left/right side highlights */}
        <div style={{ position: "absolute", left: "10%", width: "4px", height: "100%", background: "rgba(255,255,255,0.4)", borderRadius: "50%" }}></div>
        <div style={{ position: "absolute", right: "10%", width: "4px", height: "100%", background: "rgba(255,255,255,0.4)", borderRadius: "50%" }}></div>
      </div>
    );
  };

  const handleArrowNav = (direction: "left" | "right") => {
    const views: ("front" | "back" | "side")[] = ["front", "back", "side"];
    const currentIndex = views.indexOf(activeView);
    let nextIndex = direction === "right" ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex > 2) nextIndex = 0;
    if (nextIndex < 0) nextIndex = 2;
    setActiveView(views[nextIndex]);
  };

  return (
    <>
      <Navbar
        onLoginClick={() => openAuth("login")}
        user={user}
        onLogout={handleLogout}
      />

      <main className="product-detail-page">
        <div className="container">
          {/* Breadcrumbs */}
          <nav className="pd-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="pd-breadcrumb-separator">/</span>
            <Link href={`/cards/${currentCollection.slug}`}>{currentCollection.name}</Link>
            <span className="pd-breadcrumb-separator">/</span>
            <span className="pd-breadcrumb-current">{activeProduct.title}</span>
          </nav>

          {/* Product Section Grid */}
          <div className="pd-main-grid">
            {/* Gallery (Left Column) */}
            <div className="pd-gallery-section">
              <div className="pd-preview-box">
                {/* Navigation Arrows */}
                <button
                  className="pd-preview-arrow pd-preview-arrow-left"
                  onClick={() => handleArrowNav("left")}
                  aria-label="Previous view"
                >
                  <ChevronLeft style={{ width: "20px", height: "20px" }} />
                </button>

                <div
                  className="ec-card-preview-area"
                  style={{ width: "100%", maxWidth: "360px", padding: 0, margin: 0, display: "flex", justifyContent: "center" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeView}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                      {activeView === "front" && renderFrontCard()}
                      {activeView === "back" && renderBackCard()}
                      {activeView === "side" && renderSideCard()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <button
                  className="pd-preview-arrow pd-preview-arrow-right"
                  onClick={() => handleArrowNav("right")}
                  aria-label="Next view"
                >
                  <ChevronRight style={{ width: "20px", height: "20px" }} />
                </button>
              </div>

              {/* Thumbnails Row */}
              <div className="pd-thumbnails-row">
                <div
                  className={`pd-thumbnail-box ${activeView === "front" ? "active" : ""}`}
                  onClick={() => setActiveView("front")}
                >
                  <div style={{ width: "70px", height: "44px", transform: "scale(0.8)" }}>
                    {renderFrontCard(true)}
                  </div>
                  <span className="pd-thumbnail-label">Front Design</span>
                </div>

                <div
                  className={`pd-thumbnail-box ${activeView === "back" ? "active" : ""}`}
                  onClick={() => setActiveView("back")}
                >
                  <div style={{ width: "70px", height: "44px", transform: "scale(0.8)" }}>
                    {renderBackCard(true)}
                  </div>
                  <span className="pd-thumbnail-label">Back Design</span>
                </div>

                <div
                  className={`pd-thumbnail-box ${activeView === "side" ? "active" : ""}`}
                  onClick={() => setActiveView("side")}
                >
                  <div style={{ width: "70px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {renderSideCard(true)}
                  </div>
                  <span className="pd-thumbnail-label">Side View</span>
                </div>
              </div>
            </div>

            {/* Product Info (Right Column) */}
            <div className="pd-info-section">
              <span className="pd-collection-badge">
                <Layers className="icon icon-sm" style={{ marginRight: "4px" }} />
                {currentCollection.badge}
              </span>
              <h1 className="pd-product-name">{activeProduct.title}</h1>
              <p className="pd-product-description">{activeProduct.description}</p>

              <div className="pd-product-price">₹{activeProduct.price.toLocaleString()}</div>

              {/* Ratings */}
              <div className="pd-rating-row">
                <div className="pd-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="icon icon-sm" fill="#ffb300" stroke="#ffb300" style={{ width: "16px", height: "16px" }} />
                  ))}
                </div>
                <span className="pd-rating-text">4.9</span>
                <span>(128 reviews)</span>
              </div>

              {/* Badges Row */}
              <div className="pd-badges-row">
                <span className="pd-feature-badge">
                  <Wifi className="icon icon-sm" style={{ transform: "rotate(90deg)" }} />
                  NFC Enabled
                </span>
                <span className="pd-feature-badge">
                  <Sparkles className="icon icon-sm" />
                  Instant Sharing
                </span>
                <span className="pd-feature-badge">
                  <ShieldCheck className="icon icon-sm" />
                  No App Required
                </span>
                <span className="pd-feature-badge">
                  <Award className="icon icon-sm" />
                  Works Everywhere
                </span>
              </div>

              {/* Purchase Controls */}
              <div className="pd-purchase-row">
                <div className="pd-quantity-selector">
                  <button className="pd-quantity-btn" onClick={() => handleQtyChange("dec")} aria-label="Decrease quantity">-</button>
                  <span className="pd-quantity-val">{quantity}</span>
                  <button className="pd-quantity-btn" onClick={() => handleQtyChange("inc")} aria-label="Increase quantity">+</button>
                </div>

                <button className="pd-add-to-cart-btn" onClick={() => handleAddToCart(activeProduct.title)}>
                  <ShoppingCart className="icon icon-sm" />
                  Add to Cart
                </button>

                <button
                  className={`pd-wishlist-btn ${favorites[activeProduct.id] ? "active" : ""}`}
                  onClick={() => toggleFavorite(activeProduct.id, activeProduct.title)}
                  aria-label="Add to wishlist"
                >
                  <Heart className="icon" style={{ fill: favorites[activeProduct.id] ? "#ff4757" : "none" }} />
                </button>
              </div>

              {/* Shipping & Return Details */}
              <div className="pd-shipping-info-row">
                <div className="pd-shipping-info-card">
                  <RefreshCw className="pd-shipping-icon" style={{ width: "20px", height: "20px" }} />
                  <div>
                    <h4>7 Days Return</h4>
                    <p>Hassle-free returns</p>
                  </div>
                </div>
                <div className="pd-shipping-info-card">
                  <Truck className="pd-shipping-icon" style={{ width: "20px", height: "20px" }} />
                  <div>
                    <h4>Free Shipping</h4>
                    <p>On all orders</p>
                  </div>
                </div>
                <div className="pd-shipping-info-card">
                  <ShieldCheck className="pd-shipping-icon" style={{ width: "20px", height: "20px" }} />
                  <div>
                    <h4>Secure Payment</h4>
                    <p>100% protected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Explore Every Detail Section */}
          <section className="pd-detail-section">
            <h2>Explore Every Detail</h2>
            <div className="pd-detail-grid">
              {/* Column 1: Front */}
              <div className="pd-detail-col">
                <h3>1. Front Design</h3>
                <p>Premium finish with custom laser engraved brand identity emblem details.</p>
                <div className="pd-detail-card-container">
                  <div style={{ width: "100%", maxWidth: "220px", aspectRatio: "1.58 / 1" }}>
                    {renderFrontCard()}
                  </div>
                </div>
              </div>

              {/* Column 2: Back */}
              <div className="pd-detail-col">
                <h3>2. Back Design</h3>
                <p>Custom integrated QR code for fast, app-less contact sharing.</p>
                <div className="pd-detail-card-container">
                  <div style={{ width: "100%", maxWidth: "220px", aspectRatio: "1.58 / 1" }}>
                    {renderBackCard()}
                  </div>
                </div>
              </div>

              {/* Column 3: Side */}
              <div className="pd-detail-col">
                <h3>3. Side View</h3>
                <p>Ultra-thin premium metallic material edge with refined rounded borders.</p>
                <div className="pd-detail-card-container" style={{ alignItems: "center" }}>
                  {renderSideCard()}
                </div>
              </div>
            </div>
          </section>

          {/* Specifications Section */}
          <section className="pd-specs-grid">
            <div className="pd-spec-card">
              <div className="pd-spec-icon-wrap">
                <Shield className="icon icon-sm" />
              </div>
              <h3>Premium Material</h3>
              <p>Built with durable, aerospace-grade custom composites.</p>
            </div>
            <div className="pd-spec-card">
              <div className="pd-spec-icon-wrap">
                <Wifi className="icon icon-sm" style={{ transform: "rotate(90deg)" }} />
              </div>
              <h3>NFC Technology</h3>
              <p>Latest high-resonance NFC chip for seamless tap connections.</p>
            </div>
            <div className="pd-spec-card">
              <div className="pd-spec-icon-wrap">
                <RefreshCw className="icon icon-sm" />
              </div>
              <h3>Water Resistant</h3>
              <p>Protected from spills, splashes, and everyday environments.</p>
            </div>
            <div className="pd-spec-card">
              <div className="pd-spec-icon-wrap">
                <Sparkles className="icon icon-sm" />
              </div>
              <h3>Scratch Proof</h3>
              <p>Anodized surface coating resistant to pocket scratches.</p>
            </div>
            <div className="pd-spec-card">
              <div className="pd-spec-icon-wrap">
                <Award className="icon icon-sm" />
              </div>
              <h3>Ultra Thin</h3>
              <p>Sleek 0.8mm profile that fits easily into standard wallets.</p>
            </div>
          </section>

          {/* Related Products Section */}
          <section className="pd-related-section">
            <h2>You May Also Like</h2>
            <div className="ec-grid-5">
              {relatedProducts.map((rel) => (
                <div className="ec-product-card" key={rel.id}>
                  {/* Related card preview */}
                  <div className="ec-card-preview-area" style={{ margin: "10px 0 20px" }}>
                    {rel.isTeamLayout ? (
                      <div
                        className={`te-card-mockup ${rel.cssClass || ""}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          maxWidth: "155px",
                          borderRadius: "10px",
                          padding: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                          border: rel.cardStyle.border || "none",
                        }}
                      >
                        <div className="te-card-left" style={{ gap: "4px" }}>
                          <div className={`te-mock-logo ${rel.cardStyle.isLight ? "light-card-text" : ""}`} style={{ fontSize: "0.55rem" }}>
                            H<span className={`te-mock-logo-mark ${rel.cardStyle.logoStyle === "gold" ? "gold-logo" : ""}`}>t</span>
                          </div>
                          <div className={`te-card-name ${rel.cardStyle.isLight ? "light-card-text" : ""}`} style={{ fontSize: "0.28rem" }}>
                            {rel.title}
                          </div>
                        </div>
                        <div className="te-card-right">
                          <div className={`te-card-icon-wrap ${rel.cardStyle.isLight ? "light-card-text" : ""}`} style={{ padding: "2px" }}>
                            {(() => {
                              const RelIcon = rel.icon || Users;
                              return <RelIcon className="icon" style={{ width: "12px", height: "12px" }} />;
                            })()}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`ec-card-mockup`}
                        style={{
                          width: "100%",
                          height: "100%",
                          maxWidth: "155px",
                          background: rel.cardStyle.background,
                          border: rel.cardStyle.border || "1px solid rgba(255, 255, 255, 0.08)",
                          borderRadius: "10px",
                          padding: "10px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className={`ec-mock-logo ${rel.cardStyle.isLight ? "light-card-text" : ""}`} style={{ fontSize: "0.85rem" }}>
                          H<span className={`ec-mock-logo-mark ${rel.cardStyle.logoStyle === "gold" ? "gold-logo" : ""}`}>t</span>
                        </div>
                        <div className="ec-mock-details">
                          <div className={`ec-mock-brand ${rel.cardStyle.isLight ? "light-card-text" : ""}`} style={{ fontSize: "0.45rem" }}>
                            HAPPYTAP
                          </div>
                          <Wifi className="icon icon-sm" style={{ transform: "rotate(90deg)", width: "10px" }} />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="ec-product-details">
                    <span className="ms-product-tag" style={{ color: "#86868b", fontSize: "0.7rem", fontWeight: "600", textTransform: "uppercase" }}>
                      {rel.category}
                    </span>
                    <h3 style={{ fontSize: "0.95rem" }}>{rel.title}</h3>
                    <span className="ec-product-price" style={{ fontSize: "1rem" }}>₹{rel.price.toLocaleString()}</span>
                  </div>

                  <Link href={`/cards/${collection}/${rel.id}`} style={{ textDecoration: "none" }}>
                    <button className="ec-view-details-btn">View Details</button>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="te-cta-section" style={{ padding: 0 }}>
            <div className="te-dual-grid">
              {/* Left Split Card: Custom Team Plan */}
              <Reveal>
                <div className="te-split-card">
                  <div className="te-split-card-glow"></div>
                  <div className="te-cta-card-layout">
                    <div className="te-cta-card-info">
                      <h2>Need a Custom Team Plan?</h2>
                      <p>Let's build the perfect solution for your organization.</p>
                      <button onClick={() => openAuth("signup")} className="te-solid-purple-btn">
                        Contact Sales Team
                        <ArrowRight className="icon" />
                      </button>
                    </div>

                    <div className="te-cta-visual-wrap">
                      <div className="te-connection-circle-wrap">
                        <div className="te-center-node">
                          <Users className="icon" style={{ width: "20px", height: "20px" }} />
                        </div>
                        <div className="te-avatar-node te-avatar-node-1">
                          <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                            alt="Sarah J."
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                        <div className="te-avatar-node te-avatar-node-2">
                          <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                            alt="David L."
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                        <div className="te-avatar-node te-avatar-node-3">
                          <img
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                            alt="Liam K."
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                        <svg className="te-connection-svg" viewBox="0 0 140 140">
                          <line x1="70" y1="70" x2="70" y2="16" stroke="rgba(91, 69, 232, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
                          <line x1="70" y1="70" x2="24" y2="114" stroke="rgba(91, 69, 232, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
                          <line x1="70" y1="70" x2="116" y2="114" stroke="rgba(91, 69, 232, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Right Split Card: Custom Plan features */}
              <Reveal delay={100}>
                <div className="te-split-card" style={{ padding: "30px 40px" }}>
                  <div className="te-split-card-glow"></div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div className="te-benefits-icon-wrap" style={{ width: "40px", height: "40px" }}>
                        <Building2 className="icon" style={{ width: "18px", height: "18px" }} />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: "750", color: "#1d1d1f" }}>Bulk Orders</h4>
                        <p style={{ margin: "2px 0 0 0", fontSize: "0.8rem", color: "#86868b" }}>Special pricing for large enterprise teams.</p>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div className="te-benefits-icon-wrap" style={{ width: "40px", height: "40px" }}>
                        <Palette className="icon" style={{ width: "18px", height: "18px" }} />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: "750", color: "#1d1d1f" }}>Custom Branding</h4>
                        <p style={{ margin: "2px 0 0 0", fontSize: "0.8rem", color: "#86868b" }}>Add your custom logo and corporate brand identity.</p>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div className="te-benefits-icon-wrap" style={{ width: "40px", height: "40px" }}>
                        <Headset className="icon" style={{ width: "18px", height: "18px" }} />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: "750", color: "#1d1d1f" }}>Dedicated Support</h4>
                        <p style={{ margin: "2px 0 0 0", fontSize: "0.8rem", color: "#86868b" }}>Priority account setup and dedicated customer success manager.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </div>
      </main>

      <Footer />

      {/* Floating Success Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            className="pf-toast"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            style={{
              position: "fixed",
              bottom: "40px",
              right: "40px",
              background: "#FFFFFF",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
              padding: "16px 24px",
              borderRadius: "100px",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <CheckCircle2 className="icon" style={{ color: "#4ade80" }} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialTab={authTab}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}
