"use client";
import React from "react";

const email = "contact@nasipaipon.com";
const whatsapp = "601155274797"; // no + sign, no spaces

const Page = () => {
  return (
    <div className="overflow-x-hidden">
      <div className="w-screen backdrop-blur-sm text-white py-10 sm:pt-20 pt-28">
        
        <div className="text-5xl font-bold text-shadow-custom2 text-center my-10">
          CONTACT US
        </div>

        <div className="flex sm:flex-row flex-col gap-14 justify-center my-16">

          {/* Contact Methods */}
          <div className="sm:w-[35vw] w-[100vw] px-6 sm:px-0 text-center sm:text-start">
            
            <h1 className="text-2xl font-semibold mb-6">
              Get in Touch
            </h1>

            <p className="opacity-80 mb-10">
              Have questions, catering requests, or business inquiries?
              Reach out to us directly via WhatsApp or email.
            </p>

            {/* WhatsApp */}
            <div className="mb-6">
              <p className="text-lg font-medium">WhatsApp</p>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                className="opacity-80 hover:opacity-100 transition"
              >
                +6011 5527 4797
              </a>
            </div>

            {/* Email */}
            <div className="mb-6">
              <p className="text-lg font-medium">Email</p>
              <a
                href={`mailto:${email}`}
                className="opacity-80 hover:opacity-100 transition"
              >
                {email}
              </a>
            </div>
          </div>

          {/* Address Section */}
          <div className="side sm:w-[35vw] w-[100vw] sm:text-start px-5 sm:px-0 text-center">
            
            <h1 className="text-2xl font-semibold mb-6">Our Locations</h1>

            <p className="text-lg">Sales Stall</p>
            <p className="opacity-80">
              Jalan 5/4C Desa Melawati Kuala Lumpur, 53100 Kuala Lumpur
            </p>
            <a
              className="text-blue-500 underline cursor-pointer"
              href="https://maps.app.goo.gl/N2TpjEFDW8Uogun16?g_st=ac"
              target="_blank"
            >
              View on Map
            </a>

            <br /><br />

            <p className="text-lg">Central Kitchen</p>
            <p className="opacity-80">
              NO 6 JALAN WAWASAN CAMPURAN, BANDAR BARU AMPANG,
              68000 AMPANG, SELANGOR
            </p>
            <a
              className="text-blue-500 underline cursor-pointer"
              href="https://maps.app.goo.gl/gsB5mNHciFbz73vc8"
              target="_blank"
            >
              View on Map
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
