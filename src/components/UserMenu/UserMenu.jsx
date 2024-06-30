import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import css from './UserMenu.module.css';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
const handleLogout = () => {
  dispatch(logOut());
  navigate('/');
};
  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {user.name}</p>
      <button type='button' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
