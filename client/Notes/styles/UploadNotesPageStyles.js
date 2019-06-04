export default theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginBottom: theme.spacing.unit * 5,
    marginTop: theme.spacing.unit * 20,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit * 15,
      padding: theme.spacing.unit * 2,
    },
  },
  title: {
    fontWeight: 300,
    marginBottom: theme.spacing.unit * 2,
  },
  chooseFileButton: {
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: theme.notes.tertiary,
    '&:hover': {
      backgroundColor: theme.notes.secondary,
      color: theme.notes.quaternary,
    },
  },
  textField: {
    width: 300,
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2,
  },
  select: {
    width: 300,
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2,
    fontFamily: 'Roboto',
  },
  fileInput: {
    display: 'none',
  },
  button: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2,
  },
  progress: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  margin: {
    margin: theme.spacing.unit,
  },
});
