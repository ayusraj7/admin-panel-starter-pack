import { createTheme } from '@mui/material/styles';

// Define theme settings
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1356d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
      tableHeader: 'oklch(13% 0.028 261.692)', 
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
});
