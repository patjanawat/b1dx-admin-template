import type { Config } from 'tailwindcss';
// import preset from '@b1dx/theme/tailwind/preset';
import preset from '../../packages/theme/src/tailwind/preset';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const preset = require('@b1dx/theme/tailwind/preset');

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}'
  ],
  darkMode: 'class',
  presets: [preset]
};

export default config;
