/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0E0E10',
        primary: '#00FFFF',
        secondary: '#6C63FF',
        text: '#EDEDED',
        subtext: '#A0A0A0',
        success: '#00FF7F',
        error: '#FF005C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        terminal: ['JetBrains Mono', 'Fira Code', 'monospace'],
        header: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF',
        'neon-indigo': '0 0 10px #6C63FF, 0 0 20px #6C63FF, 0 0 30px #6C63FF',
        'neon-success': '0 0 10px #00FF7F, 0 0 20px #00FF7F',
        'neon-error': '0 0 10px #FF005C, 0 0 20px #FF005C',
      },
    },
  },
  plugins: [],
}

