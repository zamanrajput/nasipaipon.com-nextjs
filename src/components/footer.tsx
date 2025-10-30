"use client";

import { useRouter } from "next/navigation";

export default function AppFooter() {
  const router = useRouter();

  return (
    <footer className="footer mt-72 cardbg text-white flex sm:flex-row flex-col w-full items-center gap-2 sm:justify-around py-3 sm:text-base text-xs">
      <div className="opacity-80">
        Copyright © {new Date().getFullYear()} Nasi Paipon - All Rights Reserved.
      </div>

      <div
        onClick={() => router.push("/pages/privacy")}
        className="opacity-80 cursor-pointer hover:underline"
      >
        Privacy Policy
      </div>

      <div className="opacity-80">
        Powered by <span className="font-semibold"><a href="https://corelogicsolutions.pk">CoreLogic Solutions</a></span>
      </div>
    </footer>
  );
}
