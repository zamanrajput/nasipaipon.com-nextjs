"use client"

import { useEffect } from "react"

export default function PreorderPage() {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        const targetId = target.getAttribute('href')
        if (targetId === '#') return
        
        const targetElement = document.querySelector(targetId as string)
        if (targetElement) {
          window.scrollTo({ 
            top: (targetElement as HTMLElement).offsetTop - 80, 
            behavior: 'smooth' 
          })
        }
      }
    }

    // Scroll to top button visibility
    const handleScroll = () => {
      const scrollTopBtn = document.getElementById('scrollTop')
      if (scrollTopBtn) {
        if (window.pageYOffset > 300) {
          scrollTopBtn.classList.add('visible')
        } else {
          scrollTopBtn.classList.remove('visible')
        }
      }

      // Sticky pickup bar
      const pickupBar = document.getElementById('pickupBar')
      if (pickupBar) {
        if (window.scrollY > 220) {
          pickupBar.classList.add('show')
        } else {
          pickupBar.classList.remove('show')
        }
      }
    }

    // Animation on scroll
    const observerOptions = { 
      threshold: 0.1, 
      rootMargin: '0px 0px -50px 0px' 
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.animationPlayState = 'running'
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Setup animation elements
    const animateElements = document.querySelectorAll('.animate-in')
    animateElements.forEach((el, index) => {
      const delay = (index % 3) * 0.2
      const htmlEl = el as HTMLElement
      htmlEl.style.animationDelay = `${delay}s`
      htmlEl.style.animationPlayState = 'paused'
      observer.observe(el)
    })

    // Add event listeners
    document.addEventListener('click', handleAnchorClick)
    window.addEventListener('scroll', handleScroll)

    const scrollTopBtn = document.getElementById('scrollTop')
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
    scrollTopBtn?.addEventListener('click', scrollToTop)

    // CTA button handlers
    const handleCtaClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement
      if (target.classList.contains('cta-install')) {
        const href = target.getAttribute('href') || ""
        const ctaName = target.getAttribute('data-cta') || "cta"
        
        if (href === "#" || href === "" || href === "#install-app") {
          e.preventDefault()
          const url = getInstallUrl()
          console.log("CTA clicked:", ctaName, "-> redirect:", url)
          window.open(url, "_blank", "noopener")
        }
      }
    }

    document.addEventListener('click', handleCtaClick)

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick)
      window.removeEventListener('scroll', handleScroll)
      scrollTopBtn?.removeEventListener('click', scrollToTop)
      document.removeEventListener('click', handleCtaClick)
      observer.disconnect()
    }
  }, [])

  const getInstallUrl = () => {
    const APP_STORE_URL = "https://apps.apple.com/my/app/nasi-paipon/id6751135731"
    const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=app.nasipaipon.kitchen"
    
    const ua = navigator.userAgent || ""
    const isAndroid = /Android/i.test(ua)
    const isIOS = /iPhone|iPad|iPod/i.test(ua)
    
    if (isAndroid) return PLAY_STORE_URL
    if (isIOS) return APP_STORE_URL
    return APP_STORE_URL
  }

  return (
    <>
      <style jsx global>{`
        /* RESET & BASE STYLES - TEMA RASTA */
        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --hijau-rasta: #006400;
          --hijau-muda: #228B22;
          --kuning-rasta: #FFD700;
          --kuning-terang: #FFEC8B;
          --merah-rasta: #8B0000;
          --merah-terang: #DC143C;
          --putih: #FFFFFF;
          --abu-muda: #F8F8F8;
          --abu: #666666;
          --abu-gelap: #333333;
          --border-radius: 15px;
          --shadow: 0 6px 15px rgba(0,0,0,0.1);
          --shadow-besar: 0 10px 30px rgba(0,0,0,0.15);
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          line-height: 1.6;
          color: var(--abu-gelap);
          background-color: var(--putih);
          font-size: 16px;
          overflow-x: hidden;
        }

        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        section { padding: 60px 0; }

        h1, h2, h3, h4 {
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 20px;
        }

        h1 { font-size: 2.5rem; color: var(--hijau-rasta); }

        h2 {
          font-size: 2rem;
          color: var(--hijau-rasta);
          text-align: center;
          position: relative;
          padding-bottom: 15px;
        }

        h2:after {
          content: '';
          position: absolute;
          width: 100px;
          height: 4px;
          background: linear-gradient(to right, var(--hijau-rasta), var(--kuning-rasta), var(--merah-rasta));
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 2px;
        }

        h3 { font-size: 1.5rem; margin-bottom: 15px; }

        p { margin-bottom: 15px; color: var(--abu); }

        .highlight { color: var(--merah-rasta); font-weight: 600; }
        .emoji { font-size: 1.5rem; margin-right: 8px; }

        /* BUTTON STYLES */
        .btn {
          display: inline-block;
          width: 100%;
          padding: 18px 24px;
          border-radius: var(--border-radius);
          font-weight: 700;
          font-size: 1.1rem;
          text-align: center;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 15px;
          box-shadow: var(--shadow);
        }

        .btn:hover { transform: translateY(-3px); box-shadow: var(--shadow-besar); }
        .btn-hijau { background-color: var(--hijau-rasta); color: var(--putih); }
        .btn-hijau:hover { background-color: var(--hijau-muda); }
        .btn-kuning { background-color: var(--kuning-rasta); color: var(--abu-gelap); }
        .btn-kuning:hover { background-color: var(--kuning-terang); }
        .btn-merah { background-color: var(--merah-rasta); color: var(--putih); }
        .btn-merah:hover { background-color: var(--merah-terang); }

        /* STICKY PICKUP BAR */
        .pickup-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 2000;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: rgba(0, 100, 0, 0.92);
          color: #fff;
          box-shadow: 0 6px 20px rgba(0,0,0,0.18);
          transform: translateY(-120%);
          transition: transform 0.25s ease;
          backdrop-filter: blur(8px);
        }
        .pickup-bar.show { transform: translateY(0); }
        .pickup-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255, 215, 0, 0.16);
          border: 1px solid rgba(255, 215, 0, 0.35);
          font-weight: 800;
          letter-spacing: 0.2px;
        }
        .pickup-bar a {
          color: #fff;
          text-decoration: underline;
          font-weight: 700;
          opacity: 0.95;
        }

        /* HERO SECTION */
        .hero {
          background: linear-gradient(135deg,
            rgba(0, 100, 0, 0.9) 0%,
            rgba(34, 139, 34, 0.8) 50%,
            rgba(255, 215, 0, 0.7) 100%);
          padding: 60px 0 75px;
          position: relative;
          overflow: hidden;
          color: var(--putih);
        }

        .hero::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: url('https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80');
          background-size: cover;
          background-position: center;
          opacity: 0.2;
          z-index: 0;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .logo {
          font-size: 3.2rem;
          font-weight: 800;
          margin-bottom: 12px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .logo span:nth-child(1) { color: var(--hijau-rasta); text-shadow: 0 0 10px rgba(0, 100, 0, 0.5); }
        .logo span:nth-child(2) { color: var(--kuning-rasta); text-shadow: 0 0 10px rgba(255, 215, 0, 0.5); }

        .tagline {
          font-size: 1.15rem;
          color: rgba(255, 255, 255, 0.92);
          margin-bottom: 18px;
          font-weight: 700;
        }

        .hero-badges {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin: 14px 0 18px;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 999px;
          font-weight: 800;
          letter-spacing: 0.2px;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(0,0,0,0.18);
          color: rgba(255,255,255,0.95);
        }
        .badge strong { color: var(--kuning-rasta); }
        .badge .dot {
          width: 9px; height: 9px; border-radius: 999px;
          background: var(--kuning-rasta);
          box-shadow: 0 0 12px rgba(255,215,0,0.55);
        }

        .hero-subcopy {
          max-width: 760px;
          margin: 0 auto;
          color: rgba(255,255,255,0.92);
          font-weight: 600;
        }

        .hero-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 520px;
          margin: 22px auto 0;
        }

        .cta-main {
          position: relative;
          overflow: hidden;
        }
        .cta-main small {
          display: block;
          font-weight: 700;
          opacity: 0.92;
          margin-top: 6px;
          font-size: 0.92rem;
        }

        /* TARGET AUDIENCE SECTION */
        .target-audience { background-color: var(--putih); padding: 60px 0; }
        .audience-intro { text-align: center; max-width: 800px; margin: 0 auto 40px; }
        .audience-intro h2 { color: var(--hijau-rasta); }

        .audience-grid { display: grid; grid-template-columns: 1fr; gap: 25px; margin-top: 30px; }
        @media (min-width: 768px) { .audience-grid { grid-template-columns: repeat(3, 1fr); } }

        .audience-card {
          background-color: var(--putih);
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: all 0.3s ease;
          border: 3px solid transparent;
        }
        .audience-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-besar); }
        .audience-card.seorang { border-color: var(--hijau-rasta); }
        .audience-card.family { border-color: var(--kuning-rasta); }
        .audience-card.community { border-color: var(--merah-rasta); }

        .audience-img { width: 100%; height: 200px; object-fit: cover; }
        .audience-content { padding: 25px; }
        .audience-title { display: flex; align-items: center; margin-bottom: 15px; }

        .audience-icon { font-size: 2rem; margin-right: 12px; }
        .seorang .audience-icon { color: var(--hijau-rasta); }
        .family .audience-icon { color: var(--kuning-rasta); }
        .community .audience-icon { color: var(--merah-rasta); }

        .audience-list { list-style-type: none; margin: 15px 0; }
        .audience-list li { margin-bottom: 10px; padding-left: 25px; position: relative; }
        .audience-list li:before { content: "✓"; position: absolute; left: 0; color: var(--hijau-rasta); font-weight: bold; }
        .family .audience-list li:before { color: var(--kuning-rasta); }
        .community .audience-list li:before { color: var(--merah-rasta); }

        /* MAKANAN SECTION */
        .makanan { background-color: var(--abu-muda); }

        .makanan-grid { display: grid; grid-template-columns: 1fr; gap: 25px; margin-top: 40px; }
        @media (min-width: 768px) { .makanan-grid { grid-template-columns: repeat(3, 1fr); } }

        .makanan-card {
          background-color: var(--putih);
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: all 0.3s ease;
          border: 3px solid transparent;
        }
        .makanan-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-besar); }
        .makanan-card.seorang { border-color: var(--hijau-rasta); }
        .makanan-card.buffet { border-color: var(--kuning-rasta); }
        .makanan-card.masjid { border-color: var(--merah-rasta); }

        .makanan-img { width: 100%; height: 200px; object-fit: cover; }
        .makanan-content { padding: 25px; }
        .makanan-title { display: flex; align-items: center; margin-bottom: 15px; }
        .makanan-icon { font-size: 2rem; margin-right: 12px; }
        .seorang .makanan-icon { color: var(--hijau-rasta); }
        .buffet .makanan-icon { color: var(--kuning-rasta); }
        .masjid .makanan-icon { color: var(--merah-rasta); }

        .makanan-list { list-style-type: none; margin: 15px 0; }
        .makanan-list li { margin-bottom: 10px; padding-left: 25px; position: relative; }
        .makanan-list li:before { content: "✓"; position: absolute; left: 0; color: var(--hijau-rasta); font-weight: bold; }
        .buffet .makanan-list li:before { color: var(--kuning-rasta); }
        .masjid .makanan-list li:before { color: var(--merah-rasta); }

        /* LAMB SHANK SPECIAL */
        .special-dish {
          background: linear-gradient(135deg,
            rgba(139, 0, 0, 0.1) 0%,
            rgba(255, 215, 0, 0.1) 50%,
            rgba(0, 100, 0, 0.1) 100%);
          border-radius: var(--border-radius);
          padding: 40px;
          margin-top: 50px;
          text-align: center;
          border: 3px dashed var(--kuning-rasta);
        }
        .special-content { display: flex; flex-direction: column; align-items: center; }
        @media (min-width: 768px) { .special-content { flex-direction: row; text-align: left; } }
        .special-img {
          width: 100%;
          max-width: 300px;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-besar);
          margin-bottom: 25px;
        }
        @media (min-width: 768px) { .special-img { margin-right: 40px; margin-bottom: 0; } }

        /* GALLERY SECTION */
        .gallery { background-color: var(--putih); padding: 60px 0; }
        .gallery-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-top: 30px; }
        @media (min-width: 768px) { .gallery-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; } }

        .gallery-item {
          border-radius: var(--border-radius);
          overflow: hidden;
          height: 200px;
          box-shadow: var(--shadow);
          transition: all 0.5s ease;
          position: relative;
        }
        .gallery-item:hover {
          transform: scale(1.05) rotate(3deg);
          box-shadow: 0 15px 40px rgba(0,0,0,0.25);
          z-index: 10;
        }
        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.5s ease;
        }
        .gallery-item:hover img {
          transform: scale(1.1);
          filter: brightness(1.1) saturate(1.2);
        }

        /* CARA TEMPAH SECTION */
        .steps { background-color: var(--abu-muda); }
        .steps-container { display: flex; flex-direction: column; gap: 30px; }
        @media (min-width: 768px) { .steps-container { flex-direction: row; flex-wrap: wrap; } }

        .step {
          display: flex;
          align-items: flex-start;
          background: var(--putih);
          border-radius: var(--border-radius);
          padding: 25px;
          box-shadow: var(--shadow);
        }
        .step-number {
          flex-shrink: 0;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, var(--hijau-rasta), var(--kuning-rasta));
          color: var(--putih);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.3rem;
          margin-right: 20px;
        }
        .step-content h3 { margin-bottom: 10px; color: var(--hijau-rasta); }

        .app-download {
          background-color: var(--putih);
          border-radius: var(--border-radius);
          padding: 30px;
          text-align: center;
          margin-top: 40px;
          box-shadow: var(--shadow);
          border: 3px solid var(--kuning-rasta);
        }

        .store-buttons {
          display: flex;
          flex-direction: column;
          gap: 15px;
          max-width: 300px;
          margin: 25px auto 0;
        }
        @media (min-width: 768px) {
          .store-buttons { flex-direction: row; justify-content: center; max-width: 500px; }
        }

        .store-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px 20px;
          background-color: var(--abu-gelap);
          color: var(--putih);
          border-radius: var(--border-radius);
          text-decoration: none;
          transition: all 0.3s ease;
          flex: 1;
          min-width: 200px;
        }
        .store-btn:hover { background-color: #555; transform: translateY(-3px); }
        .store-icon { font-size: 1.8rem; margin-right: 12px; }

        /* LOKASI SECTION */
        .lokasi { background-color: var(--putih); }

        .lokasi-grid { display: flex; flex-direction: column; gap: 25px; margin-top: 30px; }
        @media (min-width: 768px) { .lokasi-grid { flex-direction: row; } }

        .lokasi-card {
          background-color: var(--abu-muda);
          border-radius: var(--border-radius);
          padding: 25px;
          box-shadow: var(--shadow);
          flex: 1;
        }

        .slot-list { list-style-type: none; margin-top: 15px; }
        .slot-list li {
          padding: 10px 0;
          border-bottom: 1px solid rgba(0,0,0,0.1);
          display: flex;
          justify-content: space-between;
        }
        .slot-list li:last-child { border-bottom: none; }
        .slot-time { font-weight: 700; color: var(--hijau-rasta); }

        .alamat-box {
          background: linear-gradient(135deg,
            rgba(0, 100, 0, 0.05) 0%,
            rgba(255, 215, 0, 0.05) 100%);
          border-radius: var(--border-radius);
          padding: 25px;
          margin-top: 35px;
          border-left: 5px solid var(--hijau-rasta);
        }

        /* FAQ */
        .faq { background-color: var(--abu-muda); }
        .faq-container { max-width: 800px; margin: 0 auto; }
        .faq-item { border-bottom: 2px solid rgba(0, 100, 0, 0.1); padding: 25px 0; }
        .faq-item:last-child { border-bottom: none; }
        .faq-question {
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--hijau-rasta);
          display: flex;
          align-items: center;
        }
        .faq-question:before {
          content: "Q:";
          font-weight: 800;
          color: var(--merah-rasta);
          margin-right: 10px;
          font-size: 1.2rem;
        }

        /* FOOTER */
        footer {
          background: linear-gradient(135deg,
            var(--hijau-rasta) 0%,
            var(--kuning-rasta) 50%,
            var(--merah-rasta) 100%);
          color: var(--putih);
          padding: 60px 0 40px;
          text-align: center;
        }
        .footer-logo { font-size: 2.8rem; font-weight: 800; margin-bottom: 20px; }
        .footer-cta { display: flex; flex-direction: column; gap: 15px; max-width: 500px; margin: 30px auto; }
        @media (min-width: 768px) {
          .footer-cta { flex-direction: row; justify-content: center; }
          .footer-cta .btn { width: auto; padding: 18px 25px; margin: 0 8px; }
        }
        .footer-info {
          margin-top: 40px;
          padding-top: 30px;
          border-top: 2px solid rgba(255, 255, 255, 0.2);
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.9);
        }

        /* ANIMATIONS */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in { animation: fadeInUp 0.6s ease forwards; opacity: 0; }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }

        /* SCROLL TO TOP BUTTON */
        .scroll-top {
          position: fixed;
          bottom: 30px;
          right: 20px;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, var(--merah-rasta), var(--kuning-rasta));
          color: var(--putih);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          cursor: pointer;
          z-index: 1000;
          box-shadow: var(--shadow);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        .scroll-top.visible { opacity: 1; visibility: visible; }
        .scroll-top:hover { transform: translateY(-3px) scale(1.1); box-shadow: 0 8px 20px rgba(0,0,0,0.2); }

        /* RESPONSIVE */
        @media (min-width: 768px) {
          h1 { font-size: 3.2rem; }
          h2 { font-size: 2.5rem; }
          .hero-buttons { flex-direction: row; justify-content: center; }
          .hero-buttons .btn { width: auto; padding: 20px 35px; margin: 0 10px; }
        }
      `}</style>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      {/* STICKY PICKUP BAR */}
      <div className="pickup-bar" id="pickupBar">
        <span className="pickup-pill">
          <span className="dot"></span> Pickup: <strong>Seksyen 7 Shah Alam</strong>
        </span>
        <span style={{ opacity: 0.92 }}>Book slot dalam app • Scan QR • Ambil & balik</span>
        <a href="#lokasi">Lihat alamat</a>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="logo">
              <span>NASI</span>
              <span>PAIPON</span>
            </div>

            <p className="tagline">TEMPAH MELALUI APP • BULAN PUASA</p>

            <div className="hero-badges">
              <div className="badge">
                <span className="dot"></span> Pickup <strong>Seksyen 7 Shah Alam</strong> sahaja
              </div>
              <div className="badge">Book slot • Scan QR • Ambil & terus balik</div>
            </div>

            <h1>Makanan Berbuka Puasa yang Menyelerakan</h1>
            <p className="hero-subcopy">
              Nasi panas, lauk padu, packing laju. Anda cuma pilih slot pickup dalam app — sampai, scan QR, ambil, jalan.
            </p>

            <div className="hero-buttons">
              <a href="#makanan" className="btn btn-kuning animate-in delay-1">
                <span className="emoji">🍽️</span> LIHAT MENU
              </a>

              <a href="#install-app" className="btn btn-hijau cta-install cta-main animate-in" data-cta="hero-install">
                📲 INSTALL & BOOK SLOT (PICKUP SHAH ALAM)
                <small>📍 Seksyen 7 • Datang ikut slot • Scan QR</small>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TARGET AUDIENCE */}
      <section id="target-audience" className="target-audience">
        <div className="container">
          <div className="audience-intro">
            <h2>Nasi Paipon Khas Untuk Anda!</h2>
            <p>Dari individu sibuk hingga program masjid - kami sediakan pilihan makanan berkualiti untuk semua golongan:</p>
          </div>

          <div className="audience-grid">
            <div className="audience-card seorang animate-in">
              <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Nasi Paipon Ayam" className="audience-img" />
              <div className="audience-content">
                <div className="audience-title">
                  <div className="audience-icon"><i className="fas fa-user-tie"></i></div>
                  <div>
                    <h3>Individu & Profesional</h3>
                    <p className="highlight">Yang Tiada Masa Masak</p>
                  </div>
                </div>
                <p>Terbaik….untuk anda yang:</p>
                <ul className="audience-list">
                  <li>Bekerja sehingga waktu berbuka</li>
                  <li>Tinggal sendirian/bujang</li>
                  <li>Ingin berbuka dengan cepat & mudah</li>
                  <li>Tak sempat ke pasar Ramadan</li>
                  <li>Ingin makanan berkualiti untuk sendiri</li>
                </ul>
                <p><strong>Orang bujang, dan mereka yang tiada masa masak!</strong> Jom Paipon Berjemaah!!!</p>
              </div>
            </div>

            <div className="audience-card family animate-in delay-1">
              <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Keluarga & Rumah Tangga" className="audience-img" />
              <div className="audience-content">
                <div className="audience-title">
                  <div className="audience-icon"><i className="fas fa-home"></i></div>
                  <div>
                    <h3>Keluarga & Rumah Tangga</h3>
                    <p className="highlight">Yang Ingin Rehat Dari Dapur</p>
                  </div>
                </div>
                <p>Terbaik untuk keluarga yang:</p>
                <ul className="audience-list">
                  <li>Ingin berbuka tanpa stress masak</li>
                  <li>Nak rehat dari dapur sehari dua</li>
                  <li>Ada majlis kecil/kenduri rumah</li>
                  <li>Ingin pelbagaikan menu berbuka</li>
                  <li>Ada tetamu datang berkunjung</li>
                </ul>
                <p><strong>Rehatkan diri, biar Nasi Paipon uruskan berbuka anda.</strong></p>
              </div>
            </div>

            <div className="audience-card community animate-in delay-2">
              <img src="https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Komuniti & Organisasi" className="audience-img" />
              <div className="audience-content">
                <div className="audience-title">
                  <div className="audience-icon"><i className="fas fa-users"></i></div>
                  <div>
                    <h3>Komuniti & Organisasi</h3>
                    <p className="highlight">Yang Urus Program Ramadan</p>
                  </div>
                </div>
                <p>Terbaik untuk organisasi seperti:</p>
                <ul className="audience-list">
                  <li>AJK Masjid & Surau (program iftar)</li>
                  <li>Syarikat (buka puasa staff)</li>
                  <li>NGO & Persatuan (aktiviti komuniti)</li>
                  <li>Universiti/Kolej (program pelajar)</li>
                  <li>Kariah/RT (majlis kenduri)</li>
                </ul>
                <p><strong>Kami bantu urus katering program anda dengan mudah.</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery">
        <div className="container">
          <h2>Jom Paipon Berjemaah!!!</h2>
          <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 30px' }}>
            Kelainan rasanya sebabkan Nasi Paipon pilihan utama untuk berbuka.
          </p>

          <div className="gallery-grid">
            {[
              'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
              'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
              'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
              'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
              'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
              'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
              'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
              'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            ].map((src, index) => (
              <div key={index} className={`gallery-item animate-in ${index % 3 === 1 ? 'delay-1' : index % 3 === 2 ? 'delay-2' : ''}`}>
                <img src={src} alt={`Gallery ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAKANAN */}
      <section id="makanan" className="makanan">
        <div className="container">
          <h2>Pilihan Makanan Kami</h2>
          <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 30px' }}>
            Pilih ikut keperluan anda — dan ingat: <span className="highlight">pickup di Seksyen 7 Shah Alam</span> (scan QR bila ambil).
          </p>

          <div className="makanan-grid">
            <div className="makanan-card seorang animate-in">
              <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Makanan untuk seorang" className="makanan-img" />
              <div className="makanan-content">
                <div className="makanan-title">
                  <div className="makanan-icon"><i className="fas fa-user"></i></div>
                  <div>
                    <h3>Untuk Makan Seorang</h3>
                    <p className="highlight">RM 12.90 - RM 18.90</p>
                  </div>
                </div>
                <p>Sempurna untuk individu atau pasangan yang ingin berbuka dengan makanan berkualiti.</p>
                <ul className="makanan-list">
                  <li>Nasi Paipon Ayam</li>
                  <li>Nasi Paipon Kambing</li>
                  <li>Nasi Paipon Lembu</li>
                  <li>Nasi Paipon Lamb Shank</li>
                </ul>
                <a href="#install-app" className="btn btn-hijau cta-install" data-cta="order-seorang">BOOK SLOT & PICKUP (SHAH ALAM)</a>
              </div>
            </div>

            <div className="makanan-card buffet animate-in delay-1">
              <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Buffet makanan" className="makanan-img" />
              <div className="makanan-content">
                <div className="makanan-title">
                  <div className="makanan-icon"><i className="fas fa-utensils"></i></div>
                  <div>
                    <h3>Untuk Buffet / Kenduri</h3>
                    <p className="highlight">RM 25 - RM 35 / Pax</p>
                  </div>
                </div>
                <p>Pilihan terbaik untuk majlis kenduri, jamuan pejabat, atau acara keluarga besar.</p>
                <ul className="makanan-list">
                  <li>Nasi Paipon + 3 Lauk Pilihan</li>
                  <li>Nasi Paipon + 2 Lauk</li>
                  <li>Nasi Paipon + Ayam & Kambing</li>
                  <li>Kuah Kambing Special</li>
                  <li>Air Sirap, Paipon & Dessert</li>
                </ul>
                <a href="#install-app" className="btn btn-kuning cta-install" data-cta="order-buffet">BOOK SLOT & PICKUP (SHAH ALAM)</a>
              </div>
            </div>

            <div className="makanan-card masjid animate-in delay-2">
              <img src="https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Makanan untuk masjid" className="makanan-img" />
              <div className="makanan-content">
                <div className="makanan-title">
                  <div className="makanan-icon"><i className="fas fa-mosque"></i></div>
                  <div>
                    <h3>Untuk Masjid / Surau</h3>
                    <p className="highlight">Harga Istimewa</p>
                  </div>
                </div>
                <p>Khidmat katering khusus untuk program berbuka puasa di masjid dan surau.</p>
                <ul className="makanan-list">
                  <li>Paket Iftar Jamaah</li>
                  <li>Nasi + 2 Lauk Pilihan</li>
                  <li>Air + Paipon</li>
                  <li>Harga Borong (50pax ke atas)</li>
                  <li>Penghantaran ke Lokasi</li>
                </ul>
                <a href="#install-app" className="btn btn-merah cta-install" data-cta="order-masjid">INSTALL & BOOK SLOT (SHAH ALAM)</a>
              </div>
            </div>
          </div>

          <div className="special-dish animate-in">
            <div className="special-content">
              <img src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Lamb Shank Special" className="special-img" />
              <div>
                <h2><span className="emoji">🌟</span> Special Ramadan: Lamb Shank</h2>
                <p className="highlight" style={{ fontSize: '1.3rem' }}>Daging kambing lembut dengan kuah spesial rahsia keluarga</p>
                <p>Lamb shank kami dimasak slow cooking dengan rempah ratus pilihan, hasilnya daging yang sangat lembut dan berperisa.</p>
                <div style={{ display: 'flex', gap: '15px', marginTop: '20px', flexWrap: 'wrap' }}>
                  <div style={{ background: 'var(--hijau-rasta)', color: 'white', padding: '10px 20px', borderRadius: 'var(--border-radius)' }}>
                    <strong>Seorang:</strong> RM 45.00
                  </div>
                  <div style={{ background: 'var(--kuning-rasta)', color: 'var(--abu-gelap)', padding: '10px 20px', borderRadius: 'var(--border-radius)' }}>
                    <strong>Buffet:</strong> RM 38.90 / pax
                  </div>
                </div>
                <a href="#install-app" className="btn btn-merah cta-install" data-cta="lamb-shank" style={{ marginTop: '25px', maxWidth: '320px' }}>
                  <span className="emoji">🍖</span> BOOK SLOT & PICKUP (SHAH ALAM)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CARA TEMPAH */}
      <section id="cara-tempah" className="steps">
        <div className="container">
          <h2>Cara Tempah (Hanya 1 Minit)</h2>

          <div className="steps-container">
            {[
              { title: 'Install App Nasi Paipon', desc: 'Download app dari App Store atau Google Play' },
              { title: 'Pilih Menu & Kuantiti', desc: 'Pilih apa yang anda nak makan (yang penting: cepat & padu)' },
              { title: 'Pilih Slot Pickup (Shah Alam)', desc: 'Slot ikut masa — ini yang buat pickup lancar & tak serabut' },
              { title: 'Bayar Dalam App', desc: 'Selesai bayar → anda dapat QR code' },
              { title: 'Datang & Scan QR', desc: 'Sampai ikut slot → tunjuk QR → ambil makanan panas' }
            ].map((step, index) => (
              <div key={index} className={`step animate-in ${index % 2 === 1 ? 'delay-1' : index > 2 ? 'delay-2' : ''}`}>
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div id="install-app" className="app-download animate-in delay-2">
            <h3>INSTALL & BOOK SLOT (PICKUP SHAH ALAM)</h3>
            <p><strong>Pickup di Nasi Paipon Seksyen 7 Shah Alam</strong> • Scan QR semasa pickup</p>

            <div className="store-buttons">
              <a href="https://apps.apple.com/my/app/nasi-paipon/id6751135731" className="store-btn" target="_blank" rel="noopener">
                <i className="fab fa-apple store-icon"></i>
                <div>
                  <div style={{ fontSize: '0.9rem' }}>Download on the</div>
                  <div style={{ fontWeight: '700' }}>App Store</div>
                </div>
              </a>

              <a href="https://play.google.com/store/apps/details?id=app.nasipaipon.kitchen" className="store-btn" target="_blank" rel="noopener">
                <i className="fab fa-google-play store-icon"></i>
                <div>
                  <div style={{ fontSize: '0.9rem' }}>Get it on</div>
                  <div style={{ fontWeight: '700' }}>Google Play</div>
                </div>
              </a>
            </div>

            <a href="#" className="btn btn-hijau cta-install" data-cta="install-auto" style={{ maxWidth: '420px', margin: '25px auto 0' }}>
              <i className="fas fa-download"></i> INSTALL (AUTO DETECT)
            </a>
          </div>
        </div>
      </section>

      {/* LOKASI */}
      <section className="lokasi" id="lokasi">
        <div className="container">
          <h2>Maklumat Lokasi & Slot Waktu</h2>

          <div className="lokasi-grid">
            <div className="lokasi-card animate-in">
              <h3><i className="fas fa-map-marked-alt"></i> Pickup Area</h3>
              <p className="highlight">Pickup di Shah Alam (Seksyen 7) sahaja</p>
              <p>Datang ikut slot dalam app supaya ambil laju & tak beratur panjang.</p>
            </div>

            <div className="lokasi-card animate-in delay-1">
              <h3><i className="fas fa-store"></i> Pickup Point</h3>
              <p><strong>Nasi Paipon Shah Alam</strong></p>
              <p>Lot R15 D Anjung Avenue, Jalan Zirkon B7/B, Off, Jalan Tungsten 7/23,<br /> Seksyen 7, 40000 Shah Alam, Selangor</p>

              <a href="#install-app" className="btn btn-kuning cta-install" data-cta="outlets" style={{ marginTop: '15px' }}>INSTALL & BOOK SLOT (PICKUP SHAH ALAM)</a>
            </div>

            <div className="lokasi-card animate-in delay-2">
              <h3><i className="fas fa-clock"></i> Slot Waktu Ramadan</h3>
              <ul className="slot-list">
                <li><span>Berbuka Puasa</span><span className="slot-time">4:30 PM - 7:30 PM</span></li>
                <li><span>Moreh / Lewat Malam</span><span className="slot-time">9:00 PM – 11:30 PM</span></li>
              </ul>
              <p style={{ marginTop: '15px', fontSize: '0.9rem' }}><i>Tempah awal untuk elak kehabisan slot</i></p>
            </div>
          </div>

          <div className="alamat-box animate-in">
            <h3><i className="fas fa-map-pin"></i> Alamat Pickup</h3>
            <p><strong>Nasi Paipon Shah Alam</strong><br />
              Lot R15 D Anjung Avenue, Jalan Zirkon B7/B, Off,<br />
              Jalan Tungsten 7/23, Seksyen 7,<br />
              40000 Shah Alam, Selangor</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="container">
          <h2>Soalan Lazim (FAQ)</h2>

          <div className="faq-container">
            {[
              { 
                q: 'Ini delivery ke?', 
                a: 'Bukan. Ini pickup di Nasi Paipon Seksyen 7 Shah Alam. Anda book slot dalam app & scan QR semasa pickup. Anda boleh pickup sendiri atau guna delivery service utk pickup' 
              },
              { 
                q: 'Kalau saya terus datang walk-in tanpa order melalui apps Nasi Paipon?', 
                a: 'Boleh, kalau order melalui apps anda datang tinggal pickup saja.' 
              },
              { 
                q: 'QR code tu untuk apa?', 
                a: 'Lepas bayar, app bagi QR. Masa pickup, tunjuk QR → staff scan → terus ambil.' 
              }
            ].map((faq, index) => (
              <div key={index} className={`faq-item animate-in ${index === 1 ? 'delay-1' : index === 2 ? 'delay-2' : ''}`}>
                <div className="faq-question">{faq.q}</div>
                <div className="faq-answer">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-logo">NASI PAIPON</div>
          <h2>Berbuka Puasa dengan Makanan Berkualiti</h2>
          <p style={{ maxWidth: '800px', margin: '0 auto 30px', color: 'rgba(255,255,255,0.9)' }}>
            Book slot dalam app • Pickup Seksyen 7 Shah Alam • Scan QR • Ambil & makan panas
          </p>

          <div className="footer-cta">
            <a href="#install-app" className="btn btn-hijau cta-install" data-cta="footer-install">
              📲 INSTALL & BOOK SLOT (PICKUP SHAH ALAM)
            </a>
            <a href="#makanan" className="btn btn-kuning">LIHAT MENU</a>
          </div>

          <div className="footer-info">
            <p>© 2024 Nasi Paipon. Semua tempahan dibuat melalui App Nasi Paipon.</p>
          </div>
        </div>
      </footer>

      {/* SCROLL TO TOP BUTTON */}
      <div className="scroll-top" id="scrollTop">
        <i className="fas fa-chevron-up"></i>
      </div>
    </>
  )
}