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

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('movie');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const random_movies = ['marvel', 'batman', 'superman', 'spiderman', 'avengers', 'justice league', 'aquaman', 'ends', 'mission', 'james bond', 'harry potter', 'lord of the rings', 'star wars', 'indiana jones', 'jurassic park', 'back to the future', 'terminator', 'die hard', 'matrix', 'mad max', 'rambo', 'rocky', 'predator', 'alien', 'godzilla', 'king kong', 'transformers', 'fast and furious', 'pirates of the caribbean', 'hunger games', 'twilight', 'divergent', 'maze runner', 'hobbit', 'narnia', 'percy jackson', 'sherlock holmes', 'john wick', 'bourne', 'taken', 'equalizer', 'mission impossible', 'jack reacher', 'sherlock', 'lucifer', 'breaking bad', 'game of thrones', 'stranger things', 'walking dead', 'peaky blinders', 'vikings', 'black mirror', 'westworld', 'friends', 'big bang theory', 'how i met your mother', 'brooklyn nine nine', 'office', 'parks and recreation', 'community', 'modern family', 'simpsons', 'family guy', 'south park', 'rick and morty', 'futurama', 'bojack horseman', 'archer', 'venture bros', 'big mouth', 'disenchantment', 'spongebob', 'avatar', 'adventure time', 'regular show', 'steven universe', 'gravity falls', 'phineas and ferb', 'kim possible', 'danny phantom', 'fairly oddparents', 'scooby doo', 'tom and jerry', 'looney'];
        const random_query = random_movies[Math.floor(Math.random() * random_movies.length)];

        const query = searchQuery.trim() || random_query;
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${query}&type=${category}`
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

    const debounceTimer = setTimeout(fetchMovies, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, category]);

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
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CategoryBar setCategory={setCategory} activeCategory={category} />
        <Carousel />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16 md:mb-0">
          {renderContent()}
        </main>

        <MobileNavbar />
      </ErrorBoundary>
    </div>
  );
}

export default App;