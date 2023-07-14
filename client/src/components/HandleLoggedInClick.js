import { useState } from 'react';
import { Navigate
 } from 'react-router';


const HandleLoggedInClick=()=>{

const [redirectToLoggedIn, setRedirectToLoggedIn] = useState(false);
const [redirectToLoggedOut, setRedirectToLoggedOut] = useState(false);
const [isLogged, setIsLogged] = useState(false);

const handleLoggedInClick = () => {
    setRedirectToLoggedIn(true);
};

  const handleLoggedOutClick = () => {
    setRedirectToLoggedOut(true);
};
if (redirectToLoggedIn) {
    return <Navigate to="/calendar" />;
  }

if (redirectToLoggedOut) {
    return <Navigate to="/inregistrare" />;
  }

  return (
    <div>
    {isLogged ? (
      <button onClick={handleLoggedInClick}>Programează-te</button>
    ) : (
      <button onClick={handleLoggedOutClick}>Programează-te</button>
    )}
  </div>

  );
};
export default HandleLoggedInClick;