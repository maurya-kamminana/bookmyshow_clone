import React from 'react';
import type { Movie } from '../types/movie';
import { Star } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const rating = (Math.random() * 2 + 7).toFixed(1);
  const votes = Math.floor(Math.random() * 50000);

  return (
    <div className="flex flex-col">
      {/* Card with hover effects */}
      <div className="relative rounded-lg overflow-hidden bg-gray-900 hover:scale-105 transition-transform duration-200">
        <div className="relative pb-[150%]">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'}
            alt={movie.Title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Rating badge */}
          <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-black/70 px-2 py-1 rounded">
            <Star className="w-4 h-4 text-red-500 fill-red-500" />
            <span className="text-white font-semibold">{rating}/10</span>
            <span className="text-gray-400 text-sm">{(votes/1000).toFixed(1)}K</span>
          </div>
        </div>
      </div>

      {/* Static content below card */}
      <div className="mt-3 px-1">
        <h3 className="font-semibold text-white text-base line-clamp-1" title={movie.Title}>
          {movie.Title}
        </h3>
        <div className="flex items-center text-sm text-gray-400 mt-1">
          <span>{movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}</span>
          <span className="mx-2">•</span>
          <span>{movie.Year}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;