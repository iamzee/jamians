export default theme => ({
  container: {
    marginTop: theme.spacing.unit * 20,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit * 15,
    },
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginBottom: theme.spacing.unit * 5,
  },
  title: {
    fontWeight: 300,
    marginBottom: theme.spacing.unit * 2,
    color: theme.questionPaper.primary,
  },
  chooseFileButton: {
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: theme.questionPaper.tertiary,
    '&:hover': {
      backgroundColor: theme.questionPaper.secondary,
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
    fontFamily: 'Roboto',
  },
  fileInput: {
    display: 'none',
  },
  button: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: theme.questionPaper.primary,
    color: '#fff',

    '&:hover': {
      backgroundColor: theme.questionPaper.secondary,
    },
  },
  progress: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    color: theme.questionPaper.tertiary,
  },
  margin: {
    margin: theme.spacing.unit,
  },
});
