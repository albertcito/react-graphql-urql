const setWindowTitle = (title?: string) => {
  const environmentPrefix = (process.env.REACT_APP_ENV && process.env.REACT_APP_ENV !== 'production')
    ? `${process.env.REACT_APP_ENV.charAt(0).toUpperCase()} - `
    : '';
  const suffix = 'Albertcito.com';
  if (title) {
    document.title = `${environmentPrefix} ${title} | ${suffix}`;
  } else {
    document.title = `${environmentPrefix} ${suffix}`;
  }
};

export default setWindowTitle;
