import { ThemeProvider } from "styled-components";
import theme from "./global/theme/theme";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SignUp />
    </ThemeProvider>
  );
}

export default App;
