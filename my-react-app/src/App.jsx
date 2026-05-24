import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuTable from './components/MenuTable';
import { menuData, categories } from './data';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('Kottu');
  const [direction, setDirection] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const pages = ['Kottu', 'Rice', 'Breakfast & Lunch', 'Noodles', 'Fast Food', 'Drinks'];
  const filteredCategories = categories.filter(c => c.page === activePage);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page) => {
    if (page === activePage) return;
    const currentIndex = pages.indexOf(activePage);
    const newIndex = pages.indexOf(page);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageVariants = {
    initial: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      rotateY: direction > 0 ? 15 : -15,
      scale: 0.95
    }),
    in: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1
    },
    out: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      rotateY: direction < 0 ? 15 : -15,
      scale: 0.95
    })
  };

  return (
    <div className="app-container">
      <header className="hero-section">
        {/* Decorative background glow circles */}
        <div className="hero-glow-container">
          <div className="glow-circle glow-1"></div>
          <div className="glow-circle glow-2"></div>
        </div>

        {/* Ambient floating particles */}
        <div className="hero-particles">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`hero-particle particle-${i}`}
              animate={{
                y: [0, -30, 0],
                x: [0, i % 2 === 0 ? 20 : -20, 0],
                opacity: [0.15, 0.4, 0.15],
              }}
              transition={{
                duration: 5 + i * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div 
          className="hero-logo-wrapper"
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="glass-card-logo">
            <motion.img 
              src="/logo-hero-brown.png" 
              alt="Sambusa Logo" 
              className="hero-logo-img"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="logo-sheen"></div>
          </div>
          <motion.p 
            className="hero-tagline"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Premium Quality Food
          </motion.p>
        </motion.div>
      </header>

      <main className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="page-tabs-container">
          {pages.map(page => (
            <button
              key={page}
              className={`page-tab ${activePage === page ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <div className="vertical-menu" style={{ perspective: '1000px', overflowX: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activePage}
              custom={direction}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
              style={{ width: '100%', transformOrigin: 'center', flex: 1, display: 'flex', flexDirection: 'column', gap: '3rem', touchAction: 'pan-y' }}
              onPanEnd={(e, info) => {
                const swipeThreshold = 50;
                const currentIndex = pages.indexOf(activePage);
                
                if (info.offset.x < -swipeThreshold && currentIndex < pages.length - 1) {
                  setDirection(1);
                  setActivePage(pages[currentIndex + 1]);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (info.offset.x > swipeThreshold && currentIndex > 0) {
                  setDirection(-1);
                  setActivePage(pages[currentIndex - 1]);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              {filteredCategories.map(category => {
                const items = menuData.filter(item => item.category === category.id);
                if (items.length === 0) return null; // Don't render empty sections
                return (
                  <section key={category.id} className="menu-section">
                    <h2 className="section-title">{category.label}</h2>
                    <MenuTable items={items} />
                  </section>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Sambusa Hotel & Family Restaurant. All rights reserved.</p>
      </footer>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-top-btn"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
