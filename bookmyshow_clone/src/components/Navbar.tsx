import React from 'react';
import { Search, Menu, User } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (query: string) => void;
  onMobileSearchOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery, onSearch, onMobileSearchOpen }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <img src="https://cdn.brandfetch.io/id4J58sqa_/theme/dark/logo.svg?k=bfHSJFAPEG" alt="BookMyShow Logo" className="h-10"/>
              </a>
            </div>
            <div className="hidden md:block ml-10">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for movies, events, plays, sports and activities"
                  className="w-[500px] pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-red-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <select className="bg-transparent">
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Bangalore</option>
            </select>
            <button className="bg-red-500 text-white px-4 py-1 rounded">Sign In</button>
            <Menu className="h-6 w-6" />
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={onMobileSearchOpen} className="mr-4">
              <Search className="h-6 w-6 text-gray-500" />
            </button>
            <User className="h-6 w-6" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;