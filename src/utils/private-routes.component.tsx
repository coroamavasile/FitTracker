import { Navigate, Outlet } from 'react-router-dom';

interface AppPrivateRoutesProps {
  token: string | undefined;
}

export const AppPrivateRoutes = (props: AppPrivateRoutesProps) => {
  const { token } = props;

  return token ? <Outlet /> : <Navigate to="/login" />;
};
