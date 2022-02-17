module.exports = {
  prefix: "",
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("@tailwindcss/typography"),
  ],
};
