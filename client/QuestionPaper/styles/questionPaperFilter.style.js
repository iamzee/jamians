export default theme => ({
  dialog: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
  },
  textField: {
    width: 300,
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2,
  },
  filterButton: {
    backgroundColor: theme.questionPaper.tertiary,

    '&:hover': {
      backgroundColor: theme.questionPaper.primary,
      color: '#fff',
    },
  },
});
