import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertTriangle } from 'lucide-react';
import Navbar from './components/Navbar';
import CategoryBar from './components/CategoryBar';
import Carousel from './components/Carousel';
import MovieCard from './components/MovieCard';
import MobileNavbar from './components/MobileNavbar';
import ErrorBoundary from './components/ErrorBoundary';
import type { Movie } from './types/movie';

// Array of popular movie keywords/genres/franchises
const movieKeywords = [
  'star wars',
  'disney',
  'pixar',
  'harry potter',
  'lord of the rings',
  'batman',
  'james bond',
  'jurassic',
  'matrix',
  'indiana jones',
  'mission impossible',
  'fast and furious',
  'transformer',
  'avenger'
];

const getRandomKeyword = () => {
  const randomIndex = Math.floor(Math.random() * movieKeywords.length);
  return movieKeywords[randomIndex];
};

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState(getRandomKeyword()); 
  const [category, setCategory] = useState('movie');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchTerm(query.trim() || getRandomKeyword());
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${searchTerm}&type=${category}`
        );
        
        if (response.data.Error) {
          throw new Error(response.data.Error);
        }
        
        if (response.data.Search) {
          setMovies(response.data.Search);
        } else {
          setMovies([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm, category]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 animate-pulse">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-lg aspect-[2/3]"></div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-4">
          <AlertTriangle className="w-8 h-8 text-red-500 mb-2" />
          <p className="text-gray-600 text-center">{error}</p>
          {error === 'Movie not found!' && (
            <p className="text-gray-600 text-center">Change movie name or category</p>
          )}
        </div>
      );
    }

    if (movies.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-4">
          <p className="text-gray-600 text-center">No movies found</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <ErrorBoundary>
        <Navbar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          onMobileSearchOpen={() => setIsSearchOpen(true)}
        />
        <CategoryBar setCategory={setCategory} activeCategory={category} />
        <Carousel />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16 md:mb-0">
          {renderContent()}
        </main>

        <MobileNavbar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
        />
      </ErrorBoundary>
    </div>
  );
}

export default App;