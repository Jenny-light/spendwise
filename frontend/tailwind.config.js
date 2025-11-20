/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#10B981',
            dark: '#059669',
            light: '#D1FAE5',
          },
          secondary: {
            DEFAULT: '#1E293B',
            light: '#64748B',
          },
          accent: {
            red: '#EF4444',
            blue: '#3B82F6',
            yellow: '#F59E0B',
          },
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }