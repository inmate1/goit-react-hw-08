import { useSelector } from "react-redux";
import { selectAuth } from "../redux/auth/selectors";
import { Navigate, Outlet } from "react-router-dom";

 
const RestrictedRoute = () => {
     const { isLoggedIn, token } = useSelector(selectAuth);
     if (!isLoggedIn && token) {
       return <p>Loading...</p>;
     }

     if (isLoggedIn && token) {
       return <Navigate to='/contacts' />;
     }
     return <Outlet />;
}
export default RestrictedRoute;

