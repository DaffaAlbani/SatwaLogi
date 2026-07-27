/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        botanical: {
          950: '#031913',
          900: '#062e23', // Primary
          800: '#0f4234',
          700: '#1a5948',
          600: '#2d5a4c', // Sage tone
          500: '#3d7867',
          400: '#589987',
          300: '#81b8aa',
          200: '#b4d7cd',
          100: '#e8ede6', // Light sage card bg
          50: '#f9faf6',  // Surface light
        },
        ochre: {
          500: '#d4a373',
          600: '#c28e5c',
          700: '#a67243',
        },
        iucn: {
          cr: '#d90429', // Critically Endangered
          en: '#f77f00', // Endangered
          vu: '#ffb703', // Vulnerable
          nt: '#70e000', // Near Threatened
          lc: '#38b000', // Least Concern
        }
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
