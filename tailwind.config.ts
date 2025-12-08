import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // color akber
        // 'tosca-primary': '#19B697',
        // 'tosca-200': '#75D3C1',
        // 'tosca-100': '#DDF5F3',
        // 'cyan-primary': '#15BBDA',
        // 'cyan-200': '#73D6E9',
        // 'neutral-500': '#4C4C4C',
        // 'orange-500': '#fd6938',

        // color beramal
        primary: {
          100: '#d8f7f5',
          200: '#a9ebe6',
          300: '#7dded8',
          400: '#4fd0c8',
          500: '#1accbe', // asli
          600: '#15b4a8',
          700: '#1eb8b0', // asli
        },
        secondary: {
          100: '#fff3dd',
          200: '#ffe2b0',
          300: '#ffd082',
          400: '#ffbf5c',
          500: '#f6b548', // asli
          600: '#eaa43c',
          700: '#fe9e2e', // asli
        },
        neutral: {
          100: '#f2f2f2', // asli
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#3a3a3a',
        },
        orange: {
          100: '#ffe3dd',
          200: '#ffb9ad',
          300: '#ff8676',
          400: '#ff624d',
          500: '#fd5239', // asli
          600: '#e44731',
          700: '#c33728',
        },
      },
    },
  },
  // corePlugins: {
  //   preflight: false, // Disables Tailwind CSS resets if unnecessary
  // },
  plugins: [],
};
export default config;
