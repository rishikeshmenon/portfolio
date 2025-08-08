module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 20px rgba(59,130,246,0.15)",
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [],
};
