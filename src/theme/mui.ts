import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7AA2F7",
      light: "#A5BEFA",
      dark: "#4C6EDB",
      contrastText: "#0B1020",
    },

    secondary: {
      main: "#BB9AF7",
      light: "#D2BDFB",
      dark: "#8E6FD8",
      contrastText: "#0B1020",
    },

    tertiary: {
      main: "#7DCFFF",
      light: "#A6E3FF",
      dark: "#4FA8D8",
      contrastText: "#0B1020",
    },

    error: {
      main: "#F7768E",
      light: "#F9A1B1",
      dark: "#D94E6A",
      contrastText: "#0B1020",
    },

    background: {
      default: "#212121",
      paper: "#121212",
    },

    text: {
      primary: "#E5E7EB",
      secondary: "#9CA3AF",
    },

    divider: "#1F2937",
  },

  typography: {
    fontFamily: "Roboto, sans-serif",
  },

  components: {
    MuiIcon: {
      defaultProps: {
        baseClassName: "material-symbols-outlined",
      },
    },
  },
});
