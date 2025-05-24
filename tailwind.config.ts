import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
safelist: [
"text-blue-600",
"bg-blue-50",
"bg-yellow-200",
"text-yellow-800",
"font-bold",
"italic",
"underline",
"text-gray-700",
"hover:bg-blue-100",
"hover:bg-yellow-100",
"transition",
"rounded",
"p-1",
],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
