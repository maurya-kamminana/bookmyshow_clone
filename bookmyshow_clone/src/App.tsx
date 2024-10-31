import React, { useState } from 'react';

import Navbar from './components/Navbar';


function App() {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="min-h-screen bg-gray-900">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </div>
  );
}

export default App;