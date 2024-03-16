/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html'],
    theme: {
        extend: {
            colors: {
                yellow: '#FFD15B',
            },
            height: {
                600: '663px',
            },
            fontFamily: {
                manrope: ['Manrope', 'sans-serif'],
                anton: ['Anton', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
