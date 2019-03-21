import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import teacherRoutes from './routes/teacher.route';
import subjectRoutes from './routes/subject.route';
import departmentRoutes from './routes/department.route';
import noteRoutes from './routes/note.route';
import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';
import uploadRoutes from './routes/upload.route';
import questionPaperRoutes from './routes/questionPaper.route';

import template from '../template';
import config from '../config/config';

mongoose.Promise = global.Promise;
mongoose.connect (config.MONGODB_URI);

const app = express ();

app.use (express.static ('public'));
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

const PORT = process.env.PORT || 3000;

app.listen (PORT, () => {
  console.log (`Server is up at port ${PORT}`);
});
