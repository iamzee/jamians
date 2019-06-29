export const isAuthenticated = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  } else {
    return false;
  }
};

export const authenticate = jwt => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(jwt));
  }
};

export const logout = cb => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
  }
  cb();
};
