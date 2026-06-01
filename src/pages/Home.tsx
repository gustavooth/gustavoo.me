import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Works from "../components/Works";
import ServicosBand from "../components/ServicosBand";
import Explorations from "../components/Explorations";
import About from "../components/About";
import Contact from "../components/Contact";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { setPageSeo, HOME_SEO } from "../lib/seo";

export default function Home() {
  useEffect(() => setPageSeo(HOME_SEO), []);
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
      <FloatingWhatsApp />
    </>
  );
}
