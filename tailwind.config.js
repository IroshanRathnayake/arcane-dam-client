/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
   "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        customBlue: {
          40: '#e8f4ff',
          50: '#d6ebff',
          100: '#b3d6ff',
          200: '#80bfff',
          300: '#4da8ff',
          400: '#1a91ff',
          500: '#007bff', 
          600: '#0068cc',
          700: '#0053a3',
          800: '#00407a',
          900: '#002c52'
        }, 
        secondarycolor: '#6c757d', 
        successcolor: '#10B981', 
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
} 