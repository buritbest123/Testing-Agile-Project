import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        adlam: ['"ADLaM Display"', "sans-serif"], // Custom font 'ADLaM Display'
        montserrat: ['"Montserrat"', "sans-serif"], // Custom font 'Montserrat'
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
