import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { setUser } from "../store/slicers/user.slicer";
import { RootState } from "../store/store";
import { localStorageKeys } from "../utils/constants";
import { routes } from "./routes";

const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userSelector = useSelector((state: RootState) => state.userStore.user);

  console.log(userSelector);

  useEffect(() => {
    const token = localStorage.getItem(localStorageKeys.userToken);
    if (token) {
      dispatch(setUser({ user: { token } }));
    }
  }, []);

  return (
    <>
      {userSelector.token &&
      location.pathname != routes.auth.login &&
      location.pathname != routes.auth.signUp ? (
        <Routes>
          <Route path={routes.dashboard} element={<Dashboard />} />
        </Routes>
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
