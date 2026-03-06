import { useState, useEffect } from 'react';
import { appointmentsAPI } from '../services/api';

export default function DoctorAppointments() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    appointmentsAPI.listDoctor()
      .then(setList)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (list.length === 0) return <p>No appointments.</p>;

  return (
    <div className="content">
      <h1>Appointments</h1>
      <div style={{ marginTop: 20 }}>
        {list.map((a) => (
          <div key={a._id} style={{ padding: 16, marginBottom: 12, background: '#f5f5f5', border: '1px solid #e3e3e3', borderRadius: 4 }}>
            <p><strong>Patient (username):</strong> {a.username}</p>
            <p><strong>Doctor:</strong> {a.name}</p>
            <p><strong>Contact:</strong> {a.contact}</p>
            <p><strong>Date:</strong> {a.date} <strong>Time:</strong> {a.timing}</p>
            {a.location && <p><strong>Location:</strong> {a.location}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
