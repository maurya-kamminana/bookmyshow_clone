import React from 'react';
import { Home, Search, Play, Ticket, User } from 'lucide-react';

const MobileNavbar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden">
      <div className="grid grid-cols-5 gap-1 p-2">
        {[
          { icon: Home, label: 'Home' },
          { icon: Search, label: 'Search' },
          { icon: Play, label: 'Movies' },
          { icon: Ticket, label: 'Events' },
          { icon: User, label: 'Profile' }
        ].map((item, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center p-2"
          >
            <item.icon className="h-6 w-6 text-gray-500" />
            <span className="text-xs mt-1 text-gray-500">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavbar;