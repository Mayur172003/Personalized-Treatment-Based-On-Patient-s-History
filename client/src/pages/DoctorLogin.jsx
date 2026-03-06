import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doctorAPI } from '../services/api';

export default function DoctorLogin() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await doctorAPI.login({ loginId, password });
      login(data);
      navigate('/doctor/appointments');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <>
      <div id="fther1">
        <div id="chld1">
          <img src="/images/logo2.jpg" alt="Logo" />
        </div>
        <div id="smchild2">
          <center><span className="name">My Fitness</span></center>
        </div>
      </div>
      <br />
      <div className="login-header">
        <h2>Doctor Login</h2>
      </div>
      <div id="lgn">
        <form onSubmit={handleSubmit} id="lgn1" autoComplete="off">
          {error && <div className="error">{error}</div>}
          <div className="input-group">
            <label>Login ID</label>
            <input type="text" value={loginId} onChange={(e) => setLoginId(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="input-group">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="submit" className="btn btn-success">Login</button>
          </div>
        </form>
      </div>
      <p><Link to="/">Back to Home</Link></p>
    </>
  );
}
