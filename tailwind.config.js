/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,css,scss}'],
  theme: {
    extend: {
      colors: {
        medz: {
          primary: '#003f87',
          'primary-soft': '#d8e2ff',
          'surface-lowest': '#ffffff',
          surface: '#f8f9ff',
          'surface-low': '#fbfcff',
          'surface-high': '#eef3ff',
          'surface-highest': '#e8eefb',
          ink: '#0b1c30',
          muted: '#4d617a',
          'outline-variant': 'rgba(0, 63, 135, 0.2)',
          success: '#2f6d52',
          warning: '#9f6a15',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        editorial: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        intelligence: '0.2em',
        sovereign: '-0.04em',
      },
      spacing: {
        archive: '1.5rem',
        'archive-lg': '2rem',
      },
      borderRadius: {
        card: '1.5rem',
        capsule: '999px',
      },
      boxShadow: {
        refined: '0 12px 40px rgba(11, 28, 48, 0.04)',
        'inner-subtle': 'inset 0 1px 2px rgba(11, 28, 48, 0.08)',
        halo: '0 0 0 1rem rgba(0, 63, 135, 0.05)',
      },
      backdropBlur: {
        glass: '12px',
      },
      maxWidth: {
        archive: '80rem',
      },
    },
  },
};
