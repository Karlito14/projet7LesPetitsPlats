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
            boxShadow: {
                article: '0 0 4px 34px 30px rgba(0, 0, 0, 0.2)',
            },
        },
    },
    plugins: [],
};
