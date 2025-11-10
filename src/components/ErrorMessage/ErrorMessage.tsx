
import React from 'react';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        {message || 'There was an error, please try again...'}
      </p>
    </div>
  );
};

export default ErrorMessage;