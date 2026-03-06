import { useState } from 'react';
import { analysisAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const initial = {
  age: '', height: '', weight: '', insulin1: '', insulin2: '', glucose1: '', glucose2: '',
  diabetesPedigreeFunction: '', bloodPressure1: '', bloodPressure2: '', haemoglobinA1C: '', oralGlucoseToleranceTest: '',
};

const FIELDS = [
  { name: 'age', label: 'Age', placeholder: 'Enter Your Age', hint: '*Please enter in years only' },
  { name: 'height', label: 'Height', placeholder: 'Enter Your Height', hint: '*Please enter in cms only' },
  { name: 'weight', label: 'Weight', placeholder: 'Enter Your Weight', hint: '*Please enter in kgs only' },
  { name: 'insulin1', label: 'Insulin before Meal', placeholder: 'Enter Insulin level before meal', hint: '*Please enter in mIU/L only' },
  { name: 'insulin2', label: 'Insulin after Meal', placeholder: 'Enter Insulin level after meal', hint: '*Please enter in mIU/L only' },
  { name: 'glucose1', label: 'Fasting Glucose Level', placeholder: 'Enter Fasting Glucose Level', hint: '*Please enter in mgs/dL only' },
  { name: 'glucose2', label: 'Glucose after Meal', placeholder: 'Glucose level After Meal', hint: '*Please enter in mgs/dL only' },
  { name: 'diabetesPedigreeFunction', label: 'Diabetes Pedigree Function', placeholder: 'Diabetes Pedigree Function', hint: '' },
  { name: 'bloodPressure1', label: 'Blood Pressure Systolic(Top)', placeholder: 'Enter Your Blood Pressure', hint: '*Please enter in mm/Hg only' },
  { name: 'bloodPressure2', label: 'Blood Pressure Distolic(Bottom)', placeholder: 'Enter Your Blood Pressure', hint: '*Please enter in mm/Hg only' },
  { name: 'haemoglobinA1C', label: 'Hameglobin A1C Test', placeholder: 'Enter your A1C test value', hint: '*Please enter in mg/dL only' },
  { name: 'oralGlucoseToleranceTest', label: 'Oral Glucose Tolerance Test', placeholder: 'Enter your OGTT Test level', hint: '*Please enter in mg/dL only' },
];

export default function Analysis() {
  const { user } = useAuth();
  const [form, setForm] = useState(initial);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setResult(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const data = await analysisAPI.submit(form);
      setResult(data);
      setForm(initial);
    } catch (err) {
      const errors = err.errors || [];
      setError(errors.length ? errors.join('. ') : (err.message || 'Submission failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {user && <h1><p>Hello <strong>{user.username}</strong></p></h1>}
      <h1>Please fill this Analysis form to process further</h1>
      <div align="right"><a href="#params">Click here to know more about the parameters</a></div>

      <form className="analysis-form" autoComplete="off" onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        {FIELDS.map(({ name, label, placeholder, hint }) => (
          <div key={name} className="form-row">
            <label htmlFor={name}>{label}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input
              id={name}
              type={name.includes('Pressure') || name === 'age' || name === 'height' || name === 'weight' ? 'number' : 'text'}
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder}
            />
            {hint && <span className="hint">{hint}</span>}
            <br /><br />
          </div>
        ))}
        <input type="submit" value="submit" disabled={loading} className="btn btn-success" />
      </form>

      {result && (
        <div style={{ marginTop: 24 }}>
          <h1><center>You are Predicted as {result.prediction}</center></h1>
          {(result.prediction === 'Diabetic' || result.prediction === 'Prediabetic') && <h1><center>Please consult a doctor</center></h1>}
          <h1><center>Your Exercise Plan is Generated Successfully</center></h1>
          <br />
          <h1><center>Your Diet Plan is Generated Successfully</center></h1>
          <br />
          <h3><center><span style={{ color: 'red' }}>DISCLAIMER<br />THE PREDICTION IS SOLELY BASED ON THE VALUES OF DIFFERENT PARAMETERS ENTERED BY YOU WHICH IS FED TO THE MACHINE LEARNING ALGORITHMS<br />* PLEASE DO NOT RELY COMPLETELY ON THIS *</span></center></h3>
        </div>
      )}
    </div>
  );
}
