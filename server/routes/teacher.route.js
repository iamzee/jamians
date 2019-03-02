const express = require ('express');
const teacherCtrl = require ('../controllers/teacher.controller');

const router = express.Router ();

router.route ('/api/teacher').post (teacherCtrl.create);

module.exports = router;
