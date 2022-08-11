import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import { setUser } from '../store/slicers/user.slicer';
import { RootState } from '../store/store';
import { localStorageKeys } from '../utils/constants';
import { routes } from './routes';

const AppRoutes = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();
  const userSelector = useSelector((state: RootState) => state.userStore.user);

  const loadUserToken = async () => {
    const token = await localStorage.getItem(localStorageKeys.userToken);
    if (token) {
      dispatch(setUser({ user: { token } }));
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUserToken();
  }, []);

  return (
    <>
      {!loading && (
        <Routes>
          {userSelector.token ? (
            <>
              <Route path={routes.root} element={<Dashboard />} />
              <Route path={routes.dashboard} element={<Dashboard />} />
              <Route path={routes.auth.login} element={<Login />} />
            </>
          ) : (
            <>
              <Route path={routes.auth.login} element={<Login />} />
              <Route path={routes.auth.signUp} element={<SignUp />} />
            </>
          )}
        </Routes>
      )}
    </>
  );
};

export default AppRoutes;
