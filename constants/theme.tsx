import { extendTheme } from "native-base";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};
const colors = {
  primary: {
    50: "#f8f0f2",
    100: "#d9d9d9",
    200: "#bfbfbf",
    300: "#a6a6a6",
    400: "#8c8c8c",
    500: "#737373",
    600: "#595959",
    700: "#404040",
    800: "#262626",
    900: "#120b0d",
  },
  secondary: {
    50: "#fbf0f2",
    100: "#dcd8d9",
    200: "#bfbfbf",
    300: "#a6a6a6",
    400: "#8c8c8c",
    500: "#737373",
    600: "#595959",
    700: "#404040",
    800: "#282626",
    900: "#150a0d",
  },
};

const components = {
  Button: {
    defaultProps: {
      rounded: "lg",
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
