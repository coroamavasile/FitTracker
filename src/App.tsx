import {Route, Routes} from 'react-router-dom';
import HomePage from './pages/home-page/home.page';
import LoginPage from './pages/login-page/login.page';
import RegisterPage from './pages/register-page/register.page';
import {ToastContainer, toast} from 'react-toastify';
import {AppNavbar} from './common';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <AppNavbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default App;
