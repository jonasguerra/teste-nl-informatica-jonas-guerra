import { ThemeProvider } from "styled-components";
import "./App.css";
import theme from "./global/theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Login />
      <SignUp />
    </ThemeProvider>
  );
}

export default App;
