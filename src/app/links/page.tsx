"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Utensils,
  Laptop,
  ChevronRight,
} from "lucide-react";
import logo from "../../../assets/assets/NASI PAIPON.png";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type LinkItem = {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  href: string;
  eventName: string;
  primary?: boolean;
};

const links: LinkItem[] = [
  {
    icon: <Utensils size={26} />,
    label: "Pre-Order Makanan Nasi Paipon",
    sublabel: "Tempah sekarang — pilih menu & slot pickup",
    href: "https://nasipaipon.com/preorder/#makanan",
    eventName: "click_preorder_makanan",
    primary: true,
  },
  {
    icon: <Laptop size={26} />,
    label: "Nasi Paipon Tech",
    sublabel: "Apps & System Development",
    href: "https://tech.nasipaipon.com/#contact",
    eventName: "click_tech",
  },
];

export default function LinksPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (item: LinkItem) => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", item.eventName, {
        event_category: "bio_link",
        event_label: item.label,
      });
    }
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 20px 64px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            marginBottom: 32,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <Image
            src={logo}
            alt="Nasi Paipon"
            width={220}
            priority
            style={{
              width: "min(220px, 65vw)",
              height: "auto",
              filter: "drop-shadow(0 0 28px rgba(254,34,46,0.40))",
            }}
          />
        </div>

        {/* Buttons */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {links.map((item, i) => (
            <LinkButton
              key={item.href}
              item={item}
              mounted={mounted}
              delay={0.15 + i * 0.1}
              onClick={() => handleClick(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function LinkButton({
  item,
  mounted,
  delay,
  onClick,
}: {
  item: LinkItem;
  mounted: boolean;
  delay: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const sharedStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 16,
    width: "100%",
    minHeight: 64,
    padding: "14px 20px",
    borderRadius: 16,
    textDecoration: "none",
    color: "#fff",
    cursor: "pointer",
    boxSizing: "border-box",
    opacity: mounted ? 1 : 0,
    transform: mounted
      ? hovered
        ? "translateY(-2px)"
        : "translateY(0)"
      : "translateY(20px)",
    transition: mounted
      ? "transform 0.18s ease, box-shadow 0.18s ease"
      : `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
  };

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        ...sharedStyle,
        background: item.primary
          ? "linear-gradient(135deg, #FE222E 0%, #c41520 100%)"
          : "rgba(255,255,255,0.07)",
        border: "1.5px solid rgba(255,255,255,0.15)",
        boxShadow: hovered
          ? "0 12px 30px rgba(0,0,0,0.4)"
          : "0 4px 20px rgba(0,0,0,0.25)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Lucide Icon */}
      <span style={{ flexShrink: 0, display: "flex" }}>
        {item.icon}
      </span>

      <span
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          flex: 1,
        }}
      >
        <span
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(14px, 4vw, 16px)",
            fontWeight: 700,
          }}
        >
          {item.label}
        </span>
        <span
          style={{
            fontSize: "clamp(11px, 2.8vw, 12px)",
            opacity: 0.68,
          }}
        >
          {item.sublabel}
        </span>
      </span>

      {/* Arrow Icon */}
      <ChevronRight
        size={20}
        style={{
          opacity: hovered ? 0.9 : 0.5,
          transform: hovered ? "translateX(4px)" : "translateX(0)",
          transition: "all 0.18s ease",
        }}
      />
    </a>
  );
}
