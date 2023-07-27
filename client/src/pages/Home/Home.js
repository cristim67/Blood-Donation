import { NavBar } from "../../components/NavBar";
import { Banner } from "../../components/Banner";
import { Footer } from "../../components/Footer";
import { Beneficii } from "../../components/Beneficii";
import { Projects } from "../../components/Projects";
import { Contact } from "../../components/Contact";
import { Newsletter } from "../../components/Newsletter";
import ScrollToTop from "../../components/ScrollToTop";

function Home() {
  return (
    <div className="App">
      <NavBar />
      <ScrollToTop />
      <Banner />
      <Projects />
      <Beneficii />
      <Contact />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
