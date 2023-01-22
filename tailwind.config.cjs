/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-primary": "#4979FF",
        charcoal: "#264653",
        "persian-green": "#2A9D8F",
        gray: {
          1: "#f2f2f2",
          2: "#242424",
          3: "#F1F3F4",
          4: "#DDDDDD",
          5: "#1c1c1c",
        },
        blue: {
          1: "#1A73E8",
        },
        ash: "#264653",
        teal: "#2A9D8F",
        mandarin: "#F4A261",
        peach: "#E76F51",
        earth: "#2D9CDB",
        white: "#ffffff",
        gold: "#E9C46A",
        purple: {
          twitch: "#9147ff",
          "twitch-hover": "#772ce8",
        },
      },
      gridTemplateColumns: {
        4: "repeat(4, minmax(0, 1fr))",
        5: "repeat(5, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-3": "span 3 / span 3 ",
      },
    },
  },
  plugins: [],
};
