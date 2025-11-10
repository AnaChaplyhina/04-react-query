
import React, { useRef } from 'react';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
 
  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = (formData: FormData) => {
    const query = formData.get('query') as string;
    const normalizedQuery = query.trim();

    if (normalizedQuery === '') {
      toast.error('Please enter your search query.');
      return;
    }

   
    onSubmit(normalizedQuery);
    
    formRef.current?.reset();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        
      
        <form 
          className={styles.form} 
          action={handleAction} 
          ref={formRef}
        >
          <input
            className={styles.input}
            type="text"
            name="query" 
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
           
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;