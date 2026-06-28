export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        devanagari: ['Noto Sans Devanagari', 'sans-serif'],
      },
      colors: {
        saffron: { DEFAULT: '#E8831A', light: '#F5A623', pale: '#FFF3E0', dark: '#C46A0A' },
        gold: { DEFAULT: '#B8860B', light: '#DAA520', pale: '#FFF8E1' },
        lotus: { DEFAULT: '#C2185B', pale: '#FCE4EC' },
        cream: { DEFAULT: '#FAF6EE', dark: '#F5EDD8', darker: '#EDE0C4' },
        warm: { DEFAULT: '#3D2000', muted: '#8B6040', light: '#C4956A' },
        deep: { DEFAULT: '#1A0A00', '2': '#2D1A00' },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'shimmer': 'shimmer 2.5s infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      backgroundImage: {
        'spiritual': 'linear-gradient(135deg, #FAF6EE 0%, #FFF3E0 50%, #FAF0E6 100%)',
        'saffron-grad': 'linear-gradient(135deg, #E8831A, #F5A623)',
        'gold-grad': 'linear-gradient(135deg, #B8860B, #DAA520)',
      },
      boxShadow: {
        'spiritual': '0 2px 20px rgba(184,134,11,0.08)',
        'saffron': '0 4px 15px rgba(232,131,26,0.3)',
        'glow': '0 0 30px rgba(245,166,35,0.2)',
      }
    },
  },
  plugins: [],
}
