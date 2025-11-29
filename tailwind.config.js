/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  important: false,
  content: ["**/*.{html, jsx, js}", "**/*.js", "**/*.html"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // I NOSTRI COLORI "TRUSTED WARMTH"
        primary: '#2EA7B8',      // Teal - fiducia e calma
        secondary: '#FF6B6B',     // Coral - calore e energia
        accent: '#A8E6CF',        // Lime soft - crescita
        bgLight: '#F8F6F3',       // Crema - fondo neutro
        textDark: '#2D3748',      // Slate - testo principale
        textGray: '#718096',      // Testo secondario
      },
    },
  },
  plugins: [],
}

