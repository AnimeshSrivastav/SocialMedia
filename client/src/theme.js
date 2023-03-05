import {
  blue,
  green,
  grey,
  lightBlue,
  orange,
  purple,
  red,
} from "@mui/material/colors";

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            primary: {
              main: lightBlue[800],
              light:lightBlue[700],
              dark: lightBlue[900],
            },
            secondary: lightBlue,
            background: {
              default: grey[300],
              alt:grey[200],
              messagebg:grey[300]
            },
            text: {
              primary: grey[800],
              secondary: red[900],
            },
          }
        : {
            primary: {
              main: lightBlue[300],
              light: lightBlue[200],
              dark: lightBlue[400],
            },
            background: {
              default: grey[900],
              alt:grey[800],
              messagebg:grey[400]
            },
            secondary: blue,
            text: {
              primary: grey[300],
              secondary: grey[400],
            },
          }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 15,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 13,
      },
    },
  };
};
