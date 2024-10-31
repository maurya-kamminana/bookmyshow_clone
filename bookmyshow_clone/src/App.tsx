import React, { useState } from 'react';

import Navbar from './components/Navbar';
import CategoryBar from './components/CategoryBar';


function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('movie');
  
  return (
    <div className="min-h-screen bg-gray-900">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CategoryBar setCategory={setCategory} activeCategory={category} />
    </div>
  );
}

export default App;