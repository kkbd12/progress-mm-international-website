

import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import KeyInfo from '../components/KeyInfo';
import About from '../components/About';
import Transparency from '../components/Transparency';
import Footer from '../components/Footer';
import Clients from '../components/Clients';

const MainPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <main>
        <Hero />
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
