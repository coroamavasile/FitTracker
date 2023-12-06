import { DashboardItem } from './components';

import styles from './dashboard.module.scss';

export const DashboardFeature = () => {
  return (
    <div>
      <div className={styles.headerContainer}>
        <DashboardItem title="Calories" value="2600" />
        <DashboardItem title="Carbos" value="2600" />
        <DashboardItem title="Fats" value="2600" />
        <DashboardItem title="Proteins" value="2600" />
        <DashboardItem title="Weight" value="2600" />
        <DashboardItem title="Burnt Calories" value="2600" />
        <DashboardItem title="Calories Max." value="2600" />
      </div>
    </div>
  );
};
