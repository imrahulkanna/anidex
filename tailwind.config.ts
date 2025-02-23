import { transform } from "next/dist/build/swc";
import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
        },
        extend: {
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "loader-bounce": {
                    "0%, 80%, 100%": { transform: "scale(0)" },
                    "40%": { transform: "scale(1)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "loader-bounce": "loader-bounce 1.4s infinite ease-in-out both",
            },
            screens: {
                "2xl": "1670px",
                "3xl": "1799px",
            },
            colors: {
                primary: "#52dff4",
                secondary: "#f0479d",
                obsidian: "#161618",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
