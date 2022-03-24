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
    50: "#ffe6eb",
    100: "#f7bcc7",
    200: "#ec92a2",
    300: "#e4687c",
    400: "#db3e57",
    500: "#c1253d",
    600: "#971b30",
    700: "#6d1322",
    800: "#430913",
    900: "#1d0005",
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
