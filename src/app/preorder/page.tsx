"use client";

import logo from "../../../assets/assets/NASI PAIPON.png";
import { useState, useEffect } from "react";
import {
  FiMapPin,
  FiClock,
  FiSmartphone,
  FiDownload,
  FiChevronUp,
} from "react-icons/fi";
import { MdStorefront } from "react-icons/md";
import { FaStar } from "react-icons/fa";

export default function PreorderPage() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getInstallUrl = () => {
    const APP_STORE_URL =
      "https://apps.apple.com/my/app/nasi-paipon/id6751135731";
    const PLAY_STORE_URL =
      "https://play.google.com/store/apps/details?id=app.nasipaipon.kitchen";

    const ua = navigator.userAgent || "";
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);

    if (isAndroid) return PLAY_STORE_URL;
    if (isIOS) return APP_STORE_URL;
    return APP_STORE_URL;
  };

  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const href = target.getAttribute("href") || "";

    if (href === "#" || href === "" || href === "#install-app") {
      e.preventDefault();
      const url = getInstallUrl();
      window.open(url, "_blank", "noopener");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col w-full text-white min-h-screen">
      {/* HERO - HEADER */}
      <section className="w-full py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 text-center">
          <div className="flex justify-center">
            <img width={250} src={logo.src} alt="Nasi Paipon Logo" />
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-white">
            Makanan Berbuka Puasa yang Menyelerakan
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl">
            Nasi panas, lauk padu, packing laju. Anda cuma pilih slot pickup
            dalam app — sampai, scan QR, ambil, jalan.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#makanan"
              className="btn sm:mt-5 mt-6 px-6 py-3 rounded-lg font-semibold text-center hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 bg-white text-black flex items-center justify-center gap-2"
            >
              LIHAT MENU
            </a>

            <a
              href="#install-app"
              onClick={handleCTAClick}
              className="btn sm:mt-5 mt-6 px-6 py-3 rounded-lg font-semibold text-center hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 bg-gray-600 text-white flex items-center justify-center gap-2"
            >
              <FiSmartphone size={20} /> INSTALL & BOOK SLOT
            </a>
          </div>
        </div>
      </section>

      {/* TARGET AUDIENCE */}
      <section className="w-full py-12 sm:py-16 px-4 bg-opacity-50 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-white">
            Nasi Paipon Khas Untuk Anda!
          </h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            Dari individu sibuk hingga program masjid - kami sediakan pilihan
            makanan berkualiti untuk semua golongan:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "Individu & Profesional",
                subtitle: "Yang Tiada Masa Masak",
                image: "/images/preorder/Picture1.png",
                imageAlt: "Individu & Profesional",
                items: [
                  "Bekerja sehingga waktu berbuka",
                  "Tinggal sendirian/bujang",
                  "Ingin berbuka dengan cepat & mudah",
                ],
              },
              {
                title: "Keluarga & Rumah Tangga",
                subtitle: "Yang Ingin Rehat Dari Dapur",
                image: "/images/preorder/Picture2.png",
                imageAlt: "Keluarga & Rumah Tangga",
                items: [
                  "Ingin berbuka tanpa stress masak",
                  "Nak rehat dari dapur sehari dua",
                  "Ada majlis kecil/kenduri rumah",
                ],
              },
              {
                title: "Komuniti & Organisasi",
                subtitle: "Yang Urus Program Ramadan",
                image: "/images/preorder/Picture3.png",
                imageAlt: "Komuniti & Organisasi",
                items: [
                  "AJK Masjid & Surau (program iftar)",
                  "Syarikat (buka puasa staff)",
                  "NGO & Persatuan (aktiviti komuniti)",
                ],
              },
            ].map((audience, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={audience.image}
                  alt={audience.imageAlt}
                  className="w-full h-44 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-2">
                    {audience.title}
                  </h3>
                  <p className="text-gray-600 font-semibold mb-4">
                    {audience.subtitle}
                  </p>
                  <ul className="space-y-2">
                    {audience.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-gray-700 flex items-start gap-2"
                      >
                        <span className="text-gray-600 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENU MAKANAN */}
      <section id="makanan" className="w-full py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-white">
            Pilihan Makanan Kami
          </h2>
          <p className="text-center text-gray-200 mb-12 max-w-2xl mx-auto">
            Pilih ikut keperluan anda — dan ingat: pickup di Seksyen 7 Shah Alam
            (scan QR bila ambil).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: "Untuk Makan Seorang",
                price: "RM 12.90 - RM 18.90",
                // TODO: Replace src with your own image path
                image: "/images/preorder/Picture4.png",
                imageAlt: "Nasi Paipon Seorang",
                items: [
                  "Nasi Paipon Ayam",
                  "Nasi Paipon Kambing",
                  "Nasi Paipon Lembu",
                  "Nasi Paipon Lamb Shank",
                ],
              },
              {
                title: "Untuk Buffet / Kenduri",
                price: "RM 25 - RM 35 / Pax",
                // TODO: Replace src with your own image path
                image: "/images/preorder/Picture5.png",
                imageAlt: "Buffet Kenduri",
                items: [
                  "Nasi Paipon + 3 Lauk Pilihan",
                  "Nasi Paipon + 2 Lauk",
                  "Nasi Paipon + Ayam & Kambing",
                  "Kuah Kambing Special",
                ],
              },
              {
                title: "Untuk Masjid / Surau",
                price: "Harga Istimewa",
                // TODO: Replace src with your own image path
                image: "/images/preorder/Picture6.png",
                imageAlt: "Paket Masjid Surau",
                items: [
                  "Paket Iftar Jamaah",
                  "Nasi + 2 Lauk Pilihan",
                  "Air + Paipon",
                  "Harga Borong (50pax ke atas)",
                ],
              },
            ].map((menu, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={menu.image}
                  alt={menu.imageAlt}
                  className="w-full h-44 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-2">
                    {menu.title}
                  </h3>
                  <p className="text-gray-600 font-semibold mb-4">
                    {menu.price}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {menu.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-gray-700 flex items-start gap-2"
                      >
                        <span className="text-gray-600 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#install-app"
                    onClick={handleCTAClick}
                    className="btn w-full px-4 py-3 rounded-lg font-semibold text-center hover:bg-opacity-90 transition-all duration-300 bg-gray-600 text-white"
                  >
                    BOOK SLOT & PICKUP
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* SPECIAL LAMB SHANK */}
          <div className="bg-white rounded-xl overflow-hidden border-2 border-gray-300">
            {/* TODO: Replace src with your own Lamb Shank image path */}
            <img
              src="/images/preorder/Picture7.png"
              alt="Special Lamb Shank"
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <h2 className="text-3xl font-bold text-black mb-4 flex items-center gap-2">
                <FaStar size={28} className="text-gray-600" /> Special Ramadan:
                Lamb Shank
              </h2>
              <p className="text-gray-600 text-lg font-semibold mb-4">
                Daging kambing lembut dengan kuah spesial rahsia keluarga
              </p>
              <p className="text-gray-700 mb-6">
                Lamb shank kami dimasak slow cooking dengan rempah ratus
                pilihan, hasilnya daging yang sangat lembut dan berperisa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="bg-gray-100 px-4 py-2 rounded">
                  <strong className="text-black">Seorang:</strong>{" "}
                  <span className="text-gray-600">RM 45.00</span>
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded">
                  <strong className="text-black">Buffet:</strong>{" "}
                  <span className="text-gray-600">RM 38.90 / pax</span>
                </div>
              </div>
              <a
                href="#install-app"
                onClick={handleCTAClick}
                className="btn px-6 py-3 rounded-lg font-semibold text-center hover:bg-opacity-90 transition-all duration-300 bg-gray-600 text-white inline-flex items-center gap-2"
              >
                BOOK SLOT & PICKUP (SHAH ALAM)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CARA TEMPAH */}
      <section
        id="cara-tempah"
        className="w-full py-12 sm:py-16 px-4 bg-opacity-50 bg-gray-900"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
            Cara Tempah (Hanya 1 Minit)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {[
              {
                num: 1,
                title: "Install App",
                desc: "Download dari App Store atau Google Play",
              },
              {
                num: 2,
                title: "Pilih Menu",
                desc: "Pilih apa yang anda nak makan",
              },
              { num: 3, title: "Pilih Slot", desc: "Slot pickup di Shah Alam" },
              {
                num: 4,
                title: "Bayar",
                desc: "Bayar dalam app & dapat QR code",
              },
              { num: 5, title: "Ambil", desc: "Datang ikut slot & scan QR" },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="text-3xl font-bold text-gray-600 mb-3">
                  {step.num}
                </div>
                <h3 className="font-bold text-black mb-2">{step.title}</h3>
                <p className="text-sm text-gray-700">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* APP DOWNLOAD */}
          <div
            id="install-app"
            className="bg-white rounded-xl p-8 text-center border-2 border-gray-300"
          >
            <h3 className="text-2xl font-bold text-black mb-2">
              INSTALL &amp; BOOK SLOT
            </h3>
            <p className="text-gray-600 mb-6">
              <strong>Pickup di Nasi Paipon Seksyen 7 Shah Alam</strong> • Scan
              QR semasa pickup
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a
                href="https://apps.apple.com/my/app/nasi-paipon/id6751135731"
                target="_blank"
                rel="noopener"
                className="flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-lg transition-all duration-300"
              >
                <i className="fab fa-apple text-2xl"></i>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="font-bold">App Store</div>
                </div>
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=app.nasipaipon.kitchen"
                target="_blank"
                rel="noopener"
                className="flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-lg transition-all duration-300"
              >
                <i className="fab fa-google-play text-2xl"></i>
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="font-bold">Google Play</div>
                </div>
              </a>
            </div>

            <a
              href="#"
              onClick={handleCTAClick}
              className="btn px-8 py-3 rounded-lg font-semibold text-center hover:bg-opacity-90 transition-all duration-300 bg-gray-600 text-white inline-flex items-center gap-2"
            >
              <FiDownload size={20} /> INSTALL (AUTO DETECT)
            </a>
          </div>
        </div>
      </section>

      {/* LOKASI */}
      <section id="lokasi" className="w-full py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
            Maklumat Lokasi & Slot Waktu
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-black mb-3 flex items-center gap-2">
                <FiMapPin size={24} className="text-gray-600" /> Pickup Area
              </h3>
              <p className="text-gray-600 font-semibold mb-3">
                Pickup di Shah Alam (Seksyen 7) sahaja
              </p>
              <p className="text-gray-700">
                Datang ikut slot dalam app supaya ambil laju & tak beratur
                panjang.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-black mb-3 flex items-center gap-2">
                <MdStorefront size={24} className="text-gray-600" /> Pickup
                Point
              </h3>
              <p className="font-semibold text-black mb-2">
                Nasi Paipon Shah Alam
              </p>
              <p className="text-gray-700 text-sm mb-4">
                Lot R15 D Anjung Avenue, Jalan Zirkon B7/B, Off, Jalan Tungsten
                7/23, Seksyen 7, 40000 Shah Alam, Selangor
              </p>
              <a
                href="#install-app"
                onClick={handleCTAClick}
                className="btn px-4 py-2 rounded-lg font-semibold text-center text-sm hover:bg-opacity-90 transition-all duration-300 bg-gray-600 text-white inline-block"
              >
                BOOK SLOT
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-black mb-3 flex items-center gap-2">
                <FiClock size={24} className="text-gray-600" /> Slot Waktu
                Ramadan
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                  <span className="text-gray-700">Berbuka Puasa</span>
                  <span className="text-gray-600 font-bold">
                    4:30 PM - 7:30 PM
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Moreh / Lewat Malam</span>
                  <span className="text-gray-600 font-bold">
                    9:00 PM – 11:30 PM
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-4">
                ⚠️ Tempah awal untuk elak kehabisan slot
              </p>
            </div>
          </div>

          {/* ADDRESS BOX */}
          <div className="bg-white rounded-xl p-8 border-l-4 border-gray-300">
            <h3 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <FiMapPin size={28} className="text-gray-600" /> Alamat Pickup
            </h3>
            <p className="font-semibold text-black mb-2">
              Nasi Paipon Shah Alam
            </p>
            <p className="text-gray-700">
              Lot R15 D Anjung Avenue, Jalan Zirkon B7/B, Off,
              <br />
              Jalan Tungsten 7/23, Seksyen 7,
              <br />
              40000 Shah Alam, Selangor
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-12 sm:py-16 px-4 bg-opacity-50 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
            Soalan Lazim (FAQ)
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Ini delivery ke?",
                a: "Bukan. Ini pickup di Nasi Paipon Seksyen 7 Shah Alam. Anda book slot dalam app & scan QR semasa pickup.",
              },
              {
                q: "Kalau saya terus datang walk-in tanpa order?",
                a: "Boleh, kalau order melalui apps anda datang tinggal pickup saja.",
              },
              {
                q: "QR code tu untuk apa?",
                a: "Lepas bayar, app bagi QR. Masa pickup, tunjuk QR → staff scan → terus ambil.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-gray-300"
              >
                <h3 className="text-lg font-bold text-black mb-3">
                  <span className="text-gray-600 mr-2">Q:</span> {faq.q}
                </h3>
                <p className="text-gray-700 ml-6">
                  <span className="text-gray-600 mr-2">A:</span> {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCROLL TO TOP BUTTON */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gray-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <FiChevronUp size={24} />
        </button>
      )}
    </div>
  );
}
