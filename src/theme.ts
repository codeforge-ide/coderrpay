'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Light Theme - Brownish Whites
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8d6e63', // A lighter, earthy brown for a softer feel
    },
    secondary: {
      main: '#a1887f', // A complementary, slightly lighter brown
    },
    background: {
      default: '#e0e0e0', // A neutral, light gray background
      paper: '#ffffff',   // Pure white for paper elements to create contrast
    },
    text: {
      primary: '#3e2723', // Dark brown for high contrast and readability
      secondary: '#5d4037',
    },
  },
  typography: {
    fontFamily: 'inherit',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20, // Increased border radius for a softer, more tangible feel
          boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff', // 3D shadow effect
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '25px 25px 70px #bebebe, -25px -25px 70px #ffffff',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '5px 5px 10px #bebebe, -5px -5px 10px #ffffff',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '8px 8px 15px #bebebe, -8px -8px 15px #ffffff',
          },
        },
      },
    },
  },
});

// Dark Theme - Deep Browns
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#a1887f',
    },
    secondary: {
      main: '#bcaaa4',
    },
    background: {
      default: '#212121', // Dark grey for a modern, sleek dark mode
      paper: '#424242',   // A lighter grey for paper elements
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  typography: {
    fontFamily: 'inherit',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          background: 'linear-gradient(145deg, #484848, #3a3a3a)',
          boxShadow: '20px 20px 60px #1e1e1e, -20px -20px 60px #5a5a5a',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '25px 25px 70px #1e1e1e, -25px -25px 70px #5a5a5a',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: 'linear-gradient(145deg, #484848, #3a3a3a)',
          boxShadow: '5px 5px 10px #1e1e1e, -5px -5px 10px #5a5a5a',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '8px 8px 15px #1e1e1e, -8px -8px 15px #5a5a5a',
          },
        },
      },
    },
  },
});

// Make themes responsive
const responsiveLightTheme = responsiveFontSizes(lightTheme);
const responsiveDarkTheme = responsiveFontSizes(darkTheme);

export { responsiveLightTheme, responsiveDarkTheme };
