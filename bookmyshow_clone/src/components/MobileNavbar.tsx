import React from 'react';
import { Home, Search, Play, Ticket, User, X } from 'lucide-react';

interface MobileNavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ 
  searchQuery, 
  setSearchQuery,
  onSearch,
  isSearchOpen, 
  setIsSearchOpen 
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Search</h2>
              <button onClick={() => setIsSearchOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for movies, events, plays, sports and activities"
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-red-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden">
        <div className="grid grid-cols-5 gap-1 p-2">
          <button className="flex flex-col items-center justify-center p-2">
            <Home className="h-6 w-6 text-gray-500" />
            <span className="text-xs mt-1 text-gray-500">Home</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center p-2"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-6 w-6 text-gray-500" />
            <span className="text-xs mt-1 text-gray-500">Search</span>
          </button>
          <button className="flex flex-col items-center justify-center p-2">
            <Play className="h-6 w-6 text-gray-500" />
            <span className="text-xs mt-1 text-gray-500">Movies</span>
          </button>
          <button className="flex flex-col items-center justify-center p-2">
            <Ticket className="h-6 w-6 text-gray-500" />
            <span className="text-xs mt-1 text-gray-500">Events</span>
          </button>
          <button className="flex flex-col items-center justify-center p-2">
            <User className="h-6 w-6 text-gray-500" />
            <span className="text-xs mt-1 text-gray-500">Profile</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;