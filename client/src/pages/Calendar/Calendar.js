import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavBarOther} from "../../components/NavBarOther";
import {RenderCalendar} from '../../components/RenderCalendar';
import {Calendare} from '../../components/Calendare';

const Calendar = () => {

    const isLoggedIn = localStorage.getItem('email');
    if (!isLoggedIn)
        window.location.replace("/");

    return (
        <div className="App">
            <NavBarOther/>
            <Calendare/>
        </div>
    )

}

export default Calendar;