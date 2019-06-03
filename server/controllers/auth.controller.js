const requireSignin = (req, res, next) => {
  if (req.user) {
    next ();
  } else {
    res.status (401).json ({
      message: 'Authorization failed.',
    });
  }
};

export default {requireSignin};
