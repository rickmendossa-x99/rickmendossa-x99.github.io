/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ["./index.html", "./index.js"],
  theme: {
    extend: {
      colors: {
        // Dark Navy Background
        'coach-bg': '#1A1B26', 
        
        // Electric Blue (Usato per testi primari o sfumature)
        'coach-teal': '#3D5AFE', // Rimappo il vecchio "teal" sul nuovo Electric Blue
        
        // Neon Pink (CTA Button e Accenti)
        'coach-coral': '#FF006E', // Rimappo il vecchio "coral" sul nuovo Neon Pink
        
        // Yellow Lime (Nuovo accento per dettagli)
        'coach-lime': '#FFF44F',
        
        // Bianco per il testo
        'coach-text': '#FFFFFF',
        
        // Grigio scuro per card o sezioni secondarie
        'coach-card': '#24283b',
        'coach-gray': '#a9b1d6', // Colore testo secondario leggibile su scuro
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

