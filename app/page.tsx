import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AnnouncementBar from '@/components/AnnouncementBar';
import MenuSection from '@/components/MenuSection';
import AboutSection from '@/components/AboutSection';
import Gallery from '@/components/Gallery';
import EventsSection from '@/components/EventsSection';
import ContactSection from '@/components/ContactSection';
import ChatWidget from '@/components/ChatWidget';
import MobileOrderBar from '@/components/MobileOrderBar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-textPrimary selection:bg-primary selection:text-background">
      <Navbar />
      <Hero />
      <AnnouncementBar />
      <MenuSection />
      <AboutSection />
      <Gallery />
      <EventsSection />
      <ContactSection />
      <ChatWidget />
      <MobileOrderBar />
      <Footer />
    </main>
  );
}
