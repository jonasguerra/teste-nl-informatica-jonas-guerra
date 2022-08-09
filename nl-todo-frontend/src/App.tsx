import { ThemeProvider } from "styled-components";
import theme from "./global/theme/theme";
import Login from "./pages/Login";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );
}

export default App;
