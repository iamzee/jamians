const express = require ('express');
const subjectCtrl = require ('../controllers/subject.controller');

const router = express.Router ();

router.route ('/api/subject').post (subjectCtrl.create);

module.exports = router;
