import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { exerciseAPI } from '../services/api';

export default function ExercisePlan() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    exerciseAPI.list()
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
      <h1>Your Exercise Plan as per Your Analysis form is as follows:</h1><br />
      {list.map((ex, i) => (
        <table key={ex._id || i} className="legacy-table" border="5" cellPadding="5" cellSpacing="5">
          <tbody>
            <tr><th>Date</th><td>{ex.date}</td></tr>
            <tr><th>Time</th><td>{ex.time}</td></tr>
            <tr><th>e1</th><td>{ex.e1}</td></tr>
            <tr><th>e2</th><td>{ex.e2}</td></tr>
            <tr><th>e3</th><td>{ex.e3}</td></tr>
            <tr><th>e4</th><td>{ex.e4}</td></tr>
            <tr><th>e5</th><td>{ex.e5}</td></tr>
            <tr><th>e6</th><td>{ex.e6}</td></tr>
            <tr><th>e7</th><td>{ex.e7}</td></tr>
            <tr><th>e8</th><td>{ex.e8}</td></tr>
            <tr><th>e9</th><td>{ex.e9}</td></tr>
            <tr><th>e10</th><td>{ex.e10}</td></tr>
            <tr><th>e11</th><td>{ex.e11}</td></tr>
            <tr><th>Total</th><td>{ex.total}</td></tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}
