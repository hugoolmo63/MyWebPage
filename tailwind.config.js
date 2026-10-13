/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#080b12',
        panel: '#10151f',
        line: '#26303d',
        lime: '#c8f169',
        muted: '#8994a5',
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 80px rgba(200, 241, 105, 0.07)',
      },
    },
  },
  plugins: [],
}
