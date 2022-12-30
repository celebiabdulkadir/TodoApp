/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      mobile: { min: "360px", max: "640px" },
      desktop: "641px",
    },
    extend: {},
  },
  plugins: [],
};
