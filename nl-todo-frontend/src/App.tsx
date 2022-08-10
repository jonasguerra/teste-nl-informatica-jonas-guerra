import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import CircularSpinner from "./components/Basics/CircularSpinner";
import SnackbarAlert from "./components/Basics/SnackbarAlert";
import theme from "./global/theme/theme";
import AppRoutes from "./Routes/AppRoutes";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CircularSpinner />
          <SnackbarAlert />
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
