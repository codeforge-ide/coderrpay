'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Light Theme - Brownish Whites
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5d4037', // A solid, earthy brown
    },
    secondary: {
      main: '#8d6e63', // A lighter, complementary brown
    },
    background: {
      default: '#fbfaf9', // Slightly brownish white
      paper: '#fdfcfb',   // A slightly lighter brownish white for paper elements
    },
    text: {
      primary: '#3e2723', // Dark brown for text
      secondary: '#5d4037',
    },
  },
  typography: {
    fontFamily: 'inherit', // Use the font from the Next.js layout
  },
});

// Dark Theme - Deep Browns
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#a1887f', // A lighter brown for primary elements in dark mode
    },
    secondary: {
      main: '#bcaaa4',
    },
    background: {
      default: '#1a110a', // A very deep brown for the main background
      paper: '#2d1e13',   // A slightly lighter deep brown for paper elements
    },
    text: {
      primary: '#e0e0e0', // Light grey for primary text for readability
      secondary: '#bcaaa4',
    },
  },
  typography: {
    fontFamily: 'inherit',
  },
});

// Make themes responsive
const responsiveLightTheme = responsiveFontSizes(lightTheme);
const responsiveDarkTheme = responsiveFontSizes(darkTheme);

export { responsiveLightTheme, responsiveDarkTheme };
