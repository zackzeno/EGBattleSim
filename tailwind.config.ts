import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1600px',
        '4xl': '1920px'
      },
      spacing: {
        '112': '28rem',
        '128': '32rem'
      },
      fontSize: {
        '2xs': ['0.625rem', '0.75rem']
      }
    },
  },
  darkMode: 'selector',
  plugins: [],
};
export default config;
