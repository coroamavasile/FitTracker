import {useNavigate} from 'react-router';

import styles from './app-navbar.module.scss';

export const AppNavbar = () => {
  const navigate = useNavigate();

  const renderNavbarElement = (name: string, path: string) => {
    return (
      <div className={styles.navbarItem} onClick={() => navigate(path)}>
        {name}
      </div>
    );
  };

  return (
    <div className={styles.navbar}>
      {renderNavbarElement('Login', '/login')}
      {renderNavbarElement('Register', '/register')}
    </div>
  );
};
