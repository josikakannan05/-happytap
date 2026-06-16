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
        category: "Minimal Series",
        price: 799,
        description: "Deep charcoal matte finish with reflective silver foil detailing. The perfect blend of minimalism and professionalism.",
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
        category: "Minimal Series",
        price: 899,
        description: "Industrial dark grey brushed texture with polished metal engraving look. Designed for builders and innovators.",
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
        category: "Minimal Series",
        price: 999,
        description: "Raw carbon fiber weaving aesthetic for high-tech professionals. Lightweight feel with heavy-weight performance.",
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
        category: "Minimal Series",
        price: 1199,
        description: "Space-grade titanium silver hue with a satin metallic luster. Clean, raw, and exceptionally modern.",
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
        category: "Minimal Series",
        price: 1299,
        description: "Mystical deep purple gradient representing the celestial twilight shadow. For visionaries working in the shadows.",
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
        category: "Minimal Series",
        price: 1299,
        description: "Vibrant iridescent gradient reflecting the natural northern lights. Stand out with natural color flow.",
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
        category: "Minimal Series",
        price: 1499,
        description: "Warm pink-gold satin finish with reflective copper-rose highlights. Elegance defined in every hand-off.",
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
        category: "Minimal Series",
        price: 1699,
        description: "Radiant high-polished platinum silver with chrome logo emblem. The peak of premium minimalist luxury.",
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
        category: "Minimal Series",
        price: 1999,
        description: "Deep navy blue casing highlighted by a 24k polished gold accent. Built for the boardroom and executive suite.",
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
        category: "Minimal Series",
        price: 2499,
        description: "Matte obsidian casing with gold trim border and signature monogram. Your professional signature, tangible.",
        colorName: "Velvet Obsidian & Gold",
        cardStyle: {
          background: "linear-gradient(135deg, #141414 0%, #2a2a2a 100%)",
          logoStyle: "gold",
          border: "1px solid #ffd700",
          sideCoreClass: "side-core-gold",
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
        category: "Metal Edition",
        price: 1999,
        description: "Raw brushed bronze surface with warm rustic copper undertones. A timeless weight of pure rustic metal.",
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
        category: "Metal Edition",
        price: 2199,
        description: "Satin metallic copper finish emitting a brilliant rose-amber glow. Warm luxury and bold style.",
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
        category: "Metal Edition",
        price: 2499,
        description: "Space-grade brushed titanium silver with a sleek industrial appearance. Ultra durable, ultra professional.",
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
        category: "Metal Edition",
        price: 2699,
        description: "Deep gunmetal charcoal brushed finish with subtle dark engravings. Raw structural power in your pocket.",
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
        category: "Metal Edition",
        price: 2999,
        description: "Luxurious brushed rose-gold plating reflecting a warm satin luster. Classic elegance meets modern NFC technology.",
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
        category: "Metal Edition",
        price: 3299,
        description: "Brilliant brushed silver with high-reflectivity chrome highlights. Clean metallic details.",
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
        category: "Metal Edition",
        price: 3499,
        description: "Deep luster platinum chrome reflecting high wealth and prestige. The ultimate calling card for captains of industry.",
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
        category: "Metal Edition",
        price: 3999,
        description: "Velvet midnight black body with executive 24k polished gold trim. A royal presence in any network connection.",
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
        category: "Metal Edition",
        price: 4499,
        description: "Mirror-finish gold plating engraved with exclusive initials patterns. An unforgettable gold standard.",
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
        category: "Metal Edition",
        price: 4999,
        description: "Deep obsidian matte black finish with double-anodized laser engraving. Stealth corporate prestige.",
        colorName: "Matte Black",
        cardStyle: {
          background: "linear-gradient(135deg, #050505 0%, #1a1a1a 100%)",
          logoStyle: "white",
          sideCoreClass: "side-core-black",
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
        category: "Executive Collection",
        price: 3999,
        description: "Midnight black body enhanced by a premium radial gold wave pattern. The classic hallmark of executive quality.",
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
        category: "Executive Collection",
        price: 4499,
        description: "Geometric matte texture design on a deep graphite background. Modern structural design for contemporary leaders.",
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
        category: "Executive Collection",
        price: 4999,
        description: "Brushed metal finish reflecting a warm rose-gold metallic luster. Timeless warmth and luxury design.",
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
        category: "Executive Collection",
        price: 5499,
        description: "Elegant diamond quilt pattern engraved into a premium executive body. Satin texture feels premium in hand.",
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
        category: "Executive Collection",
        price: 5999,
        description: "Modern hexagon metal texture design with a satin titanium silver coat. High-tech executive look.",
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
        category: "Executive Collection",
        price: 6999,
        description: "Stunning diagonal gold lines across an elite deep charcoal surface. Sleek diagonal gold lines across an elite deep charcoal surface.",
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
        category: "Executive Collection",
        price: 7499,
        description: "Exquisite combination of rich mahogany wood veneer and rose-gold finish. Real wood aesthetic representing solid leadership.",
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
        category: "Executive Collection",
        price: 7999,
        description: "Deep obsidian matte background with premium horizontal micro-textures. Silent, powerful, and absolutely elite.",
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
        category: "Executive Collection",
        price: 8999,
        description: "Minimalist executive card defined by double 24k polished gold borders. A refined gold frame around your identity.",
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
        category: "Executive Collection",
        price: 9999,
        description: "Flagship royal emblem and crest design reflecting heritage and prestige. The ultimate family legacy card.",
        colorName: "Royal Emblem",
        cssClass: "ec-card-legacy",
        cardStyle: {
          background: "#111113",
          logoStyle: "gold",
          sideCoreClass: "side-core-gold",
        },
        hasExtraLines: "legacy",
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
        description: "Elegant black and gold executive design, perfect for small team setups and organizations.",
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
        category: "Team Edition",
        price: 1999,
        description: "Deep blue premium finish designed for high-performance professional corporate teams.",
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
        category: "Team Edition",
        price: 2499,
        description: "Sleek dark graphite layout featuring a custom integrated code developer icon. Ideal for engineering squads.",
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
        category: "Team Edition",
        price: 2499,
        description: "Vibrant emerald green creative style highlighting artistic profiles and creative agency teams.",
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
        category: "Team Edition",
        price: 2999,
        description: "Rich purple branding layout tailored for creative marketers, PR specialists, and social media squads.",
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
        category: "Team Edition",
        price: 2999,
        description: "Luxury metallic copper finish customized with a growth bar chart symbol. Perfect for high-velocity closers.",
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
        category: "Team Edition",
        price: 2499,
        description: "Classic navy blue layout custom-engraved with a dedicated headset support symbol. For customer success champions.",
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
        category: "Team Edition",
        price: 2499,
        description: "Stunning gold-plated pattern with integrated security shield icon representing HR care and talent aquisition.",
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
        category: "Team Edition",
        price: 2999,
        description: "Dark blue corporate layout customized with a clean asset briefcase icon. For financial controllers and CFOs.",
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
        category: "Team Edition",
        price: 3499,
        description: "Gunmetal grey enterprise finish crafted for large-scale corporate organizations and company-wide rollouts.",
        colorName: "Gunmetal Enterprise",
        cssClass: "te-card-enterprise",
        icon: Building2,
        cardStyle: {
          logoStyle: "silver",
          sideCoreClass: "side-core-silver",
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
