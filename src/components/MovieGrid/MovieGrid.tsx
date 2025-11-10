import React from 'react';
import type { Movie } from '../../types/movie'; 
import { createImageUrl } from '../../services/movieService';
import styles from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onSelect }) => {
  if (movies.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <ul className={styles.grid}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <div className={styles.card} onClick={() => onSelect(movie)}>
              <img
                className={styles.image}
                src={createImageUrl(movie.poster_path, 'w500')} 
                alt={movie.title}
                loading="lazy"
              />
              <h2 className={styles.title}>{movie.title}</h2>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieGrid;