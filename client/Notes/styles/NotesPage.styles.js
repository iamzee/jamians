export default theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(15),
      padding: theme.spacing(2),
    },
  },
  title: {
    fontWeight: 300,
  },
  filters: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
  },
});
