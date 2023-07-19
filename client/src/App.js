import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home/Home"
import Calendar from "./pages/Calendar/Calendar";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import UserOtp from "./pages/UserOtp/UserOtp";
import Logout from "./pages/Logout/Logout"
import Preloader from './components/Preloader';
import {PreloaderProvider} from './components/PreloaderProvider';

function App() {

    return (
        // <PreloaderProvider>
        //   <Preloader/>
        <Router basename="/">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/calendar" element={<Calendar/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/user-otp" element={<UserOtp/>}/>
                <Route path="/logout" element={<Logout/>}/>
            </Routes>
        </Router>
        // </PreloaderProvider>
    );
}

export default App;