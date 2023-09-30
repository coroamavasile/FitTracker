import {AppCard} from '../../../common';
import {RegisterForm} from './components/register-form/register-form.component';

import styles from './register-feature.module.scss';

function RegisterFeature() {
  return (
    <div className={styles.root}>
      <div className={styles.leftSide} />
      <div className={styles.rightSide}>
        <AppCard title="Register into FitTrackr">
          <RegisterForm />
        </AppCard>
      </div>
    </div>
  );
}

export default RegisterFeature;
