/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './scripts/*/*.js',
    ],
    theme: {
        boxShadow: {
            article: '0 4px 34px 10px rgba(0, 0, 0, 0.2)',
        },
        extend: {
            height: {
                600: '663px',
            },
            colors: {
                yellow: '#FFD15B',
            },
            fontFamily: {
                anton: ['Anton', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
