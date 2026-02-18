import { createTheme } from "@mui/material/styles";

const midnight = "#0B132B";
const paper = "#F7F5F2";
const accent = "#2DD4BF";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: midnight },
    secondary: { main: accent },
    text: { primary: midnight },
    background: { default: paper },
  },
  typography: {
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    h1: {
      fontFamily: "Poppins, sans-serif",
      fontSize: "3rem",
      fontWeight: 700,
      lineHeight: 1.1,
    },
    h2: {
      fontFamily: "Poppins, sans-serif",
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: "Poppins, sans-serif",
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.25,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 999,
          paddingInline: 24,
          paddingBlock: 12,
        },
      },
    },
  },
});

export const tokens = { midnight, paper, accent };
