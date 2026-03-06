import { useState, useEffect } from 'react';
import { doctorsAPI, appointmentsAPI } from '../services/api';

export default function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ name: '', contact: '', date: '', timing: '', dob: '', tob: '', location: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    doctorsAPI.list().then(setDoctors).catch(() => {});
  }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setDone(false);
    setLoading(true);
    try {
      await appointmentsAPI.create(form);
      setDone(true);
      setForm({ name: '', contact: '', date: '', timing: '', dob: '', tob: '', location: '' });
    } catch (err) {
      setError(err.message || 'Failed to book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content">
      <h1>Book an Appointment</h1>
      {error && <div className="error">{error}</div>}
      {done && <div className="error success">Appointment booked successfully.</div>}
      <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
        <div className="input-group">
          <label>Doctor Name</label>
          <input name="name" value={form.name} onChange={handleChange} required style={{ width: '93%' }} />
        </div>
        <div className="input-group">
          <label>Contact</label>
          <input name="contact" value={form.contact} onChange={handleChange} required style={{ width: '93%' }} />
        </div>
        <div className="input-group">
          <label>Date</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} required style={{ width: '93%' }} />
        </div>
        <div className="input-group">
          <label>Timing</label>
          <input name="timing" value={form.timing} onChange={handleChange} placeholder="e.g. 9:00 AM" required style={{ width: '93%' }} />
        </div>
        <div className="input-group">
          <label>DOB</label>
          <input name="dob" value={form.dob} onChange={handleChange} style={{ width: '93%' }} />
        </div>
        <div className="input-group">
          <label>TOB</label>
          <input name="tob" value={form.tob} onChange={handleChange} style={{ width: '93%' }} />
        </div>
        <div className="input-group">
          <label>Location</label>
          <input name="location" value={form.location} onChange={handleChange} style={{ width: '93%' }} />
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>{loading ? 'Booking...' : 'Book Appointment'}</button>
      </form>
    </div>
  );
}
