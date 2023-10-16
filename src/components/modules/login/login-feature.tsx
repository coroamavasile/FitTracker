import { useNavigate } from 'react-router';
import { AppCard } from '../../common';
import { LoginForm } from './components/login-form/login-form.component';

import styles from './login-feature.module.scss';

export const LoginFeature = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <div className={styles.leftSide} />
      <div className={styles.rightSide}>
        <AppCard width={450} height={250} title="Login into FitTrackr">
          <LoginForm />
          <p className={styles.footerText}>
            You don't have an account?{' '}
            <b className={styles.link} onClick={() => navigate('/register')}>
              Create one now
            </b>
          </p>
        </AppCard>
      </div>
    </div>
  );
};
