/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        // Definiamo i colori CoachMatch
        'coach-teal': '#2EA7B8',      // Il tuo Teal
        'coach-coral': '#FF6B6B',     // Il tuo Coral/Rosso
        'coach-bg': '#F8F6F3',        // Il tuo Sfondo Crema
        'coach-text': '#2D3748',      // Il tuo Testo Scuro
        'coach-green': '#A8E6CF',     // Il tuo Verde Lime
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
  prefix: 'tw-', // Importante: mantiene il prefisso usato nel template
}

