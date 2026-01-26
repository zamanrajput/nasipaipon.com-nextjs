"use client"

import { useEffect, useState } from "react"

const PLAY_STORE_LINK =
  "https://play.google.com/store/apps/details?id=app.nasipaipon.kitchen&hl=ms"
const APP_STORE_LINK = "https://apps.apple.com/my/app/nasi-paipon/id6751135731"

type Platform = "ios" | "android" | "loading"

function detectPlatform(): Platform {
  if (typeof window === "undefined") return "android"

  const userAgent = navigator.userAgent || navigator.vendor || ""
  const platform = navigator.platform || ""

  if (/iPad|iPhone|iPod/.test(userAgent)) return "ios"
  if (platform.toLowerCase().includes("mac") || /Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent)) return "ios"
  if (/android/i.test(userAgent)) return "android"
  if (/Win/.test(platform) || /Windows/.test(userAgent)) return "android"

  return "android"
}

export function EventCtaButton() {
  const [platform, setPlatform] = useState<Platform>("loading")

  useEffect(() => {
    setPlatform(detectPlatform())
  }, [])

  const handleClick = () => {
    const link = platform === "ios" ? APP_STORE_LINK : PLAY_STORE_LINK
    window.open(link, "_blank", "noopener,noreferrer")
  }

  // ✅ Always show "TEMPAH SEKARANG"
  const buttonText = "TEMPAH SEKARANG"

  return (
    <button
      onClick={handleClick}
      disabled={platform === "loading"}
      className="block w-full bg-[#e31b23] hover:bg-[#c41820] text-white text-center text-xl font-bold py-5 px-8 rounded-xl shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait"
    >
      {buttonText}
    </button>
  )
}