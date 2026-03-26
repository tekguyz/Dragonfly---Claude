import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AnnouncementBar from '@/components/AnnouncementBar';
import MenuSection from '@/components/MenuSection';
import AboutSection from '@/components/AboutSection';
import Gallery from '@/components/Gallery';
import EventsSection from '@/components/EventsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import RevealOnScroll from '@/components/RevealOnScroll';
import ChatWidget from '@/components/ChatWidget';
import MobileOrderBar from '@/components/MobileOrderBar';

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-background text-textPrimary selection:bg-primary selection:text-background pb-20 md:pb-0">
      <Navbar />
      <Hero />
      <AnnouncementBar />
      <RevealOnScroll delay={100}>
        <MenuSection />
      </RevealOnScroll>
      <RevealOnScroll delay={100}>
        <AboutSection />
      </RevealOnScroll>
      <RevealOnScroll delay={100}>
        <Gallery />
      </RevealOnScroll>
      <RevealOnScroll delay={100}>
        <EventsSection />
      </RevealOnScroll>
      <RevealOnScroll delay={100}>
        <ContactSection />
      </RevealOnScroll>
      <ChatWidget />
      <MobileOrderBar />
      <Footer />
    </main>
  );
}
