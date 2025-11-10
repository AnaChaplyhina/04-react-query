
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';


import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal'; 


import type { Movie } from '../../types/movie'; 
import { fetchMovies } from '../../services/movieService'; 


import styles from './App.module.css'; 

type Status = 'idle' | 'pending' | 'resolved' | 'rejected';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [query, setQuery] = useState<string>('');
  
  const handleSearch = async (newQuery: string) => {
    
    if (newQuery === query) return;

    setQuery(newQuery);
    setMovies([]); 
    setError(null);
    setStatus('pending');

    try {
      const { results } = await fetchMovies({ query: newQuery });

      if (results.length === 0) {
        toast.error('No movies found for your request.');
        setStatus('resolved');
        return;
      }
      
      setMovies(results);
      setStatus('resolved');
    } catch (err) {
      
      console.error(err);
      setError('Failed to load movies. Please check your connection or try again later.');
      setStatus('rejected');
    }
  };
  
  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  
  const handleCloseModal = () => {
    setSelectedMovie(null); 
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
    
      <main className={styles.main}> 
        
        {status === 'pending' && <Loader />}
        
        {status === 'rejected' && <ErrorMessage message={error || undefined} />}

        {movies.length > 0 && status === 'resolved' && (
          <MovieGrid movies={movies} onSelect={handleSelectMovie} />
        )}
        
        {selectedMovie && (
          <MovieModal 
            movie={selectedMovie} 
            onClose={handleCloseModal} 
          />
        )}
      </main>

      <Toaster position="top-center" reverseOrder={false} /> 
    </>
  );
};

export default App;