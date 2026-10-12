import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Sampled from syspree.com: buttons/pills #FF9211, active links & headings #FF6600
        brand: {
          orange: '#FF9211',
          deep: '#FF6600',
          dark: '#1a1a1a',
          text: '#4A4A4A',
          muted: '#8C8B8B',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Times', 'serif'],
      },
    },
  },
  plugins: [typography],
}
