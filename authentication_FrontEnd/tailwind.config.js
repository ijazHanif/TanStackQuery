/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "purple-taupe": "#533C56",
        dune: "#313131",
      },
    },
  },
  plugins: [],
};
