

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom'; 
import type { Movie } from '../../types/movie'; 
import { createImageUrl } from '../../services/movieService';
import styles from './MovieModal.module.css';


interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}


const modalRoot = document.getElementById('modal-root') as HTMLElement;

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  
  
  useEffect(() => {
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

   
    document.body.style.overflow = 'hidden';

   
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto'; 
    };
  }, [onClose]);
  

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const rating = movie.vote_average.toFixed(1);
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  
  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <button 
          className={styles.closeButton} 
          onClick={onClose} 
          aria-label="Close modal"
        >
          &times;
        </button>
        <img
          src={createImageUrl(movie.backdrop_path, 'original')} 
          alt={movie.title}
          className={styles.image}
        />
        <div className={styles.content}>
          <h2 className={styles.title}>{movie.title} ({releaseYear})</h2>
          <p className={styles.overview}>{movie.overview || 'No overview available.'}</p>
          <p>
            <strong className={styles.label}>Release Date:</strong> {movie.release_date || 'N/A'}
          </p>
          <p>
            <strong className={styles.label}>Rating:</strong> {rating}/10
          </p>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default MovieModal;