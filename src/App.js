import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from './components/auth/RegistrationForm';
import LoginForm from './components/auth/LoginForm';
import OtpForm from './components/auth/OtpForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import DashboardHome from './components/dashboard/Home';
import ProtectedRoute from './utils/ProtectedRoute';
import LandingPage from './components/home';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        {/*<Route path="/" element={<Navigate to="/register" />} />*/}
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/register' element={<RegistrationForm />}/>
        <Route path="/otp" element={<OtpForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/chat" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
        <Route path="/chat/:conversationId" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
        {/*<Route path="/dashboard" element={<DashboardHome />} />*/}
      </Routes>
    </div>
    </Router>
  );
}

export default App;
