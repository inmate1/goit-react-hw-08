import './App.css';

import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { lazy, useEffect } from 'react';
import PrivateRoute from './pages/PrivateRoute';
import RestrictedRoute from './pages/RestrictedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing } from './redux/auth/selectors';
import { refreshUser } from './redux/auth/operations';
import { Toaster } from 'react-hot-toast';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegistrationPage = lazy(() =>
  import('./pages/RegistrationPage/RegistrationPage')
);
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  // if (isRefreshing) {
  //   return <Loader />;
  // }
  return (
    <>
      <Toaster />

      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path='register'
            element={
              <RestrictedRoute
                component={<RegistrationPage />}
                redirectTo={'/'}
              />
            }
          />
          <Route
            path='login'
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo={'/contacts'}
              />
            }
          />
          <Route
            path='contacts'
            element={
              <PrivateRoute
                component={<ContactsPage />}
                redirectTo={'/login'}
              />
            }
          />
          <Route path='*' element={<Navigate to='/' />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

// При перезавантаженні сторінки /contacts необхідно забезпечити збереження статусу авторизації користувача. Це означає, що система повинна автоматично відновлювати авторизований стан користувача без необхідності повторного введення логіна та пароля.
