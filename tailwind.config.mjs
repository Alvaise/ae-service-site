/* eslint-disable import/no-anonymous-default-export */
// 1. Use 'import' instead of 'require'
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
// 2. Use 'export default' instead of 'module.exports'
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    forms, // 3. Use the variable you imported
  ],
};
