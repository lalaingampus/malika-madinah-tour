export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0f2d6b",
        gold: "#c9982f",
        cream: "#f8f5ef",
      },
      fontFamily: {
        heading: ["Cinzel", "serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        soft: "0 15px 35px -18px rgba(15,45,107,0.35)",
      },
    },
  },
  plugins: [],
};
