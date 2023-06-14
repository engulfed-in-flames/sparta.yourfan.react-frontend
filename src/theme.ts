import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: "#222529",
    secondary: "#41474f",
    tertiary: "#7f8b9b",
    youtubeRed: "#ea3322",
    whiteGray: "#f8f9fa",
    red: {},
    black: {},
  },
  styles: {
    global: {
      body: {
        bgColor: "#f8f9fa",
        boxSizing: "border-box",
      },
    },
  },
});

export default theme;
