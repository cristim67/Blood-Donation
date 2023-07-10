import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home/Home"
import Calendar from "./pages/Calendar/Calendar";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
function App() {
  return (
    <Router basename="/">
   
      <Routes>
  
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/register" element={<Register />} />      
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
  // return(
  // <Home/>);
}
export default App;