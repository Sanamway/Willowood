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
        bgnew: "url('../public/bgnew.png')",
        wave: "url('../public/yellowgreen.png')",
        polygreen: "url('../public/polygreen.png')",
        wautimg: "url('../public/wautimg.jpeg')",
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
