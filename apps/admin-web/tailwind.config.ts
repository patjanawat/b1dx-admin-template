import type { Config } from "tailwindcss";
import preset from "@b1dx/theme/tailwind/preset";

const config: Config = {
  presets: [preset],
  content: [
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
    "../../packages/ui/src/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
