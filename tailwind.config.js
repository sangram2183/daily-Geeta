/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        devanagari: ['Noto Sans Devanagari', 'sans-serif'],
      },
      colors: {
        saffron: {
          50:  '#fff8f0',
          100: '#fff0d6',
          200: '#ffdda3',
          400: '#f5a623',
          600: '#d4830a',
          800: '#7c4a00',
        },
        lotus: {
          50:  '#fdf2f8',
          100: '#fce7f3',
          400: '#e879a0',
          600: '#c2185b',
          800: '#7b0e3a',
        },
        deep: {
          800: '#1a1033',
          900: '#0d0820',
        }
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
