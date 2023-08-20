/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'light-yellow': '#FFA500',
        DarkOrange: '#FF8C00',
        'light-gray':'#F2F2F2',
      },
      fontFamily:{
        poppins: ['var(--font-poppins)'],
      },
      fontSize:{
        'Heading-Small':'1.25rem',
        'Heading-Medium':'1.875rem',
        'Heading-Large':'3rem',
        'Title-Small':'1rem',
        'Title-Medium':'1.15rem',
        'Title-Large':'1.25rem',
        'Title-Larger':'1.5rem',
        'Description':'1rem',
        'tags':'0.9rem',
      }
    },
  },
  plugins: [],
}
