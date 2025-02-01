/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#50c6c9",
          "secondary": "#00aab3",
          "accent": "#eefcfc",
          "neutral": "#e6f4f1",
          "base-100": "#e6f4f1",
          "info": "#005c6a",
          "success": "#00b388",
          "warning": "#8a1e00",
          "error": "#8a1e00",
        },
      },
    ],
  },
}

