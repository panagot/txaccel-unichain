/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        surface: {
          950: '#0a0a0b',
          900: '#0f0f11',
          800: '#18181b',
          700: '#27272a',
          600: '#3f3f46',
        },
        accent: {
          DEFAULT: '#f59e0b',
          muted: '#d97706',
          dim: '#b45309',
        },
        border: {
          DEFAULT: '#27272a',
          hover: '#3f3f46',
        },
      },
      boxShadow: {
        glow: '0 0 24px -4px rgba(245, 158, 11, 0.15)',
      },
    },
  },
  plugins: [],
}
