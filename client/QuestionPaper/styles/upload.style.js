export default theme => ({
  container: {
    marginTop: theme.spacing (20),
    [theme.breakpoints.down ('xs')]: {
      marginTop: theme.spacing (15),
    },
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginBottom: theme.spacing (5),
  },
  title: {
    fontWeight: 300,
    marginBottom: theme.spacing (2),
  },
  chooseFileButton: {
    marginBottom: theme.spacing (2),
  },
  textField: {
    width: 300,
    margin: 'auto',
    marginBottom: theme.spacing (2),
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
    marginBottom: theme.spacing (2),
  },
  progress: {
    marginLeft: theme.spacing (2),
    marginRight: theme.spacing (2),
  },
  margin: {
    margin: theme.spacing (1),
  },
});
