import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { analysisAPI } from '../services/api';

export default function History() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    analysisAPI.history()
      .then(setList)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      {list.length === 0 ? (
        <center>
          <h1>No Record found<br />Please fill the Analysis Form</h1>
          <h1><Link to="/analysis" className="btn btn-success">Analysis Form</Link></h1>
        </center>
      ) : (
        <>
          <h1>Your Previous History is as Follows</h1><br />
          <table className="legacy-table" border="5" cellPadding="5" cellSpacing="5">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Age</th>
                <th>Height</th>
                <th>Weight</th>
                <th>Insulin Before Meal</th>
                <th>Insulin After Meal</th>
                <th>Glucose Before Meal</th>
                <th>Glucose After Meal</th>
                <th>Diabetes Pedigree Function</th>
                <th>Blood Pressure Systolic</th>
                <th>Blood Pressure Distolic</th>
                <th>A1C Test</th>
                <th>OGTT Test</th>
                <th>Prediction</th>
              </tr>
            </thead>
            <tbody>
              {list.map((r) => (
                <tr key={r._id}>
                  <td>{r.date}</td>
                  <td>{r.time}</td>
                  <td>{r.age}</td>
                  <td>{r.height}</td>
                  <td>{r.weight}</td>
                  <td>{r.insulin1}</td>
                  <td>{r.insulin2}</td>
                  <td>{r.glucose1}</td>
                  <td>{r.glucose2}</td>
                  <td>{r.diabetesPedigreeFunction}</td>
                  <td>{r.bloodPressure1}</td>
                  <td>{r.bloodPressure2}</td>
                  <td>{r.haemoglobinA1C}</td>
                  <td>{r.oralGlucoseToleranceTest}</td>
                  <td>{r.prediction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
