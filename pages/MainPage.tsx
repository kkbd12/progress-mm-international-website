
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import KeyInfo from '../components/KeyInfo';
import About from '../components/About';
import Transparency from '../components/Transparency';
import Footer from '../components/Footer';
import Clients from '../components/Clients';

interface MainPageProps {
  onNavigateToStaff: () => void;
  onNavigateToJobs: () => void;
  onNavigateToPortfolio: () => void;
  onNavigateToContact: () => void;
}

const MainPage: React.FC<MainPageProps> = ({ onNavigateToStaff, onNavigateToJobs, onNavigateToPortfolio, onNavigateToContact }) => {
  return (
    <div className="bg-gray-50">
      <Header onNavigateToStaff={onNavigateToStaff} onNavigateToJobs={onNavigateToJobs} onNavigateToPortfolio={onNavigateToPortfolio} onNavigateToContact={onNavigateToContact} />
      <main>
        <Hero onNavigateToJobs={onNavigateToJobs} />
        <KeyInfo />
        <About />
        <Clients />
        <Transparency />
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
