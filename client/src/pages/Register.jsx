import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== password2) {
      setError('The two passwords do not match');
      return;
    }
    try {
      const data = await authAPI.register({ username, email, password });
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
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

      <div className="login-header">
        <h2>Register</h2>
      </div>

      <div id="sgnfrm">
        <form method="post" onSubmit={handleSubmit} id="sgnfrm1">
          {error && <div className="error">{error}</div>}
          <div className="input-group">
            <label>Username</label>
            <input type="text" name="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter your valid email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password_1" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Confirm password</label>
            <input type="password" name="password_2" placeholder="Re-enter your password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
          </div>
          <div className="input-group">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="submit" className="btn btn-success">Register</button>
          </div>
          <p>Already a member? <Link to="/login" id="lgn2">Log in</Link></p>
        </form>
      </div>
    </>
  );
}
