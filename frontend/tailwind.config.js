/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        student: "#3B82F6",
        teacher: "#10B981",
        management: "#8B5CF6",
      },
    },
  },
  plugins: [],
};
