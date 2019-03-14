export const isAuthenticated = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  if (sessionStorage.getItem ('jwt')) {
    return JSON.parse (sessionStorage.getItem ('jwt'));
  } else {
    return false;
  }
};

export const authenticate = (jwt, cb) => {
  if (typeof window !== 'undefined') {
    console.log ('authenticate', jwt);
    sessionStorage.setItem ('jwt', JSON.stringify (jwt));
    cb ();
  }
};
