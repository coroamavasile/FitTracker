import {useNavigate} from 'react-router';

import styles from './app-navbar.module.scss';
import {useAppDispatch, useAppSelector} from '../../../store';
import {clearAuthenticationStateAction} from '../../../slices';

export const AppNavbar = () => {
  const navigate = useNavigate();
  const {token} = useAppSelector((state) => state.authentication);
  const dispatch = useAppDispatch();

  const renderNavbarElement = (
    name: string,
    path: string,
    publicRoute: boolean = true
  ) => {
    if (publicRoute)
      return (
        <div
          className={styles.navbarItem}
          onClick={() => {
            if (name === 'Logout') {
              dispatch(clearAuthenticationStateAction());
            }
            navigate(path);
          }}
        >
          {name}
        </div>
      );
  };

  return (
    <div className={styles.navbar}>
      {renderNavbarElement('Login', '/login', !token)}
      {renderNavbarElement('Register', '/register', !token)}
      {renderNavbarElement('Logout', '/login', !!token)}
    </div>
  );
};
