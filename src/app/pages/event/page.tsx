'use client'
import React, { useEffect, useState } from "react"
import Image from "next/image"
import type { Metadata } from "next"
import { CONFIG, getWhatsAppOrderURL } from "./config"
import {
  CalendarDaysIcon,
  MapPinIcon,
  UsersIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline"

type Platform = "ios" | "android" | "unknown";

function detectPlatform(): Platform {
  if (typeof window === "undefined") return "unknown";
  
  const userAgent = navigator.userAgent || navigator.vendor || "";
  const platform = navigator.platform || "";

  if (/iPhone|iPad|iPod/.test(userAgent)) {
    return "ios";
  }

  if (/Mac/.test(platform) || /Macintosh/.test(userAgent)) {
    return "ios";
  }

  if (/Android/.test(userAgent)) {
    return "android";
  }

  if (/Win/.test(platform) || /Windows/.test(userAgent)) {
    return "android";
  }

  return "android";
}

export default function EventPage() {
  const [platform, setPlatform] = useState<Platform>("unknown");

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const handleDownload = () => {
    const url = platform === "ios" ? CONFIG.appStore.ios : CONFIG.appStore.android;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleWhatsAppOrder = () => {
    window.open(getWhatsAppOrderURL(), "_blank", "noopener,noreferrer");
  };

  const handleFormOrder = () => {
    window.open(CONFIG.googleForm.url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      {/* Event Banner */}
      <section className="bg-gradient-to-r h-[60px] from-red-600 via-orange-600 to-red-600 text-white py-4 px-4 shadow-lg">
      
    
      </section>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 text-center max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Nak Nasi Paipon? <br />
          <span className="text-orange-600">Book dulu.</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-700 mb-2">
          Tempahan <strong>take away</strong> dibuat melalui
        </p>
        <p className="text-2xl md:text-3xl font-bold text-orange-600">
          App Nasi Paipon
        </p>
      </section>

      {/* CTA Buttons - Top Position */}
      <section className="container mx-auto px-6 py-6 max-w-4xl">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl shadow-lg p-6 border-2 border-orange-200">
          <p className="text-center text-gray-900 font-bold text-lg mb-4">
            📲 Tempah Sekarang - Pilih Cara Anda
          </p>
          
          <div className="grid md:grid-cols-3 gap-3">
            {/* Download App Button */}
            <button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              {platform === "ios" ? "App Store" : "Play Store"}
            </button>

            {/* WhatsApp Order Button */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </button>

            {/* Google Form Order Button */}
            <button
              onClick={handleFormOrder}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
              </svg>
              Google Form
            </button>
          </div>

          <p className="text-center text-gray-600 text-xs mt-3">
            ⏱️ Kurang 1 minit • ⚠️ Walk-in bergantung stok
          </p>
        </div>
      </section>

      {/* Event Details Card */}
      <section className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-3 text-gray-800">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CalendarDaysIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-600">Tarikh</p>
                <p className="text-lg font-bold">29, 30, 31 Jan & 1 Feb 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-800">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPinIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-600">Lokasi</p>
                <p className="text-lg font-bold">Bandar Laguna Merbok</p>
                <p className="text-md text-gray-600">Sungai Petani</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <p className="text-center text-gray-700 text-lg">
              Yang orang sanggup datang ke <strong>Kampung Baru</strong> & <strong>Shah Alam</strong>,<br className="hidden sm:block" />
              kini ada di <strong className="text-orange-600">Sungai Petani</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Order Quantities */}
      <section className="container mx-auto px-6 py-10 max-w-4xl">
        <div className="bg-gradient-to-br from-orange-100 to-red-50 rounded-3xl shadow-lg p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
            <UsersIcon className="w-8 h-8 text-orange-600" />
            <span className="text-gray-900">Pilih ikut jumlah</span>
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { qty: "10 orang", icon: "👥" },
              { qty: "50 orang", icon: "👨‍👩‍👧‍👦" },
              { qty: "100 orang", icon: "🏢" },
              { qty: "Sehingga 1000 orang", icon: "🎪" }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl py-4 px-3 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col items-center justify-center gap-2">
                  <span className="text-3xl">{item.icon}</span>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-gray-800">{item.qty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-700 font-medium">
            Jumlah lain boleh dipilih dalam app.
          </p>
        </div>
      </section>

      {/* Why Order Through App */}
      <section className="container mx-auto px-6 py-10 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
            <ClipboardDocumentListIcon className="w-8 h-8 text-orange-600" />
            <span className="text-gray-900">Kenapa perlu tempah melalui app?</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "✅", text: "Makanan dijamin", desc: "Kuantiti dan kualiti terjamin" },
              { icon: "⚡", text: "Tak perlu tunggu lama", desc: "Pre-order dan terus ambil" },
              { icon: "📍", text: "Terus ambil di tapak event", desc: "Show QR code dan ambil" },
              { icon: "🎯", text: "Sesuai untuk tempahan banyak", desc: "Dari 10 hingga 1000 orang" }
            ].map((item, index) => (
              <div key={index} className="flex gap-4 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors duration-300">
                <span className="text-4xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-bold text-gray-900 text-lg mb-1">{item.text}</p>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Poster Image */}
      <section className="container mx-auto px-6 py-10 max-w-4xl">
        <div className="relative w-full max-w-2xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-orange-200">
            <Image
              src="/images/event-poster.jpg"
              alt="Solo Event Nasi Paipon - 29 Jan hingga 1 Feb 2026 di Bandar Laguna Merbok, Sungai Petani"
              width={800}
              height={1100}
              className="w-full h-auto"
              priority
              onError={(e) => {
                // Fallback if image doesn't exist
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        </div>
      </section>

      {/* Jom Paipon Berjemaah */}
      <section className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            🍛 Jom Paipon Berjemaah! 🍛
          </h2>
          <p className="text-xl md:text-2xl font-semibold">
            29 Jan - 1 Feb 2026 | Sungai Petani
          </p>
        </div>
      </section>
    </main>
  )
}