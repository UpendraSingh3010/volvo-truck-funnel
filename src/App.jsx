import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import AssessmentPage from './pages/AssessmentPage';

// Automatically scroll window to top upon route transition
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/' || pathname === '';

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      {/* Footer rendered globally on inner pages, while HomePage concludes with the integrated single-screen footer in ClosingCTA */}
      {!isHomePage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <AppContent />
    </HashRouter>
  );
}
