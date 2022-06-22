import { createTheme } from "@mui/material/styles"

const palette = {
  primary: {
    main: "#1461fa",
  },
}

export const theme = createTheme({
  palette,
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          color: palette.primary.main,
        },
      },
    },
  },
})
