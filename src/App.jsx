import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Patient/Home';
import Login from './pages/Receptionist/Login';
import Dashboard from './pages/Receptionist/Dashboard';
import QueueManagement from './pages/Receptionist/QueueManagement';
import WalkInBooking from './pages/Receptionist/WalkInBooking';
import OverrideToken from './pages/Receptionist/OverrideToken';
import DepartmentSelection from './pages/Patient/DepartmentSelection';
import DoctorSelection from './pages/Patient/DoctorSelection';
import TimeSlotSelection from './pages/Patient/TimeSlotSelection';
import BookingDetails from './pages/Patient/BookingDetails';
import Confirmation from './pages/Patient/Confirmation';
import LiveToken from './pages/Patient/LiveToken';
import Layout from './components/Layout';
import './App.css';

function App() {
  return (
    <Layout>
      <Routes>
        {/* Patient Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/patient/department" element={<DepartmentSelection />} />
        <Route path="/patient/doctor" element={<DoctorSelection />} />
        <Route path="/patient/time-slot" element={<TimeSlotSelection />} />
        <Route path="/patient/details" element={<BookingDetails />} />
        <Route path="/patient/confirmation" element={<Confirmation />} />
        <Route path="/patient/live-token" element={<LiveToken />} />

        {/* Receptionist Routes */}
        <Route path="/receptionist/login" element={<Login />} />
        <Route path="/receptionist/dashboard" element={<Dashboard />} />
        <Route path="/receptionist/queue" element={<QueueManagement />} />
        <Route path="/receptionist/walk-in" element={<WalkInBooking />} />
        <Route path="/receptionist/override" element={<OverrideToken />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
