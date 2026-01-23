import Image from "next/image"
import type { Metadata } from "next"
import { EventCtaButton } from "@/components/event-cta-button"

export const metadata: Metadata = {
  title: "Solo Event Nasi Paipon - 29 Jan - 1 Feb 2026 | Sungai Petani",
  description:
    "Jom Paipon Berjemaah! Solo Event Nasi Paipon di Spacious Event Space, Bandar Laguna Merbok, Sungai Petani. 29 Jan - 1 Feb 2026. Download app sekarang!",
}

export default function EventPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] flex flex-col">
      {/* Full Image Section */}
      <div className="relative w-full flex-1 flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg mx-auto">
          <Image
            src="/images/event-poster.jpg"
            alt="Solo Event Nasi Paipon - 29 Jan hingga 1 Feb 2026 di Spacious Event Space, Bandar Laguna Merbok, Sungai Petani"
            width={800}
            height={1100}
            className="w-full h-auto rounded-lg shadow-2xl"
            priority
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="sticky bottom-0 w-full bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a] to-transparent pt-8 pb-6 px-4">
        <div className="max-w-lg mx-auto space-y-4">
          {/* Platform-aware CTA Button */}
          <EventCtaButton />

          {/* Secondary Info */}
          <p className="text-center text-gray-400 text-sm">
            Tempah awal, elak beratur panjang!
          </p>
        </div>
      </div>
    </main>
  )
}
