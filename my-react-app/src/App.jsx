import React, { useState } from 'react';
import MenuTable from './components/MenuTable';
import { menuData, categories } from './data';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('Main Dishes');
  
  const pages = ['Main Dishes', 'Fast Food', 'Drinks'];
  const filteredCategories = categories.filter(c => c.page === activePage);

  const handlePageChange = (page) => {
    setActivePage(page);
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

        <div className="vertical-menu">
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
        </div>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Sambusa. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
