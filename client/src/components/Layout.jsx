import { Outlet, Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="wrap">
      <Navbar />
      <div>
        <Outlet />
      </div>
      <footer>
        <div className="f1">
          <div style={{ float: 'left' }}>
            <p className="text-right text-info">&copy; 2020 My Fitness</p>
          </div>
          <div style={{ float: 'right' }}>
            <p className="text-right text-info">
              <span><Link style={{ borderRight: '2px solid', paddingRight: 8, marginRight: 8 }} to="/admin/login">Admin</Link></span>
              Follow On:
              <span><a href="https://www.facebook.com" target="_blank" rel="noreferrer"><i className="fa fa-facebook" aria-hidden="true"></i></a></span>
              <span><a href="https://twitter.com" target="_blank" rel="noreferrer"><i className="fa fa-twitter" aria-hidden="true"></i></a></span>
              <span><a href="https://www.instagram.com" target="_blank" rel="noreferrer"><i className="fa fa-instagram" aria-hidden="true"></i></a></span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
