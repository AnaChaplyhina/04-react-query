
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';

import styles from './App.module.css';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies({ query, page }),
    enabled: !!query,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isError && error instanceof Error) {
      if (error.message !== "Search query cannot be empty.") {
         toast.error(error.message || 'Failed to fetch movies.');
      }
    }
  }, [isError, error]); 

  const handleSearch = (newQuery: string) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1); 
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };
  
  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  const handleSelectMovie = (movie: Movie) => setSelectedMovie(movie);
  const handleCloseModal = () => setSelectedMovie(null);

  const showErrorMessage = isError && error instanceof Error && error.message !== "Search query cannot be empty.";

  const noResults = !isLoading && !isError && query !== '' && data?.results.length === 0;
  if (noResults) {
    toast.error('No movies found for your request.');
  }

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
    
      <main className={styles.main}>
        {isLoading && <Loader />}
        
        {showErrorMessage && <ErrorMessage />}

        {/* !!! ВИПРАВЛЕНО: Пагінація тепер тут (над сіткою) !!! */}
        {totalPages > 1 && !isLoading && (
          <ReactPaginate
            pageCount={totalPages} 
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={handlePageChange} 
            forcePage={page - 1} 
            
            containerClassName={styles.pagination}
            activeClassName={styles.active}
            
            nextLabel="→"
            previousLabel="←"
            breakLabel="..."
          />
        )}

        {movies.length > 0 && (
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