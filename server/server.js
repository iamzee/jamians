const path = require ('path');
const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');

const teacherRoutes = require ('./routes/teacher.route');
const subjectRoutes = require ('./routes/subject.route');
const noteRoutes = require ('./routes/note.route');

mongoose.Promise = global.Promise;
mongoose.connect ('mongodb://localhost:27017/jamians');

const app = express ();
app.use (express.static ('dist'));
app.use (bodyParser.json ());

app.use ('/', teacherRoutes);
app.use ('/', subjectRoutes);
app.use ('/', noteRoutes);

app.get ('/', (req, res) => {
  res.sendFile (path.resolve (__dirname, 'dist', 'index.html'));
});

app.listen (3000, () => {
  console.log ('Server is up at port 3000');
});
