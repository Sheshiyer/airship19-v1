import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      colors: {
        primary: {
          50: "var(--color-primary-50)",
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
        },
        perspective: {
          wisp: "var(--color-wisp)",
          rabbit: "var(--color-rabbit)",
          wolf: "var(--color-wolf)",
          pilot: "var(--color-pilot)",
        },
        semantic: {
          success: "var(--color-success)",
          warning: "var(--color-warning)",
          error: "var(--color-error)",
          info: "var(--color-info)",
        },
      },
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
        "text-gradient": "text-gradient 1.5s linear infinite",
        "background-shine": "background-shine 2s linear infinite",
        "pulse-slow": "pulse 6s infinite cubic-bezier(0.4, 0, 0.6, 1)",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
        "text-gradient": {
          to: {
            backgroundPosition: "200% center",
          },
        },
        "background-shine": {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
      borderRadius: {
        card: "var(--card-radius)",
      },
      boxShadow: {
        card: "var(--card-shadow)",
      },
      spacing: {
        "timeline-w": "var(--timeline-width)",
        "timeline-dot": "var(--timeline-dot-size)",
        "timeline-space": "var(--timeline-spacing)",
      },
    },
  },
  plugins: [],
};

export default config;
