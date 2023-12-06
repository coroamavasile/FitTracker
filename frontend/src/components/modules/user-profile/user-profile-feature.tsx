import { useEffect } from 'react';
import { AppCard } from '../..';
import { useAppDispatch, useAppSelector } from '../../../store';
import { AccountForm } from './components/account-form/account-form.component';

import styles from './user-profile-feature.module.scss';
import { getUserAction } from '../../../slices';
import { NOT_AVAILABLE } from '../../../constants';
import { Avatar } from '@mui/material';

export const UserProfileFeature = () => {
  const { userId } = useAppSelector((state) => state.authentication);
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getUserAction(userId));
    }
  }, [userId]);

  return (
    <div>
      <AppCard height={170}>
        <div className={styles.headerContainer}>
          <div className={styles.imageContainer}>
            <Avatar alt={currentUser?.name} src={currentUser?.profileImage} />
            <div>
              <p className={styles.name}>{currentUser?.name ?? NOT_AVAILABLE}</p>
              <p className={styles.name}>
                Registration Date:
                {currentUser?.registrationDate
                  ? new Date(currentUser.registrationDate).toLocaleDateString()
                  : NOT_AVAILABLE}
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className={styles.accountInfoContainer}>
          <h3>Account</h3>
          {currentUser && <AccountForm user={currentUser} />}
        </div>
      </AppCard>
    </div>
  );
};
