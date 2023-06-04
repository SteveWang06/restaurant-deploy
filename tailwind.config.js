/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';
export default {
  mode: 'jit',
  important: true,
  purge: [
    "./src/**/*.html",
    "./src/**/*.jsx",
    "./src/**/*.js",
    "./src/**/*.tsx",
    "./src/**/*.ts",
  ],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      Poppins: 'Poppins',
    },
    colors: {
      starYellow: '#ff7a4a',
      Main: '#20272C',
      lineGray: '#D9D9D9',
      lightGray: '#FAFAFA',
      tealMain: '#2CA3A8',
      white: '#ffffff',
      black: '#000000',
      blueSee: '#00CCFF',
      rose: '#CC0000',
      roseBg: '#f59595c2',
      roseBorder: '#ff6565bf',
      transparent: 'transparent',
      green: '#1bab12'
    },

    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '2rem',
        lg: '3.75rem',
        xl: '5.625rem',
        '2xl': '13.625rem',
      },
    },
    screens: {
      xs: '425px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase([
        {
          '@media (max-width: 639px)': {
            h1: {
              fontSize: '36px',
              lineHeight: '48px',
              letterSpacing: '-0.01em',
            },
            h2: {
              fontSize: '32px',
              lineHeight: '40px',
            },
            h3: {
              fontSize: '24px',
              lineHeight: '32px',
            },
            h4: {
              fontSize: '18px',
              lineHeight: '26px',
            },
          },
        },
        {
          '@media (min-width: 640px)': {
            h1: {
              fontSize: '46px',
              lineHeight: '56px',
              letterSpacing: '-0.01em',
            },
            h2: {
              fontSize: '36px',
              lineHeight: '44px',
            },
            h3: {
              fontSize: '26px',
              lineHeight: '36px',
            },
            h4: {
              fontSize: '20px',
              lineHeight: '26px',
            },
          },
        },
        {
          '@media (min-width: 1280px)': {
            h1: {
              fontSize: '56px',
              lineHeight: '64px',
              letterSpacing: '-0.01em',
            },
            h2: {
              fontSize: '40px',
              lineHeight: '48px',
            },
            h3: {
              fontSize: '28px',
              lineHeight: '38px',
            },
            h4: {
              fontSize: '24px',
              lineHeight: '28px',
            },
          },
        },
      ]);
    }),
  ],
}

