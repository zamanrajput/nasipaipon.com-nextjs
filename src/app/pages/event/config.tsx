// Configuration file for Nasi Paipon
export const CONFIG = {
  // WhatsApp Configuration
  whatsapp: {
    number: "+601155274797", // Format for WhatsApp API (no + symbol, no spaces or dashes)
    displayNumber: "+60 11-5527 4797", // Format for display
  },

  // Google Form Configuration
  googleForm: {
    url: "https://forms.google.com/your-form-url-here", // Replace with your actual Google Form URL
  },

  // App Store URLs
  appStore: {
    ios: "https://apps.apple.com/my/app/nasi-paipon/id6751135731",
    android: "https://play.google.com/store/apps/details?id=app.nasipaipon.kitchen&hl=ms",
  },

  // Event Configuration
  event: {
    name: "SOLO EVENT",
    startDate: "29 Jan 2026",
    endDate: "1 Feb 2026",
    isActive: true, // Set to false to hide the event banner
  },

  // Company Information
  company: {
    name: "Nasi Paipon",
    tagline: "Your Go-To Food Ordering App for Large Gatherings",
    email: "info@nasipaipon.com", // Optional
    website: "nasipaipon.com", // Optional
  },
};

// WhatsApp Message Template Generator
export const generateWhatsAppMessage = () => {
  const message = `*🍛 Nasi Paipon Order Request*

*Name:* 
*Menu:* 
*Quantity:* 
*Type:* (Dine-in / Takeaway)
*Payment Method:* 
*Event Date:* 
*Additional Notes:* 

_Please fill in the details above and send to place your order._`;

  return encodeURIComponent(message);
};

// WhatsApp Order URL Generator
export const getWhatsAppOrderURL = () => {
  const { number } = CONFIG.whatsapp;
  const message = generateWhatsAppMessage();
  return `https://wa.me/${number}?text=${message}`;
};