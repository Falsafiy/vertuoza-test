/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors:{
      'blue-primary': 'var(--color--blue-primary)',
      'blue-light': 'var(--color--blue-linear-gradient)',
      'black-blur': 'var(--color--black)',
      'red-error': 'var(--color--red)',
      'gray-200': 'var(--color--light-gray)',
      'gray-300': 'var(--color--light-gray)',
      'white': 'var(--color--white)',
      'red': 'var(--color--red)',
      'orange-primary': 'var(--color--orange-primary)',
      'green-inactive': 'var(--color--green-inactive)',
      'green-primary': 'var(--color--green-hover)',
    },

  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  		},
  		colors: {},
  		keyframes: {
  			'accordion-down': {
  				 from: {
  					height: '0',
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)',
  				},
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)',
  				},
  				to: {
  					height: '0',
  				},
  			},
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  		},
  	},
  },
  plugins: [require('tailwindcss-animate')],
};

