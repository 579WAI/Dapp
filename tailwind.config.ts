import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0a1628", light: "#0f2137", card: "#122a45" },
        gold: { DEFAULT: "#c9a227", dim: "#a8861f", glow: "#e8c547" },
      },
      boxShadow: { gold: "0 0 24px rgba(201, 162, 39, 0.25)" },
    },
  },
  plugins: [],
};
export default config;
