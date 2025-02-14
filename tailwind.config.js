/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        "var": "var(--h)",
      },
      width: {
        "var": "var(--w)",
      },
      transitionDuration: {
        "var": "var(--duration)",
      },
      lineHeight: {
        "0": 0,
      }
    },
  },
  plugins: [],
};
