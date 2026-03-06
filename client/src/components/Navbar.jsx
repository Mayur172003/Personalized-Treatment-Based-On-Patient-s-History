import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, role, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div className="header">
        <div style={{ float: 'left', width: 150 }}>
          <img src="/images/logo2.jpg" alt="Logo" style={{ maxWidth: 150, height: 'auto' }} />
        </div>
        <div>
          <div style={{ float: 'right', fontSize: 20, marginTop: 20 }}>
            {!user && (
              <>
                <br /><br /><br />
                <Link to="/login" className="btn btn-success">Login</Link>
                {' '}
                <Link to="/register" className="btn btn-success">Sign up</Link>
              </>
            )}
            {user && role === 'patient' && (
              <>
                <b>Welcome,</b> {user.username}
                {' '}
                <button type="button" className="btn btn-info" onClick={handleLogout}>Logout</button>
              </>
            )}
            {user && role === 'admin' && (
              <>
                <b>Welcome,</b> {user.username}
                {' '}
                <button type="button" className="btn btn-info" onClick={handleLogout}>Logout</button>
              </>
            )}
            {user && role === 'doctor' && (
              <>
                <b>Welcome,</b> {user.username}
                {' '}
                <button type="button" className="btn btn-info" onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>
          <div id="heading">
            <Link to="/" id="title">My Fitness</Link>
          </div>
        </div>
      </div>
      <br /><br />

      <div className="navbar navbar-inverse">
        <div className="navbar-inner">
          <div className="container">
            {!user && (
              <>
                <Link className="brand" to="/"><i className="fa fa-home" aria-hidden="true"></i>&nbsp;HOME</Link>
                <Link className="brand" to="/login">CONTACT</Link>
                <Link className="brand" to="/login">ABOUT US</Link>
                <Link className="brand" to="/admin/login">ADMIN LOGIN</Link>
                <Link className="brand" to="/doctor/login">DOCTOR LOGIN</Link>
              </>
            )}
            {user && role === 'patient' && (
              <>
                <Link className="brand" to="/dashboard"><i className="fa fa-home" aria-hidden="true"></i>&nbsp;HOME</Link>
                <Link className="brand" to="/dashboard">CONTACT</Link>
                <Link className="brand" to="/dashboard">ABOUT US</Link>
                <Link className="brand" to="/history">ANALYSIS HISTORY</Link>
                <Link className="brand" to="/exercise">EXCERISE PLAN</Link>
                <Link className="brand" to="/diet">DIETPLAN</Link>
                <Link className="brand" to="/visualization">VISUALIZATION</Link>
                <Link className="brand" to="/doctors">VIEW DOCTOR LIST</Link>
                <Link className="brand" to="/book">BOOK AN APPONTMENT</Link>
                <Link className="brand" to="/appointments">VIEW APPOINTMENT</Link>
              </>
            )}
            {user && role === 'admin' && (
              <>
                <Link className="brand" to="/admin"><i className="fa fa-home" aria-hidden="true"></i>&nbsp;HOME</Link>
                <Link className="brand" to="/admin">CONTACT</Link>
                <Link className="brand" to="/admin">ABOUT US</Link>
                <Link className="brand" to="/admin/doctors">VIEW DOCTOR LIST</Link>
                <Link className="brand" to="/admin/add-doctor">ADD NEW DOCTOR</Link>
              </>
            )}
            {user && role === 'doctor' && (
              <>
                <Link className="brand" to="/doctor/appointments"><i className="fa fa-home" aria-hidden="true"></i>&nbsp;HOME</Link>
                <Link className="brand" to="/doctor/appointments">CONTACT</Link>
                <Link className="brand" to="/doctor/appointments">ABOUT US</Link>
                <Link className="brand" to="/doctor/appointments">VIEW APPOINTMENT</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
