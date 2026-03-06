import { useState, useEffect } from 'react';
import { doctorsAPI } from '../services/api';

export default function ViewDoctors() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    doctorsAPI.list()
      .then(setList)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (list.length === 0) return <p>No doctors listed yet.</p>;

  return (
    <div className="content">
      <h1>View Doctor List</h1>
      <div style={{ marginTop: 20 }}>
        {list.map((doc) => (
          <div key={doc._id} style={{ padding: 16, marginBottom: 12, background: '#f5f5f5', border: '1px solid #e3e3e3', borderRadius: 4 }}>
            <p><strong>{doc.name}</strong></p>
            <p>Specialization: {doc.specialization}</p>
            <p>Location: {doc.location}</p>
            <p>Timings: {doc.timings}</p>
            {doc.ccc && <p>Contact: {doc.ccc}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
