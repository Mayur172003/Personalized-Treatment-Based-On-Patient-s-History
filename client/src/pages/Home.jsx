import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="span12 well">
      <div style={{ marginBottom: 24 }}>
        <h4 align="center" style={{ fontSize: '3vw', color: '#00cc44', textShadow: '0.5px 0.5px 1px black, 0 0 5px black, 0 0 5px darkblue' }}>
          <strong>Take a step for your Health Diagnose!!</strong>
        </h4>
        <br />
      </div>
      <div>
        <h1 style={{ display: 'block' }}>Welcome To MyFitness!</h1>
        <h4>
          <p>MyFitness is an Application which provides personalized recommendation to its users in the form of diet and exercise. The users can get the prediction whether they are having diabetes or not. If they are predicted positive then personalized diet and exercise are recommended to the users.</p>
          <center>
            <p>The system can predict only Type 2 diabetes</p>
            <p>Please LOGIN or SIGN UP to Continue</p>
          </center>
        </h4>
      </div>
      <br /><br />
    </div>
  );
}
