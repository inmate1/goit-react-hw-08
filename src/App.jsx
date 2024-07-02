import './App.css';

import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { lazy, useEffect } from 'react';
import PrivateRoute from './pages/PrivateRoute';
import RestrictedRoute from './pages/RestrictedRoute';
import { useDispatch, useSelector } from 'react-redux';

import { refreshUser } from './redux/auth/operations';
import { Toaster } from 'react-hot-toast';
import { selectIsRefreshing } from './redux/auth/selectors';
import Spinner from './components/Spinner/Spinner';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegistrationPage = lazy(() =>
  import('./pages/RegistrationPage/RegistrationPage')
);
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));

const App = () => {
  const isRefreshing = useSelector(selectIsRefreshing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);


  return isRefreshing ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
      <Spinner />
    </div>
  ) : (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path='/register'
            element={
              <RestrictedRoute
                component={<RegistrationPage />}
                redirectTo={'/contacts'}
              />
            }
          />
          <Route
            path='/login'
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
};

export default App;
