import { useEffect } from 'react';

import setWindowTitle from './setWindowTitle';

const useWindowTitle = (title = '') => {
  useEffect(() => {
    setWindowTitle(title);
    return () => {
      setWindowTitle();
    };
  }, [title]);
};

export default useWindowTitle;
