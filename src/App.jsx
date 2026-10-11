import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ThirtySeconds from './components/ThirtySeconds';
import WhyNow from './components/WhyNow';
import Vision from './components/Vision';
import Priorities from './components/Priorities';
import ImpactCards from './components/ImpactCards';
import Engagements from './components/Engagements';
import Timeline from './components/Timeline';
import Candidate from './components/Candidate';
import News from './components/News';
import IdeaForm from './components/IdeaForm';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import usePageMotion from './hooks/usePageMotion';

export default function App() {
  usePageMotion();
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <ThirtySeconds />
        <WhyNow />
        <Vision />
        <Priorities />
        <ImpactCards />
        <Engagements />
        <Timeline />
        <Candidate />
        <News />
        <IdeaForm />
        <FinalCTA />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
