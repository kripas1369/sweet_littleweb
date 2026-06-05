import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import VideoReveal from "./components/VideoReveal";
import Stats from "./components/Stats";
import TrustedPartners from "./components/TrustedPartners";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import WhyChooseUs from "./components/WhyChooseUs";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import FloatingContact from "./components/FloatingContact";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <FloatingContact />
      <main>
        <Navbar />
        <Hero />
        <VideoReveal />
        <Stats />
        <TrustedPartners />
        <Services />
        <Pricing />
        <WhyChooseUs />
        <Portfolio />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}
