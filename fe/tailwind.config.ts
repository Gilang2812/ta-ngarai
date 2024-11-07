import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens:{
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#435ebe",
        secondary: "#2D499D",
        tertiary: "var(--tertiary)",
        success:'#4DC397'
      },
      fontSize: {
        custom: "calc(1.375rem + 1.5vw)",
      },
      fontFamily: {
        'quicksand': ["quicksand", "sans-serif"],
        'opensans': ["Open Sans", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
      },
      keyframes: {
        "gradient-animation": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        wiggle: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        fadeIn: {
          "0%": { opacity: "1", transform: "translate(0 100px)" },
          "100%": { opacity: "1" , transform: "translate(0)"}
        },
      },
      animation: {
        FadeIn: "fadeIn 3s linear ",
      },
    },
  },
  plugins: [],
};
export default config;
