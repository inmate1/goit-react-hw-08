import { useSelector } from 'react-redux';
import AuthNav from '../AuthNav/AuthNav';
import Navigation from '../Navigation/Navigation';
import css from './AppBar.module.css';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import UserMenu from '../UserMenu/UserMenu';

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={css.header}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default AppBar;
