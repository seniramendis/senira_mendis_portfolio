import Nav       from '@/components/sections/Nav';
import Hero      from '@/components/sections/Hero';
import Marquee   from '@/components/sections/Marquee';
import About     from '@/components/sections/About';
import Skills    from '@/components/sections/Skills';
import Projects  from '@/components/sections/Projects';
import Leadership from '@/components/sections/Leadership';
import Contact   from '@/components/sections/Contact';
import Footer    from '@/components/sections/Footer';
import Cursor    from '@/components/ui/Cursor';
import ProgressBar from '@/components/ui/ProgressBar';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function Home() {
  return (
    <>
      <Cursor />
      <ProgressBar />
      <WhatsAppButton />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
