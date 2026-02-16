'use client'
import React, { useEffect, useState } from "react";
import logo from "../../../../assets/assets/logo (3).png";
import app1 from "../../../../assets/assets/app/S2.png";
import app2 from "../../../../assets/assets/app/S1.png";
import app3 from "../../../../assets/assets/app/S3.png";
import app4 from "../../../../assets/assets/app/s4.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=app.nasipaipon.kitchen&hl=ms";
const APP_STORE_URL = "https://apps.apple.com/my/app/nasi-paipon/id6751135731";

type Platform = "ios" | "android" | "unknown";

function detectPlatform(): Platform {
  if (typeof window === "undefined") return "unknown";

  const userAgent = navigator.userAgent || navigator.vendor || "";
  const platform = navigator.platform || "";

  // Check for iOS devices (iPhone, iPad, iPod)
  if (/iPhone|iPad|iPod/.test(userAgent)) {
    return "ios";
  }

  // Check for macOS
  if (/Mac/.test(platform) || /Macintosh/.test(userAgent)) {
    return "ios";
  }

  // Check for Android
  if (/Android/.test(userAgent)) {
    return "android";
  }

  // Check for Windows - redirect to Play Store
  if (/Win/.test(platform) || /Windows/.test(userAgent)) {
    return "android";
  }

  // Default to Android/Play Store for unknown platforms
  return "android";
}

