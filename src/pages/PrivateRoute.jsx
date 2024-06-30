import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/auth/selectors';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { isLoggedIn, token } = useSelector(selectAuth);
  if (!isLoggedIn && token) {
    return <p>Loading...</p>;
  }

  if (!isLoggedIn && !token) {
    return <Navigate to='/login' />;
  }
  return <Outlet />;
};
export default PrivateRoute;