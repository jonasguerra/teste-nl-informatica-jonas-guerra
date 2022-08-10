import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { RootState } from "../store/store";
import { routes } from "./routes";

const AppRoutes = () => {
  const location = useLocation();
  const userSelector = useSelector((state: RootState) => state.userStore);

  return (
    <>
      {userSelector.user.id &&
      location.pathname != routes.auth.login &&
      location.pathname != routes.auth.signUp ? (
        <>
          <Routes>
            <Route path={routes.dashboard} element={<Dashboard />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path={routes.auth.login} element={<Login />} />
          <Route path={routes.auth.signUp} element={<SignUp />} />
        </Routes>
      )}
    </>
  );
};

export default AppRoutes;
