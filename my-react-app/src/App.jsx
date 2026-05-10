import React, { useState } from 'react';
import CategoryTabs from './components/CategoryTabs';
import MenuTable from './components/MenuTable';
import { menuData, categories } from './data';
import './App.css';

function App() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const filteredItems = menuData.filter(item => item.category === activeCategory);

  return (
    <div className="app-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Sambusa</h1>
          <p className="subtitle">Premium Quality Food</p>
        </div>
      </header>

      <main className="main-content">
        <CategoryTabs 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
        
        <MenuTable items={filteredItems} />
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Sambusa. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
