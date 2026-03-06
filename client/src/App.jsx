import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import History from './pages/History';
import DietPlan from './pages/DietPlan';
import ExercisePlan from './pages/ExercisePlan';
import Visualization from './pages/Visualization';
import ViewDoctors from './pages/ViewDoctors';
import BookAppointment from './pages/BookAppointment';
import ViewAppointments from './pages/ViewAppointments';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AddDoctor from './pages/AddDoctor';
import AdminDoctors from './pages/AdminDoctors';
import DoctorLogin from './pages/DoctorLogin';
import DoctorAppointments from './pages/DoctorAppointments';

function PrivatePatient({ children }) {
  const { user, role } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && role !== 'patient') return <Navigate to="/" replace />;
  return children;
}

function PrivateAdmin({ children }) {
  const { user, role } = useAuth();
  if (!user || role !== 'admin') return <Navigate to="/admin/login" replace />;
  return children;
}

function PrivateDoctor({ children }) {
  const { user, role } = useAuth();
  if (!user || role !== 'doctor') return <Navigate to="/doctor/login" replace />;
  return children;
}

export default function App() {
  const { loading } = useAuth();
  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="doctor/login" element={<DoctorLogin />} />

        <Route path="dashboard" element={<PrivatePatient><Dashboard /></PrivatePatient>} />
        <Route path="analysis" element={<PrivatePatient><Analysis /></PrivatePatient>} />
        <Route path="history" element={<PrivatePatient><History /></PrivatePatient>} />
        <Route path="diet" element={<PrivatePatient><DietPlan /></PrivatePatient>} />
        <Route path="exercise" element={<PrivatePatient><ExercisePlan /></PrivatePatient>} />
        <Route path="visualization" element={<PrivatePatient><Visualization /></PrivatePatient>} />
        <Route path="doctors" element={<PrivatePatient><ViewDoctors /></PrivatePatient>} />
        <Route path="book" element={<PrivatePatient><BookAppointment /></PrivatePatient>} />
        <Route path="appointments" element={<PrivatePatient><ViewAppointments /></PrivatePatient>} />

        <Route path="admin" element={<PrivateAdmin><AdminDashboard /></PrivateAdmin>} />
        <Route path="admin/doctors" element={<PrivateAdmin><AdminDoctors /></PrivateAdmin>} />
        <Route path="admin/add-doctor" element={<PrivateAdmin><AddDoctor /></PrivateAdmin>} />

        <Route path="doctor/appointments" element={<PrivateDoctor><DoctorAppointments /></PrivateDoctor>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
