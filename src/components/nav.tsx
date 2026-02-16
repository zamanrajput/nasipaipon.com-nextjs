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
    { name: "RAMADAN PREORDER", url: "/preorder" },
    { name: "TIMINGS", url: "/pages/timing" },
    { name: "CONTACT", url: "/pages/contact" },
    { name: "ABOUT", url: "/pages/about" },
    { name: "PRIVACY", url: "/pages/privacy" },
    { name: "TECH", url: "https://tech.nasipaipon.com", isExternal: true },
  ];

  useEffect(() => {
    const url = location.href;
    navItems.forEach((e, i) => {
      if (!e.isExternal && url.includes(e.url) && !url.includes("download")) {
        setCIndex(i);
        return;
      }
    });
  }, []);

  const handleMenuItemClick = (index: number, url: string, isExternal?: boolean) => {
    if (isExternal) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      setCIndex(index);
      router.push(url);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div>
      <nav className="sm:visible hidden sm:flex justify-between px-12 overflow-hidden sm:fixed w-full items-center backdrop-blur-sm text-white z-[100]">
        <div
          onClick={() => {
            router.push("/");
            setCIndex(0);
          }}
          className="logo text-3xl font-extrabold logoclr cursor-pointer my-3"
        >
          <img width={250} src={logo.src} alt="" className="mb-2" />
        </div>
        <div className="flex gap-10">
          {navItems.map((e, index) => (
            <div
              onClick={() => handleMenuItemClick(index, e.url, e.isExternal)}
              key={e.name}
              className={`cursor-pointer hover:font-bold ${
                e.name === "RAMADAN PREORDER" ? "w-40" : "w-auto"
              } ${
                cIndex == index && !e.isExternal
                  ? "font-bold aboutclr"
                  : "font-light text-opacity-60"
              }`}
            >
              {e.name}
            </div>
          ))}
        </div>
        <div className="text-xl gap-3 flex">
          <Button
            onClick={() => {
              router.push("/pages/download");
              setCIndex(-1);
            }}
            className="bg-[#FE222E] hover:bg-[#e01e28]"
          >
            Download App
          </Button>
        </div>
      </nav>

      {/* Mobile Hamburger and Side Nav */}
      <nav className="sm:hidden flex items-center justify-between px-4 backdrop-blur-sm absolute w-full z-[100]">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="w-8 h-8 text-white" />
        </Button>
      </nav>

      {/* Mobile Side Nav */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-slate-800 text-white transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-[150]`}
      >
        <div className="px-6 py-4 flex justify-between items-center">
          <span className="text-2xl font-bold">
            <img width={250} src={logo.src} alt="" className="mb-2" />
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-6 h-6 text-white" />
          </Button>
        </div>
        <div className="mt-6 flex flex-col gap-6 px-6">
          {navItems.map((e, index) => (
            <div
              onClick={() => handleMenuItemClick(index, e.url, e.isExternal)}
              key={e.name}
              className={`cursor-pointer hover:font-bold ${
                cIndex == index && !e.isExternal
                  ? "font-bold aboutclr"
                  : "font-light text-opacity-60"
              }`}
            >
              {e.name}
            </div>
          ))}
        </div>
        <div className="px-6 mt-10 space-y-3">
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
    </div>
  );
};

export default TopNavBar;