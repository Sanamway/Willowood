/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        banner: "url('../public/newbg.jpg')",
      },

      fontFamily: {
        arial: ["Arial"],
        rale: ["Raleway"],
      },
      animation: {
        stripes: "stripes 2s linear infinite",
      },
      keyframes: {
        stripes: {
          "0%, 100%": { backgroundPosition: "1rem 0" },
          "50%": { backgroundPosition: "0 0" },
        },
      },
    },
  },
  plugins: [],
};
