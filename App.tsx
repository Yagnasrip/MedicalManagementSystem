import React, { useState } from 'react';
import { User, Shield, Stethoscope } from 'lucide-react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import AdminDashboard from './components/AdminDashboard';

export type UserRole = 'patient' | 'doctor' | 'admin' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'dashboard'>('landing');

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('landing');
  };

  const renderDashboard = () => {
    if (!currentUser) return null;

    switch (currentUser.role) {
      case 'patient':
        return <PatientDashboard user={currentUser} onLogout={handleLogout} />;
      case 'doctor':
        return <DoctorDashboard user={currentUser} onLogout={handleLogout} />;
      case 'admin':
        return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
      default:
        return null;
    }
  };

  if (currentPage === 'landing') {
    return <LandingPage onGetStarted={() => setCurrentPage('login')} />;
  }

  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} onBack={() => setCurrentPage('landing')} />;
  }

  return renderDashboard();
}

export default App;