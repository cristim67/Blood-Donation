import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBarOther } from "../../components/NavBarOther";
import { RenderCalendar } from '../../components/RenderCalendar';

const Calendar = () => {

  
  return (
    <div className="App">
        <h1> Calendar </h1>
      <NavBarOther/>
      <RenderCalendar/>
    </div>
  )
  
}

export default Calendar;