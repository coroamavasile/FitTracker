import {Route, Routes} from 'react-router-dom';
import HomePage from './pages/home-page/home.page';
import LoginPage from './pages/login-page/login.page';
import RegisterPage from './pages/register-page/register.page';
import {ToastContainer} from 'react-toastify';
import {Navbar} from './common/ui';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
