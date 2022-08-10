import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import theme from "./global/theme/theme";
import Dashboard from "./pages/Dashboard";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Dashboard />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
