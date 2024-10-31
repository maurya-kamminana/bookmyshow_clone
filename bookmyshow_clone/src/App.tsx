import React, { useState } from 'react';

import Navbar from './components/Navbar';
import CategoryBar from './components/CategoryBar';
import Carousel from './components/Carousel';


function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('movie');
  
  return (
    <div className="min-h-screen bg-gray-900">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CategoryBar setCategory={setCategory} activeCategory={category} />
        <Carousel />
    </div>
  );
}

export default App;