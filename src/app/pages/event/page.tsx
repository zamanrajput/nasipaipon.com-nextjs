import Image from "next/image"
import type { Metadata } from "next"
import { EventCtaButton } from "@/components/event-cta-button"
import {
  CalendarDaysIcon,
  MapPinIcon,
  UsersIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline"

export const metadata: Metadata = {
  title: "Solo Event Nasi Paipon - 29 Jan - 1 Feb 2026 | Sungai Petani",
  description:
    "Jom Paipon Berjemaah! Solo Event Nasi Paipon di Bandar Laguna Merbok, Sungai Petani. 29 Jan - 1 Feb 2026. ORDER NOW melalui app & pre-order segera!",
}

export default function EventPage() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] flex flex-col mt-[60px] text-white font-sans">
      {/* Hero Section */}
      <section className="px-6 py-12 text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
          Nak Nasi Paipon? <br /> <span className="text-yellow-400">Book dulu.</span>
        </h1>
        <p className="text-lg text-gray-300">
          Tempahan <strong>take away</strong> dibuat melalui{" "}
          <span className="text-yellow-400">App Nasi Paipon</span>.
        </p>
      </section>

      {/* Event Info */}
      <section className="px-6 py-8 text-center bg-[#1a1a1a] rounded-lg max-w-2xl mx-auto space-y-3 shadow-lg">
        <div className="flex items-center justify-center gap-2 text-xl font-semibold">
          <CalendarDaysIcon className="w-6 h-6 text-yellow-400" />
          29, 30, 31 Jan & 1 Feb 2026
        </div>
        <div className="flex items-center justify-center gap-2 text-xl font-semibold">
          <MapPinIcon className="w-6 h-6 text-yellow-400" />
          Bandar Laguna Merbok, Sungai Petani
        </div>
        <p className="text-gray-400 text-sm">
          Yang orang sanggup datang ke Kampung Baru & Shah Alam, kini ada di Sungai Petani.
        </p>
      </section>

      {/* Order Quantities */}
      <section className="px-6 py-10 text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <UsersIcon className="w-7 h-7 text-yellow-400" /> Pilih ikut jumlah
        </h2>
        <div className="grid grid-cols-2 gap-4 text-gray-300">
          <span className="bg-[#1a1a1a] rounded-lg py-3 flex items-center justify-center gap-2">
            <CheckCircleIcon className="w-5 h-5 text-green-400" /> 10 orang
          </span>
          <span className="bg-[#1a1a1a] rounded-lg py-3 flex items-center justify-center gap-2">
            <CheckCircleIcon className="w-5 h-5 text-green-400" /> 50 orang
          </span>
          <span className="bg-[#1a1a1a] rounded-lg py-3 flex items-center justify-center gap-2">
            <CheckCircleIcon className="w-5 h-5 text-green-400" /> 100 orang
          </span>
          <span className="bg-[#1a1a1a] rounded-lg py-3 flex items-center justify-center gap-2">
            <CheckCircleIcon className="w-5 h-5 text-green-400" /> Sehingga 1000 orang
          </span>
        </div>
        <p className="text-sm text-gray-400">Jumlah lain boleh dipilih dalam app.</p>
      </section>

      {/* Why Order Through App */}
      <section className="px-6 py-10 text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <ClipboardDocumentListIcon className="w-7 h-7 text-yellow-400" /> Kenapa perlu tempah melalui app?
        </h2>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-center justify-center gap-2">
            <CheckCircleIcon className="w-5 h-5 text-green-400" /> Makanan dijamin
          </li>
          <li className="flex items-center justify-center gap-2">
            <CheckCircleIcon className="w-5 h-5 text-green-400" /> Tak perlu tunggu lama
          </li>
          <li className="flex items-center justify-center gap-2">
            <CheckCircleIcon className="w-5 h-5 text-green-400" /> Terus ambil di tapak event
          </li>
          <li className="flex items-center justify-center gap-2">
            <CheckCircleIcon className="w-5 h-5 text-green-400" /> Sesuai untuk tempahan banyak
          </li>
        </ul>
      </section>

      {/* Poster Image */}
      <div className="relative w-full flex-1 flex items-center justify-center p-6">
        <div className="relative w-full max-w-lg mx-auto">
          <Image
            src="/images/event-poster.jpg"
            alt="Solo Event Nasi Paipon - 29 Jan hingga 1 Feb 2026 di Bandar Laguna Merbok, Sungai Petani"
            width={800}
            height={1100}
            className="w-full h-auto rounded-xl shadow-2xl border border-gray-700"
            priority
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="sticky bottom-0 w-full bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f] to-transparent pt-8 pb-6 px-4">
        <div className="max-w-lg mx-auto space-y-4">
          {/* Updated CTA Button */}
          <EventCtaButton  />
          <p className="text-center text-gray-400 text-sm">
            Ambil masa kurang 1 minit. Tempah awal, elak beratur panjang!
          </p>
          <p className="text-center text-gray-500 text-xs">
            Walk-in bergantung kepada baki stok pada hari tersebut.
          </p>
        </div>
      </div>
    </main>
  )
}