import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dietAPI } from '../services/api';

export default function DietPlan() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    dietAPI.list()
      .then(setList)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (list.length === 0) {
    return (
      <center>
        <h1>No Record found<br />Please fill the Analysis Form</h1>
        <h1><Link to="/analysis" className="btn btn-success">Analysis Form</Link></h1>
      </center>
    );
  }

  return (
    <div>
      <h1>Your Dietplan as per Your Analysis form is as follows:</h1><br />
      {list.map((d, i) => (
        <table key={d._id || i} className="legacy-table" border="5" cellPadding="5" cellSpacing="5">
          <tbody>
            <tr><th>Date</th><td>{d.date}</td></tr>
            <tr><th>Time</th><td>{d.time}</td></tr>
            <tr><th>BreakFast</th><td>{d.d1}</td></tr>
            <tr><th>Lunch</th><td>{d.d2}</td></tr>
            <tr><th>Snack</th><td>{d.d3}</td></tr>
            <tr><th>Dinner</th><td>{d.d4}</td></tr>
            <tr><th>Snack</th><td>{d.d5}</td></tr>
            <tr><th>Total_Calories</th><td>{d.total}</td></tr>
            <tr><th></th><td></td></tr>
            <tr><th></th><td></td></tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}
