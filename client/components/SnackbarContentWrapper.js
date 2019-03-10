import React from 'react';
import classNames from 'classnames';

import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import {withStyles} from '@material-ui/core/styles';

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

class SnackbarContentWrapper extends React.Component {
  render () {
    const {
      classes,
      className,
      message,
      onClose,
      variant,
      ...other
    } = this.props;
    const Icon = variantIcon[variant];

    return (
      <SnackbarContent
        className={classNames (classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span className={classes.message} id="client-snackbar">
            <Icon className={classNames (classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    );
  }
}

export default withStyles (styles) (SnackbarContentWrapper);
