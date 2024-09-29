/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                darkSquare: '#b58863',
                lightSquare: '#f0d9b5',
            },
        },
    },
    plugins: [],
};
