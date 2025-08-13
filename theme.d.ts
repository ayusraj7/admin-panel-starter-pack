// src/theme.d.ts
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    tableHeader?: string; // 👈 new property
  }
}
