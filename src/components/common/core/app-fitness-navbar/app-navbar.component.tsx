import { useNavigate } from 'react-router';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useAppDispatch, useAppSelector } from '../../../../store';
import { clearAuthenticationStateAction } from '../../../../slices';

import styles from './app-navbar.module.scss';

export const AppNavbar = () => {
  const navigate = useNavigate();
  const { token, name, userProfileImage } = useAppSelector((state) => state.authentication);
  const dispatch = useAppDispatch();

  const renderNavbarElement = (name: string, path: string) => {
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

  const renderUserProfile = (name: string) => {
    return (
      <div className={styles.userProfileContainer}>
        {userProfileImage ? (
          <img src={userProfileImage} alt="no-photo" width={30} height={30} className={styles.imageProfile} />
        ) : (
          <AccountCircleIcon />
        )}
        <div
          onClick={() => {
            navigate('user-profile');
          }}
        >
          {name}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.navbar}>
      {!token && renderNavbarElement('Login', '/login')}
      {!token && renderNavbarElement('Register', '/register')}
      {token && renderNavbarElement('Dashboard', '/dashboard')}
      {token && renderNavbarElement('Logout', '/login')}
      {name && renderUserProfile(name)}
    </div>
  );
};
