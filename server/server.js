import '../config';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import socketIO from 'socket.io';
// import cookieSession from 'cookie-session';
// import passport from 'passport';

import courseRoutes from './routes/course.route';
import subjectRoutes from './routes/subject.route';
import departmentRoutes from './routes/department.route';
import noteRoutes from './routes/notes';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import uploadRoutes from './routes/upload.route';
import questionPaperRoutes from './routes/questionPaper.route';
import chatRoutes from './routes/chat.route';
import discussionRoutes from './routes/discussion.route';
import eventRoutes from './routes/event';

import template from '../template';

import socketio from './socketio/socketio';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_MLAB_URI);

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [process.env.COOKIE_SECRET],
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

app.use('/', courseRoutes);
app.use('/', subjectRoutes);
app.use('/', departmentRoutes);
app.use('/', noteRoutes);
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', uploadRoutes);
app.use('/', questionPaperRoutes);
app.use('/', chatRoutes);
app.use('/', discussionRoutes);
app.use('/', eventRoutes);

app.get('*', (req, res) => {
  res.send(template());
});

const PORT = process.env.PORT || 3000;

const expressServer = app.listen(PORT, () => {
  console.log(`Server is up at port ${PORT}`);
});

const io = socketIO(expressServer);
socketio(io);
