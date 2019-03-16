import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';

import teacherRoutes from './routes/teacher.route';
import subjectRoutes from './routes/subject.route';
import departmentRoutes from './routes/department.route';
import noteRoutes from './routes/note.route';
import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';
import uploadRoutes from './routes/upload.route';
import questionPaperRoutes from './routes/questionPaper.route';

import template from '../template';

import dotenv from 'dotenv';
dotenv.load ({path: path.resolve (__dirname, '..', 'config', 'env')});

mongoose.Promise = global.Promise;
mongoose.connect ('mongodb://localhost:27017/jamians');

const app = express ();

app.use (express.static ('dist'));
app.use (bodyParser.json ());

app.use ('/', teacherRoutes);
app.use ('/', subjectRoutes);
app.use ('/', departmentRoutes);
app.use ('/', noteRoutes);
app.use ('/', userRoutes);
app.use ('/', authRoutes);
app.use ('/', uploadRoutes);
app.use ('/', questionPaperRoutes);

app.get ('*', (req, res) => {
  res.send (template ());
});

app.listen (3000, () => {
  console.log ('Server is up at port 3000');
});
