/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
        ink: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgb(15 23 42 / 0.06), 0 4px 16px -4px rgb(15 23 42 / 0.08)',
        'soft-lg': '0 4px 16px -4px rgb(15 23 42 / 0.08), 0 12px 32px -8px rgb(15 23 42 / 0.12)',
        'glow': '0 0 0 1px rgb(16 185 129 / 0.1), 0 8px 24px -8px rgb(16 185 129 / 0.3)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
        'gradient-hero': 'linear-gradient(135deg, #022c22 0%, #065f46 50%, #0d9488 100%)',
        'mesh': 'radial-gradient(at 20% 20%, rgb(16 185 129 / 0.15) 0, transparent 50%), radial-gradient(at 80% 0%, rgb(249 115 22 / 0.1) 0, transparent 50%), radial-gradient(at 0% 80%, rgb(6 95 70 / 0.15) 0, transparent 50%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        journey: {
          "primary": "#10b981",
          "primary-content": "#ffffff",
          "secondary": "#0d9488",
          "secondary-content": "#ffffff",
          "accent": "#f97316",
          "accent-content": "#ffffff",
          "neutral": "#1e293b",
          "neutral-content": "#f8fafc",
          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#f1f5f9",
          "base-content": "#0f172a",
          "info": "#0ea5e9",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#ef4444",
          "--rounded-box": "1rem",
          "--rounded-btn": "0.625rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--btn-text-case": "none",
        },
      },
      "light",
      "dark",
    ],
  },
}
