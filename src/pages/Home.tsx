import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Works from "../components/Works";
import ServicosBand from "../components/ServicosBand";
import Explorations from "../components/Explorations";
import About from "../components/About";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Works />
        <ServicosBand />
        <Explorations />
        <About />
      </main>
      <Contact />
    </>
  );
}
