module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        txt: "rgba(var(--txt))",
        button: "rgba(var(--button))",
        "button-hover": "rgba(var(--button-hover))",
        "button-text": "rgba(var(--button-text))",
        card: "rgba(var(--card))",
        "card-text": "rgba(var(--card-text))",
        shad: "rgba(var(--shad))",
        bingus: "rgba(var(--bingus))"
      }
    },
  },
  plugins: [],
};
