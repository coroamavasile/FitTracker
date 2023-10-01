import {AppCard} from '../../../common';
import {useAppSelector} from '../../../store';
import {Button, TextField} from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import styles from './user-profile-feature.module.scss';

export const UserProfileFeature = () => {
  const {userProfileImage, email} = useAppSelector(
    (state) => state.authentication
  );

  const renderUserImageProfileContainer = () => {
    return (
      <AppCard height={170}>
        <div className={styles.headerContainer}>
          <div className={styles.imageContainer}>
            {userProfileImage ? (
              <img
                src={userProfileImage}
                alt="no-photo"
                width={150}
                height={150}
                className={styles.profileImage}
              />
            ) : (
              <AccountCircleIcon />
            )}

            <div>
              <p className={styles.name}>John Doe</p>
              <p className={styles.name}>Registration Date: </p>
            </div>
          </div>

          <div className={styles.updateBtnContainer}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              className={styles.updateBtn}
            >
              Update
            </Button>
          </div>
        </div>
        <hr />
        <div className={styles.accountInfoContainer}>
          <h3>Account</h3>
          <TextField label="Name" fullWidth />
          <TextField label="Email" value={email} disabled fullWidth />
          <TextField label="Password" fullWidth />
          <TextField label="Confirm Password" fullWidth />
        </div>
      </AppCard>
    );
  };

  const renderUserInformationsContainer = () => {
    return <div></div>;
  };

  return (
    <div className={styles.container}>
      {renderUserImageProfileContainer()}
      {renderUserInformationsContainer()}
    </div>
  );
};
