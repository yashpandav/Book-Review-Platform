/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Simple color palette for Modern Scholar Light theme
      colors: {
        // Primary colors (cream/parchment background)
        'cream': '#FFF8E7',
        'cream-dark': '#F5F1E8',
        
        // Secondary colors (warm brown for headers)
        'brown': '#A67B5B',
        'brown-light': '#B8906F',
        'brown-dark': '#8B6A4F',
        
        // Accent colors (teal for buttons and links)
        'teal': '#4A9082',
        'teal-light': '#5BA394',
        'teal-dark': '#3B746A',
        
        // Text colors
        'text-dark': '#2F2F2F',
        'text-gray': '#4A4A4A',
        'text-light': '#6B6B6B',
        
        // Card background
        'card-bg': '#FDF6E3',
      },
      
      // Poppins font family
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      
      // Simple animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      
      // Keyframes for animations
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}