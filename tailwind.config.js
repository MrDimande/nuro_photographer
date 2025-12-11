/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Apple-inspired typography scale
      fontFamily: {
        sans: ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      // Refined color palette - muted, elegant
      colors: {
        nuro: {
          black: '#0a0a0a',
          dark: '#141414',
          gray: '#1d1d1f',
          muted: '#86868b',
          light: '#f5f5f7',
          white: '#fbfbfd',
        }
      },
      // Apple-style easing
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'apple-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      // Spacing for editorial rhythm
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      // Backdrop blur values
      backdropBlur: {
        'xs': '2px',
        '3xl': '64px',
      }
    },
  },
  plugins: [],
}
