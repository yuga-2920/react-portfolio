import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Container } from '@mui/material';

export const ThemeContextProvider = ({ children }) => {
  const theme = createTheme({
    typography: {
      fontFamily: "'M PLUS Rounded 1c', sans-serif"
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: "none"
            },
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Container
        fixed
        sx={{
          my: 10
        }}
      >
        { children }
      </Container>
    </ThemeProvider>
  )
};
