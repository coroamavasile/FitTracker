import styles from './navbar.module.scss';
import {useNavigate} from 'react-router';

export const Navbar = () => {
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
