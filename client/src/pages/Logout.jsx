import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  //******************//
  //***USEE EFFECTS***//
  //******************//

  useEffect(() => {
    navigate('/login');
  }, [navigate]);

  //*********//
  //***JSX***//
  //*********//

  return (
    <div>
      <h1>Loggin out...</h1>
    </div>
  );
}

export default Logout;
