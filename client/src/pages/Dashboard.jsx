import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div>
      <div className="content">
        <h1 style={{ display: 'block' }}>
          <p>Hello <strong>{user?.username}</strong></p>
        </h1>
        <h3>Welcome To MyFitness!</h3>
        <h4>
          <p>MyFitness is an Application which provides personalized recommendation to its users in the form of diet and exercise. The users can get the prediction whether they are having diabetes or not. If they are predicted positive then appropriate diet and exercise are recommended to the users.</p>
          <p>The system can predict only Type 2 diabetes</p>
          <center>
            <p>Please fill the Analysis form to check your health</p>
          </center>
        </h4>
        <center>
          <h1><Link to="/analysis" className="btn btn-success">Analysis Form</Link></h1>
          <h4><p>You can also check your History</p></h4>
          <Link to="/history" className="btn btn-success"><b>Check History</b></Link>
        </center>
        <center>
          <h4><p>You can also Check Visualization of History</p></h4>
          <Link to="/visualization" className="btn btn-success"><b>Visualization</b></Link>
        </center>
      </div>
    </div>
  );
}
