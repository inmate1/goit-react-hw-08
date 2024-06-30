import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import css from './Navigation.module.css';

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
const buildLinkClass = ({ isActive }) => {
  return `${css.link} ${isActive ? css.active : ''}`;
};
  return (
    <nav>
      <NavLink className={buildLinkClass} to='/'>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={buildLinkClass} to='/contacts'>
          Contacts
        </NavLink>
      )}
    </nav>
  );
};
export default Navigation;
