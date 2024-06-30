import './App.css';

import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { lazy, useEffect } from 'react';
import PrivateRoute from './pages/PrivateRoute';
import RestrictedRoute from './pages/RestrictedRoute';
import { useDispatch } from 'react-redux';

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

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <Toaster />

      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route element={<RestrictedRoute />}>
            <Route path='/register' element={<RegistrationPage />} />
            <Route path='/login' element={<LoginPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/contacts' element={<ContactsPage />} />
          </Route>
          <Route path='*' element={<Navigate to='/' />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
