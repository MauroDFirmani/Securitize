import {QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import queryClient from "./config/cache";
import Home from "./views/Home";

const themeDark = createTheme({
  palette: {
    background: {
      default: "#222222",
    },
    text: {
      primary: "#000000",
    },
  },
});

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={themeDark}>
        <CssBaseline />
        <Home />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
