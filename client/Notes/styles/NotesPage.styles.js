export default theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing.unit * 20,
    [theme.breakpoints.down ('xs')]: {
      marginTop: theme.spacing.unit * 15,
      padding: theme.spacing.unit * 2,
    },
  },
  title: {
    fontWeight: 300,
  },
  filters: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  link: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing.unit * 2,
  },
});