const Page = () => {
  const router = useRouter();
  const [platform, setPlatform] = useState<Platform>("unknown");

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const handleDownload = () => {
    const url = platform === "ios" ? APP_STORE_URL : PLAY_STORE_URL;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const buttonText = platform === "ios" ? "Download on App Store" : "Download on Play Store";

  return (
    <div className="bg-opacity-30 overflow-x-hidden">

      <div className="flex sm:flex-row flex-col justify-around sm:ms-20 gap-6 mt-28 text-white">
        <div className="sm:w-[45vw] text-center w-[95vw] flex flex-col gap-10 sm:pt-28 pt-14">
          <h1 className="sm:text-4xl text-3xl text-pretty text-start font-bold">Welcome to Nasi Paipon! Your Go-To Food Ordering App for Large Gatherings</h1>
          <button
            type="button"
            onClick={handleDownload}
            className="bg-red-600 hover:bg-red-700 transition-colors w-fit sm:px-8 px-6 rounded-md sm:py-4 py-3 mx-auto text-2xl sm:text-3xl text-white cursor-pointer"
          >
            {buttonText}
          </button>
          <div className="text-2xl text-opacity-70 text-pretty">
            <h1 className="text-3xl my-5">Quality Verified</h1>
            Our foods are 100% premium, quality-checked by multiple
            standards. Each batch is carefully inspected to ensure exceptional
            flavor and consistency, so you can enjoy every serving with
            confidence!
          </div>
        </div>
        <div className="sm:w-[45vw] w-[100vw] scale-150 sm:scale-100 sm:my-0 my-20">
          <img
            src={app1.src || "/placeholder.svg"}
            alt="mobile img"
          />
        </div>
      </div>

      <div className="text-center text-[22px] text-white my-28 mx-5">
        <h1 className="my-7 text-4xl">Nasi Paipon App</h1>
        <div>
          Cook for large gatherings effortlessly with high-capacity rice and
          biryani makers. Designed for bulk orders, these machines deliver
          consistent quality, flavor, and efficiency, making every serving
          perfect for high-demand settings.
        </div>
      </div>

      <div className="pt-10 bg-gradient-to-br from-green-500 to-green-300 sm:h-[80dvh] h-[60vh] sm:w-[55dvw] w-[90vw] m-auto rounded-lg my-10 overflow-hidden">
        <h1 className="sm:text-5xl text-3xl text-center px-6">Best Bulk Food Makers in whole town</h1>
        <div className="text-center sm:text-2xl text-xl my-5">
          Get all your party bookings now on Applications
        </div>
        <Image
          src={app2 || "/placeholder.svg"}
          alt="photo1"
          className="h-[100%] sm:w-[35dvw] w-[100%] m-auto rounded-xl"
        />
      </div>

      <div className="pt-10 bg-gradient-to-br from-yellow-500 to-yellow-300 sm:h-[80dvh] h-[60vh] sm:w-[55dvw] w-[90vw] m-auto rounded-lg my-10 overflow-hidden">
        <h1 className="sm:text-5xl text-3xl text-center">Radius and Location Based Search</h1>
        <div className="text-center sm:text-2xl text-xl my-5">
        Find exactly what you need, where you need it with precise radius and location-based search.
        </div>
        <Image
          src={app3 || "/placeholder.svg"}
          alt="photo1"
          className="h-[100%] sm:w-[35dvw] w-[100%] m-auto rounded-xl"
        />
      </div>

      <div className="pt-10 bg-gradient-to-br from-red-500 to-red-300 sm:h-[80dvh] h-[60vh] sm:w-[55dvw] w-[90vw] m-auto rounded-lg my-10 overflow-hidden">
        <h1 className="sm:text-5xl text-3xl text-center">Your Complete Order Details</h1>
        <div className="text-center sm:text-2xl text-xl my-5">
        Review all order information and details. 
        </div>
        <Image
          src={app4 || "/placeholder.svg"}
          alt="photo1"
          className="h-[100%] sm:w-[35dvw] w-[100%] m-auto rounded-xl"
        />
      </div>

      <div className="sm:px-60 px-5 m-auto pb-20 backdrop-blur-md text-gray-300">
        <div className="py-16">
          <Image src={logo || "/placeholder.svg"} alt="logo" className="m-auto w-56 rounded-md drop-shadow-2xl" />
        </div>
        <div className="text-center text-5xl font-bold mb-20 text-white">About Nasi Paipon</div>
        <div className="doc">
          {
            "Nasi Paipon is the ultimate food ordering platform designed for those who need to place bulk orders from trusted Nasi Paipon vendors. Whether it's a wedding, birthday, office party, mosque gathering, or any special event, Nasi Paipon is here to make catering easier than ever."
          }
          <h1 className="text-xl mt-5 mb-2 font-bold text-white">Why Choose Nasi Paipon?</h1>
          {
            "With Nasi Paipon, you can effortlessly order food in large quantities from a diverse range of vendors – including restaurants, caterers, food stalls, and even home-based food providers. "
          }
          <h1 className="text-xl mt-5 mb-2 font-bold text-white">Effortless Pickup with QR Code</h1>
          {
            "Although Nasi Paipon doesn't directly offer delivery services, we make pickups a breeze. After you place an order, you'll receive a QR code that you can show to the vendor. Once the vendor scans your QR code, they can easily view the details of your order, ensuring a quick and accurate handover. You can choose to pick up the food yourself or arrange a delivery service to collect it."
          }
          <h1 className="text-xl mt-5 mb-2 font-bold text-white">Unmatched Convenience for Big Events</h1>
          {
            "There's no platform like Nasi Paipon in the market today for placing bulk food orders. Now you can streamline your food ordering process for large events with a few taps."
          }
          <h1 className="text-xl mt-5 mb-2 font-bold text-white">{"Perfect for:"}</h1>
         <b> Anyone planning a large gathering:</b> weddings, birthdays, prayer
          gatherings, office meals, and more. <br /> <b>Event organizers</b> who need a
          reliable source for food in large quantities. <br />{"Experience the convenience of bulk food ordering with Nasi Paipon – simplifying catering for your special events!"}
        </div>
      </div>

      <div className="footer cardbg text-white flex sm:flex-row flex-col w-screen items-center gap-2 sm:justify-around py-3 sm:text-base text-xs">
        <div className="opacity-80">
          {"Copyright © 2023 Nasi Paipon - All Rights Reserved."}
        </div>
        <div onClick={()=>router.push('/pages/download')} className="opacity-80">Privacy Policy</div>
        <div className="opacity-80">
          Powered by Revolution Software Pakistan
        </div>
      </div>
    </div>
  );
};

export default Page;
