import {Card, CardContent, Typography} from '@mui/material';

import styles from './app-card.module.scss';

interface AppCardProps {
  children: React.ReactNode;
  title?: string;
  width?: number;
  height?: number;
}

export const AppCard = (props: AppCardProps) => {
  const {children, width = 500, height = 300, title} = props;

  return (
    <Card sx={{minWidth: width, minHeight: height}}>
      {title && (
        <Typography className={styles.title} component="div" variant="h5">
          {title}
        </Typography>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
};
