import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
  }
}

// Erweitere die Farb-Props für alle MUI-Komponenten
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/TextField" {
  interface TextFieldPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/Checkbox" {
  interface CheckboxPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/Radio" {
  interface RadioPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/Switch" {
  interface SwitchPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/CircularProgress" {
  interface CircularProgressPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/LinearProgress" {
  interface LinearProgressPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/Fab" {
  interface FabPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/Badge" {
  interface BadgePropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/Alert" {
  interface AlertPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/ToggleButton" {
  interface ToggleButtonPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/Slider" {
  interface SliderPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/FormLabel" {
  interface FormLabelPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/Pagination" {
  interface PaginationPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/PaginationItem" {
  interface PaginationItemPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/SpeedDial" {
  interface SpeedDialPropsColorOverrides {
    tertiary: true;
  }
}