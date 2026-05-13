/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Avenir Next LT Pro',
          'Avenir Next',
          'Avenir',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'system-ui',
          'sans-serif',
        ],
        display: [
          'Montserrat',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'system-ui',
          'sans-serif',
        ],
      },
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.012em', fontWeight: '600' }],
        'display-xl': ['3.75rem', { lineHeight: '1.08', letterSpacing: '-0.012em', fontWeight: '600' }],
        'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.010em', fontWeight: '600' }],
        'display-md': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.008em', fontWeight: '600' }],
        'premium-h1': ['clamp(2.75rem, 5.5vw, 4.5rem)', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '300' }],
        'premium-h2': ['clamp(2rem, 3.6vw, 2.75rem)', { lineHeight: '1.12', letterSpacing: '-0.018em', fontWeight: '300' }],
        'premium-h3': ['clamp(1.375rem, 2vw, 1.75rem)', { lineHeight: '1.22', letterSpacing: '-0.012em', fontWeight: '300' }],
        'premium-body': ['1.0625rem', { lineHeight: '1.55', fontWeight: '400' }],
        'premium-body-lg': ['1.125rem', { lineHeight: '1.55', fontWeight: '400' }],
      },
      maxWidth: {
        'premium': '1200px',
      },
      spacing: {
        'section': 'clamp(80px, 9vw, 120px)',
        'section-mobile': 'clamp(48px, 12vw, 64px)',
      },
      colors: {
        'apple-gray': {
          50: '#F5F5F7',
          100: '#E8E8ED',
          200: '#D2D2D7',
          300: '#AAAA AF',
          400: '#86868B',
          500: '#6E6E73',
          600: '#515154',
          700: '#3A3A3C',
          800: '#2C2C2E',
          900: '#1C1C1E',
        },
        // ANATOLY MOOK — Bronze brand palette
        bronze: {
          50: '#F4EFE7',
          100: '#EFE2CB',
          200: '#E6C18A',
          300: '#D6A85E',
          400: '#C89150',
          500: '#B9823F',
          600: '#8A5528',
          700: '#7A4A24',
          800: '#5A371B',
          900: '#4A2A16',
        },
        // Re-route Tailwind's built-in yellow/amber scales to bronze so legacy
        // `text-yellow-400`, `bg-amber-500`, etc. now render bronze.
        yellow: {
          50: '#F4EFE7',
          100: '#EFE2CB',
          200: '#E6C18A',
          300: '#D6A85E',
          400: '#B9823F',
          500: '#B9823F',
          600: '#8A5528',
          700: '#7A4A24',
          800: '#5A371B',
          900: '#4A2A16',
        },
        amber: {
          50: '#F4EFE7',
          100: '#EFE2CB',
          200: '#E6C18A',
          300: '#D6A85E',
          400: '#B9823F',
          500: '#B9823F',
          600: '#8A5528',
          700: '#7A4A24',
          800: '#5A371B',
          900: '#4A2A16',
        },
        // Re-route warm "orange" co-accents that were paired with the old gold
        // palette to the deeper bronze tones so the whole warm spectrum is
        // unified. (Admin status colors that need a real orange still resolve
        // through their own utility classes.)
        orange: {
          50: '#F4EFE7',
          100: '#EFE2CB',
          200: '#E6C18A',
          300: '#D6A85E',
          400: '#B9823F',
          500: '#8A5528',
          600: '#7A4A24',
          700: '#5A371B',
          800: '#4A2A16',
          900: '#4A2A16',
        },
      },
      backdropBlur: {
        'apple': '40px',
      },
      boxShadow: {
        'apple-sm': '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'apple': '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'apple-lg': '0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)',
        'apple-xl': '0 16px 64px rgba(0, 0, 0, 0.16), 0 8px 16px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
