import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { appointmentsAPI } from '../services/api';

export default function ViewAppointments() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    appointmentsAPI.list()
      .then(setList)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (list.length === 0) return <p>No appointments yet. <Link to="/book" className="btn btn-success">Book an Appointment</Link></p>;

  return (
    <div className="content">
      <h1>Your Appointments</h1>
      <div style={{ marginTop: 20 }}>
        {list.map((a) => (
          <div key={a._id} style={{ padding: 16, marginBottom: 12, background: '#f5f5f5', border: '1px solid #e3e3e3', borderRadius: 4 }}>
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
