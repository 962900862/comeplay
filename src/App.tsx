import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedGames from './components/FeaturedGames';
import Footer from './components/Footer';
import GamePage from './pages/games/[id]';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

function HomePage() {
  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-[#0F0F15] bg-white">
      <Navbar />
      <main>
        <Hero />
        <FeaturedGames />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/games/:id" element={<GamePage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;