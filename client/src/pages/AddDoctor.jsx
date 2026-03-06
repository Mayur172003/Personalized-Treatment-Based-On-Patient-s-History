import { useState } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../services/api';

const initial = { name: '', age: '', specialization: '', location: '', timings: '', loginId: '', password: '', ccc: '' };

export default function AddDoctor() {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      await adminAPI.addDoctor(form);
      setSuccess(true);
      setForm(initial);
    } catch (err) {
      setError(err.message || 'Failed to add doctor');
    }
  };

  const fields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'age', label: 'Age', type: 'number', required: true },
    { name: 'specialization', label: 'Specialization', type: 'text', required: true },
    { name: 'location', label: 'Location', type: 'text', required: true },
    { name: 'timings', label: 'Timings', type: 'text', required: true },
    { name: 'loginId', label: 'Login Id', type: 'text', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'ccc', label: 'Contact (CCC)', type: 'text', required: false },
  ];

  return (
    <div className="content">
      <h1>Add New Doctor</h1>
      <p><Link to="/admin">Back to Admin Dashboard</Link></p>
      {error && <div className="error">{error}</div>}
      {success && <div className="error success">Doctor added successfully.</div>}
      <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
        {fields.map(({ name, label, type, required }) => (
          <div key={name} className="input-group">
            <label>{label}</label>
            <input name={name} type={type} value={form[name]} onChange={handleChange} required={required} style={{ width: '93%' }} />
          </div>
        ))}
        <button type="submit" className="btn btn-success">Add Doctor</button>
      </form>
    </div>
  );
}
