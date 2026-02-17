"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import logo from "../../assets/assets/NASI PAIPON.png";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

type MenuItemNav = {
  name: string;
  url: string;
  isExternal?: boolean;
};

const TopNavBar = () => {
  const router = useRouter();
  const [cIndex, setCIndex] = useState(-1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: Array<MenuItemNav> = [
    { name: "HOME", url: "/" },
    { name: "RAMADAN", url: "/preorder" },
    { name: "CONTACT", url: "/pages/contact" },
    { name: "ABOUT", url: "/pages/about" },
    { name: "TECH", url: "https://tech.nasipaipon.com", isExternal: true },
  ];

  useEffect(() => {
    const url = location.href;
    navItems.forEach((e, i) => {
      if (!e.isExternal && url.includes(e.url) && !url.includes("download")) {
        setCIndex(i);
      }
    });
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuItemClick = (
    index: number,
    url: string,
    isExternal?: boolean
  ) => {
    if (isExternal) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      setCIndex(index);
      router.push(url);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* ─── DESKTOP NAV (sm and above) ───────────────────────────── */}
      <nav className="hidden sm:flex justify-between items-center px-12 fixed w-full backdrop-blur-sm text-white z-[100]">
        {/* Logo */}
        <div
          onClick={() => {
            router.push("/");
            setCIndex(0);
          }}
          className="cursor-pointer my-3 shrink-0"
        >
          <img width={200} src={logo.src} alt="Nasi Paipon" className="mb-2" />
        </div>

        {/* Nav Links */}
        <div className="flex gap-6 lg:gap-10">
          {navItems.map((e, index) => (
            <div
              onClick={() => handleMenuItemClick(index, e.url, e.isExternal)}
              key={e.name}
              className={`cursor-pointer text-sm lg:text-base hover:font-bold transition-all whitespace-nowrap ${
                cIndex === index && !e.isExternal
                  ? "font-bold aboutclr"
                  : "font-light opacity-80"
              }`}
            >
              {e.name}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="shrink-0">
          <Button
            onClick={() => {
              router.push("/pages/download");
              setCIndex(-1);
            }}
            className="bg-[#FE222E] hover:bg-[#e01e28] text-sm lg:text-base"
          >
            Download App
          </Button>
        </div>
      </nav>

      {/* ─── MOBILE NAV BAR ───────────────────────────────────────── */}
      <nav className="sm:hidden flex items-center justify-between px-4 py-2 fixed w-full backdrop-blur-sm text-white z-[100]">
        {/* Logo (mobile) */}
        <div
          onClick={() => {
            router.push("/");
            setCIndex(0);
            setIsMobileMenuOpen(false);
          }}
          className="cursor-pointer"
        >
          <img width={150} src={logo.src} alt="Nasi Paipon" />
        </div>

        {/* Hamburger */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </Button>
      </nav>

      {/* ─── MOBILE OVERLAY BACKDROP ──────────────────────────────── */}
      {isMobileMenuOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black/50 z-[140]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ─── MOBILE SIDE DRAWER ───────────────────────────────────── */}
      <div
        className={`sm:hidden fixed top-0 left-0 h-full w-64 bg-slate-800 text-white transform transition-transform duration-300 ease-in-out z-[150] ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 flex justify-between items-center border-b border-slate-700">
          <img width={150} src={logo.src} alt="Nasi Paipon" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-white" />
          </Button>
        </div>

        {/* Drawer Links */}
        <div className="mt-4 flex flex-col px-6">
          {navItems.map((e, index) => (
            <div
              onClick={() => handleMenuItemClick(index, e.url, e.isExternal)}
              key={e.name}
              className={`py-3 cursor-pointer border-b border-slate-700/50 hover:font-bold transition-all ${
                cIndex === index && !e.isExternal
                  ? "font-bold aboutclr"
                  : "font-light opacity-80"
              }`}
            >
              {e.name}
            </div>
          ))}
        </div>

        {/* Drawer CTA */}
        <div className="px-6 mt-6">
          <Button
            onClick={() => {
              router.push("/pages/download");
              setCIndex(-1);
              setIsMobileMenuOpen(false);
            }}
            className="w-full bg-[#FE222E] hover:bg-[#e01e28]"
          >
            Download App
          </Button>
        </div>
      </div>
    </>
  );
};

export default TopNavBar;