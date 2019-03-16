import express from 'express';
import {
  create,
  list,
  addSubject,
  read,
} from '../controllers/department.controller';

const router = express.Router ();

router.route ('/api/department').post (create).get (list);

router.route ('/api/department/addSubject').post (addSubject);

router.route ('/api/department/:departmentId').get (read);

export default router;
