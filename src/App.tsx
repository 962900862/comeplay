import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import FeaturedGames from './components/FeaturedGames';
import GamePage from './pages/games/[id]';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { SearchProvider } from './context/SearchContext';
import Layout from './components/Layout';

function HomePage() {
  return (
    <>
      <FeaturedGames />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <SearchProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/games/:id" element={<GamePage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
              </Routes>
            </Layout>
          </Router>
        </SearchProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;