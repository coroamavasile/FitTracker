import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home-page/home.page';
import LoginPage from './pages/login-page/login.page';
import RegisterPage from './pages/register-page/register.page';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { AppPrivateRoutes } from './utils/private-routes.component';
import { useAppSelector } from './store';
import { UserProfilePage } from './pages/user-profile-page/user-profile.page';
import { AppNavbar } from './components';

const App = () => {
  const { token } = useAppSelector((state) => state.authentication);

  return (
    <div>
      <AppNavbar />
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Private Routes */}
        <Route element={<AppPrivateRoutes token={token} />}>
          <Route path="/user-profile" element={<UserProfilePage />} />
          <Route path="/dashboard" element={<div>User Dashboard</div>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
