import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuTable from './components/MenuTable';
import { menuData, categories } from './data';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('Kottu');
  const [direction, setDirection] = useState(0);
  
  const pages = ['Kottu', 'Rice', 'Breakfast & Lunch', 'Noodles', 'Fast Food', 'Drinks'];
  const filteredCategories = categories.filter(c => c.page === activePage);

  const handlePageChange = (page) => {
    if (page === activePage) return;
    const currentIndex = pages.indexOf(activePage);
    const newIndex = pages.indexOf(page);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActivePage(page);
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
        <div className="hero-content">
          <h1>Sambusa</h1>
          <p className="subtitle">Premium Quality Food</p>
        </div>
      </header>

      <main className="main-content">
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

        <div className="vertical-menu" style={{ perspective: '1000px', overflowX: 'hidden' }}>
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
              style={{ width: '100%', transformOrigin: 'center' }}
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
        <p>&copy; {new Date().getFullYear()} Sambusa. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
