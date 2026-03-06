import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="content">
      <h3>Welcome Admin!</h3>
      <h4><center><p>List of Operations</p></center></h4>
      <center>
        <h1><Link to="/admin/doctors" className="btn btn-success">View Doctor List</Link></h1>
        <Link to="/admin/add-doctor" className="btn btn-success"><b>Add New Doctor</b></Link>
      </center>
    </div>
  );
}
