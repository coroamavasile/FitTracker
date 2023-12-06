import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login-page/login.page';
import RegisterPage from './pages/register-page/register.page';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { AppPrivateRoutes } from './utils/private-routes.component';
import { useAppSelector } from './store';
import { UserProfilePage } from './pages/user-profile-page/user-profile.page';
import { AppDrawer } from './components/common/core/app-fitness-navbar/app-drawer.component';
import './styles.scss';
import NutritionLoggerPage from './pages/nutrition-logger-page/nutrition-logger.page';
import ProgressLoggerPage from './pages/progress-logger-page/progress-logger.page';
import DashboardPage from './pages/dashboard-page/dashboard.page';

const App = () => {
  const { token } = useAppSelector((state) => state.authentication);

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Private Routes */}
        <Route
          element={
            <AppDrawer>
              <AppPrivateRoutes token={token} />
            </AppDrawer>
          }
        >
          <Route path="/user-profile" element={<UserProfilePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/nutrition-logger" element={<NutritionLoggerPage />} />
          <Route path="/progress-logger" element={<ProgressLoggerPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
