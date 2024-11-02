import React from 'react';

interface CategoryBarProps {
  setCategory: (category: string) => void;
  activeCategory: string;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ setCategory, activeCategory }) => {
  const categories = [
    { id: 'movie', label: 'Movies' },
    { id: 'series', label: 'Stream' },
    { id: 'game', label: 'Events' },
    { id: 'sports', label: 'Sports' },
    { id: 'plays', label: 'Plays' },
    { id: 'activities', label: 'Activities' },
    { id: 'buzz', label: 'Buzz' },
  ];

  return (
    <div className="bg-gray-100 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 py-4 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                {
                    if(cat.id === 'movie' || cat.id === 'series' || cat.id === 'game' ) {
                        setCategory(cat.id)
                    }
                }
              }
              className={`whitespace-nowrap text-sm font-medium ${
                activeCategory === cat.id
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;