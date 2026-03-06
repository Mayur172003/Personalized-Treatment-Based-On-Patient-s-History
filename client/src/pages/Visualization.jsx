import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { visualizationAPI } from '../services/api';

export default function Visualization() {
  const [diet, setDiet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    visualizationAPI.diet()
      .then(setDiet)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (diet.length === 0) {
    return (
      <center>
        <h1>No data for visualization yet. Please fill the Analysis Form.</h1>
        <Link to="/analysis" className="btn btn-success">Analysis Form</Link>
      </center>
    );
  }

  return (
    <div className="content">
      <p align="right"><Link to="/visualization" className="btn btn-success">Back</Link></p>
      <h1>Visualization</h1>
      <p>Diet total carbs by record:</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end', minHeight: 200 }}>
        {diet.map((d, i) => (
          <div
            key={d._id || i}
            style={{
              width: 40,
              background: '#00cc44',
              height: Math.max(20, (d.total || 0) / 2),
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
            title={`${d.date} ${d.time}: ${d.total}`}
          >
            <span style={{ fontSize: 10 }}>{d.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
