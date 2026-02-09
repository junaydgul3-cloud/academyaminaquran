/* Tailwind CDN config (must load BEFORE https://cdn.tailwindcss.com) */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          emerald: "#059669",
          emeraldDark: "#047857",
          gold: "#D8B25C",
          goldSoft: "#F3E6C7",
          ink: "#0B1220",
          mist: "#F7FAF9",
          stone: "#0F172A",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(2, 6, 23, 0.10)",
        glow: "0 18px 60px rgba(5, 150, 105, 0.22)",
      },
    },
  },
};

