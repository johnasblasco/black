import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "ui-sans-serif", "system-ui", "sans-serif"],
        lato: ["Lato", "ui-sans-serif", "system-ui", "sans-serif"],
        opensans: ["Open Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        inter: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          olive: "var(--brand-olive)",
          chili: "var(--brand-chili)",
          cream: "var(--brand-cream)",
          charcoal: "var(--brand-charcoal)",
          leaf: "var(--brand-leaf)",
          darkBg: "var(--brand-dark-bg)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
