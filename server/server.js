import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import teacherRoutes from './routes/teacher.route';
import subjectRoutes from './routes/subject.route';
import noteRoutes from './routes/note.route';
import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';

mongoose.Promise = global.Promise;
mongoose.connect ('mongodb://localhost:27017/jamians');

const app = express ();

app.use (express.static ('dist'));
app.use (bodyParser.json ());

app.use ('/', teacherRoutes);
app.use ('/', subjectRoutes);
app.use ('/', noteRoutes);
app.use ('/', userRoutes);
app.use ('/', authRoutes);

app.get ('/', (req, res) => {
  res.sendFile (path.resolve (__dirname, 'dist', 'index.html'));
});

app.listen (3000, () => {
  console.log ('Server is up at port 3000');
});
