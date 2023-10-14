import { AppCard } from '../../common';
import { LoginForm } from './components/login-form/login-form.component';
import styles from './login-feature.module.scss';

export const LoginFeature = () => {
  return (
    <div className={styles.root}>
      <div className={styles.leftSide} />
      <div className={styles.rightSide}>
        <AppCard width={450} height={250} title="Login into FitTrackr">
          <LoginForm />
        </AppCard>
      </div>
    </div>
  );
};
