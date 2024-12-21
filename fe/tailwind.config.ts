import type { Config } from "tailwindcss"; 
import { mtConfig } from "@material-tailwind/react";
import flowbite from "flowbite-react/tailwind";

const config: Config =   {
  content: [ 
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
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
      maxWidth:{

        custom : 'calc(100vw - 300px)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#435ebe",
        secondary: "#2D499D",
        tertiary: "var(--tertiary)",
        success:'#4DC397',
        basic: '#f2f7ff'
      },
    
      fontSize: {
        base: ["min(3vw, 1rem)", { lineHeight: '1.5rem' }],
        lg: ["min(3vw, 1.125rem)", { lineHeight: '1.75rem' }],
        xl: ["min(3vw, 1.25rem)", { lineHeight: '1.75rem' }],
        "2xl": ["min(3vw, 1.5rem)", { lineHeight: '2rem' }],
        custom: "calc(1.375rem + 1.5vw)",
        lpCustom : "calc(1.475rem + 2.7vw)"
      },
      lineHeight:{
        base: "min(1.5vw,1.5rem)",
        lg: "min(1.5vw,1.75rem)",
        xl: "min(1.5vw,1.75rem)",
        "2xl": "min(1.5vw,2rem)",
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
  plugins: [  flowbite.plugin(),mtConfig ],
} ;
export default config;
