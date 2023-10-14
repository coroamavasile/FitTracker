import { useEffect } from 'react';

import { useNavigate } from 'react-router';
import { useAppSelector } from '../../store';
import { LoginFeature } from '../../components';

const LoginPage = () => {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.authentication);

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return <LoginFeature />;
};

export default LoginPage;
