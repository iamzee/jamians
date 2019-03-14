import React from 'react';

import {withStyles} from '@material-ui/core/styles';

// import HomePageNav from '../components/HomePageNav';

const styles = theme => ({
  nav: {
    marginTop: theme.spacing.unit * 5,
  },
});

const HomePage = props => {
  const {classes} = props;
  return (
    <div>
      {/* <NavBar title={'Jamians'} /> */}
      <div className={classes.nav}>
        {/* <HomePageNav
          title={'Notes Mania'}
          quote={
            'If you are afraid to fail then you are probably going to fail'
          }
          author={'Kobe Bryant'}
        /> */}
      </div>
    </div>
  );
};

export default withStyles (styles) (HomePage);
