/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	// purge: [  ],
	theme: {
		extend: {
			colors: {
				'bege': '#F6ECDA',
				'base-100': '#F6ECDA'},
			fontFamily: {
				sans: ['Raleway', 'Raleway Variable', 'sans-serif'],
			  },
		},
	},
	daisyui: {
		themes: [{
			  mytheme: {
				"base-100": "#F6ECDA",
			  },
			},
		  ],
		},
	plugins: [require("daisyui"), require('tailwindcss-debug-screens'), require('@tailwindcss/container-queries'), require('tailwindcss-animated'),],
}
