import { extendTheme } from "native-base";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};
const colors = {
  primary: {
    50: "#dbf7ff",
    100: "#ace1ff",
    200: "#7dcbff",
    300: "#4cb7fe",
    400: "#1ca2fc",
    500: "#0389e3",
    600: "#006ab1",
    700: "#004c80",
    800: "#002e50",
    900: "#001020",
  },
  secondary: {
    50: "#ffe4e9",
    100: "#ffb5bf",
    200: "#f98596",
    300: "#f5566c",
    400: "#f22842",
    500: "#d81029",
    600: "#a90a1f",
    700: "#7a0516",
    800: "#4a000b",
    900: "#1f0002",
  },
};

const components = {
  Button: {
    defaultProps: {
      rounded: "lg",
      size: "lg",
    },
  },
};

// extend the theme
const theme = extendTheme({ config, colors, components });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}

export default theme;
