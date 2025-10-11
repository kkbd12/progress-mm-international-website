import React, { useState, useEffect } from 'react';
import MainPage from './pages/MainPage';
import StaffPage from './pages/StaffPage';
import JobsPage from './pages/JobsPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';

type Page = 'main' | 'staff' | 'jobs' | 'portfolio' | 'contact';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('main');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const navigate = (page: Page) => {
    setCurrentPage(page);
  };

  switch (currentPage) {
    case 'staff':
      return <StaffPage onNavigateHome={() => navigate('main')} />;
    case 'jobs':
      return <JobsPage onNavigateHome={() => navigate('main')} />;
    case 'portfolio':
      return <PortfolioPage onNavigateHome={() => navigate('main')} />;
    case 'contact':
      return <ContactPage onNavigateHome={() => navigate('main')} />;
    case 'main':
    default:
      return <MainPage onNavigateToStaff={() => navigate('staff')} onNavigateToJobs={() => navigate('jobs')} onNavigateToPortfolio={() => navigate('portfolio')} onNavigateToContact={() => navigate('contact')} />;
  }
};

export default App;
