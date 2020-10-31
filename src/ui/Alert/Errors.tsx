import { ApolloError } from '@apollo/client';
import React from 'react';

const Errors: React.FC<ApolloError> = ({ message }) => {
  return (
    <div className='errors-error'>
      {message}
    </div>
  );
};

export default Errors;
