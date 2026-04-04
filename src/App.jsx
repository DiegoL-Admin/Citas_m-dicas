import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SearchDoctor from './pages/SearchDoctor';
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';
import DoctorProfile from './pages/DoctorProfile';
import DoctorPanel from './pages/DoctorPanel';
import Confirmation from './pages/Confirmation';

const PAGES = {
  login: Login,
  dashboard: Dashboard,
  search: SearchDoctor,
  book: BookAppointment,
  appointments: MyAppointments,
  doctorProfile: DoctorProfile,
  doctorPanel: DoctorPanel,
  confirmation: Confirmation,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = (page) => setCurrentPage(page);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} navigate={navigate} />;
  }

  const PageComponent = PAGES[currentPage] || Dashboard;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F6F7FA', fontFamily: "'DM Sans', sans-serif" }}>
      <Sidebar currentPage={currentPage} navigate={navigate} onLogout={handleLogout} />
      <main style={{ flex: 1, marginLeft: 240, minHeight: '100vh', overflow: 'auto' }}>
        <PageComponent navigate={navigate} />
      </main>
    </div>
  );
}
