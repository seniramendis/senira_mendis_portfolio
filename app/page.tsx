import Nav from '@/components/sections/Nav';
import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Services from '@/components/sections/Services';
import Booking from '@/components/sections/Booking'; 
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton'; // <-- IMPORTED HERE

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Booking /> 
      <Contact />
      <Footer />
      
      {/* <-- RENDERED HERE AT THE BOTTOM --> */}
      <WhatsAppButton /> 
    </main>
  );
}