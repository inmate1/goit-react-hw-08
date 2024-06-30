import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

const AuthNav = () => {
const buildLinkClass = ({ isActive }) => {
  return `${css.link} ${isActive ? css.active : ''}`;
};

  return (
    <div>
      <NavLink className={buildLinkClass} to='/register'>
        Register
      </NavLink>
      <NavLink className={buildLinkClass} to='/login'>
        Log In
      </NavLink>
    </div>
  );
};
export default AuthNav;