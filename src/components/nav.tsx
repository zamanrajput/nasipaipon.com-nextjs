"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import logo from "../../assets/assets/NASI PAIPON.png";

type MenuItemNav = {
  name: string;
  url: string;
};

const TopNavBar = () => {
  const router = useRouter();
  const [cIndex, setCIndex] = useState(-1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: Array<MenuItemNav> = [
    { name: "HOME", url: "/" },
    { name: "TIMINGS", url: "/pages/timing" },
    // { name: "MENUS", url: "/pages/menus" },
    { name: "CONTACT", url: "/pages/contact" },
    { name: "ABOUT", url: "/pages/about" },
    { name: "PRIVACY", url: "/pages/privacy" },
  ];

  useEffect(() => {
    const url = location.href;
    navItems.forEach((e, i) => {
      if (url.includes(e.url)&& !url.includes('download')) {
        setCIndex(i);
        return;
      }
    });
  }, []);

  const handleMenuItemClick = (index: number, url: string) => {
    setCIndex(index);
    router.push(url);
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
              onClick={() => handleMenuItemClick(index, e.url)}
              key={e.name}
              className={`cursor-pointer hover:font-bold w-12 ${
                cIndex == index
                  ? "font-bold aboutclr"
                  : "font-light text-opacity-60"
              }`}
            >
              {e.name}
            </div>
          ))}
        </div>
        <div className="text-xl">
          <button onClick={()=>{router.push("/pages/download");setCIndex(-1);}} className="px-4 py-2 bg-[#FE222E] text-white rounded-lg">
            Download App
          </button>
        </div>
      </nav>

      {/* Mobile Hamburger and Side Nav */}
      <nav className="sm:hidden flex items-center justify-between px-4 backdrop-blur-sm absolute w-full z-[100]">
        <div
          onClick={() => {
            router.push("/");
            setCIndex(0);
          }}
          className="text-2xl font-bold logoclr"
        >
          <img width={200} src={logo.src} alt="" className="mb-2" />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </div>
      </nav>

      {/* Mobile Side Nav */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-slate-800 text-white transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-[150]`}
      >
        <div className="px-6 py-4 flex justify-between items-center">
          <span className="text-2xl font-bold"><img width={250} src={logo.src} alt="" className="mb-2" /></span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-6 px-6">
          {navItems.map((e, index) => (
            <div
              onClick={() => handleMenuItemClick(index, e.url)}
              key={e.name}
              className={`cursor-pointer hover:font-bold ${
                cIndex == index
                  ? "font-bold aboutclr"
                  : "font-light text-opacity-60"
              }`}
            >
              {e.name}
            </div>
          ))}
        </div>
        <div className="px-6 mt-10">
        <button onClick={()=>{router.push("/pages/download");setCIndex(-1);}} className="px-4 py-2 bg-[#FE222E] text-white rounded-lg">
            Download App
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
