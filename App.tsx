import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import StaffPage from './pages/StaffPage';
import JobsPage from './pages/JobsPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <MainPage />
        } />
        <Route path="/staff" element={
          <StaffPage />
        } />
        <Route path="/jobs" element={
          <JobsPage />
        } />
        <Route path="/portfolio" element={
          <PortfolioPage />
        } />
        <Route path="/contact" element={
          <ContactPage />
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


