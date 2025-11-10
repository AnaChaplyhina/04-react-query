
import React from 'react';
import styles from './Loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>Loading movies, please wait...</p>
    </div>
  );
};

export default Loader;