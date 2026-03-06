import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../services/api';

export default function AdminDoctors() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    adminAPI.getDoctors()
      .then(setList)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (list.length === 0) return <p>No doctors yet. <Link to="/admin/add-doctor" className="btn btn-success">Add a doctor</Link>.</p>;

  return (
    <div className="content">
      <h1>View Doctor List</h1>
      <p><Link to="/admin">Back to Admin Dashboard</Link></p>
      <div style={{ marginTop: 20 }}>
        {list.map((doc) => (
          <div key={doc._id} style={{ padding: 16, marginBottom: 12, background: '#f5f5f5', border: '1px solid #e3e3e3', borderRadius: 4 }}>
            <p><strong>{doc.name}</strong> — {doc.specialization}</p>
            <p>Location: {doc.location} | Timings: {doc.timings}</p>
            <p>Login ID: {doc.loginId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
