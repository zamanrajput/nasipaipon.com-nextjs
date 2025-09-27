"use client";

import React from "react";

const SupportPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Nasi Paipon Support</h1>
      <p className="text-center text-gray-700 mb-8">
        Need help? Our support team is here for you! Choose one of the options below:
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Email Support */}
        <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center">
          <h2 className="text-xl font-semibold mb-2">Email Support</h2>
          <p className="text-gray-600 mb-4">
            Reach out to us via email for any questions, feedback, or assistance.
          </p>
          <a
            href="mailto:usersupport@nasipaipon.com"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Email Us
          </a>
        </div>

        {/* WhatsApp Support */}
        <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center">
          <h2 className="text-xl font-semibold mb-2">WhatsApp Support</h2>
          <p className="text-gray-600 mb-4">
            Chat with our support team directly on WhatsApp for quick help.
          </p>
          <a
            href="https://wa.me/60163620784"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
