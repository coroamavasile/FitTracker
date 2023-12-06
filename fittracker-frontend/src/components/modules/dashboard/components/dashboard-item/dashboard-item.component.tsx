import styles from './dashboard-item.module.scss';

interface DashboardItemProps {
  title: string;
  value: string | number;
}

export const DashboardItem = (props: DashboardItemProps) => {
  const { title, value } = props;

  return (
    <div className={styles.dashboardItemContainer}>
      <div className={styles.title}>{title}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};
