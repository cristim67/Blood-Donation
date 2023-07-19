import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavBar} from "../../components/NavBar";
import {Banner} from "../../components/Banner";
import {Footer} from "../../components/Footer";
import {Beneficii} from "../../components/Beneficii";
import {Projects} from "../../components/Projects";
import {Contact} from '../../components/Contact';
import ScrollToTop from '../../components/ScrollToTop';

function Home() {
    return (
        <div className="App">
            <NavBar/>
            <ScrollToTop/>
            <Banner/>
            <Projects/>
            <Beneficii/>
            <Contact/>
            <Footer/>
        </div>
    );
}

export default Home;
