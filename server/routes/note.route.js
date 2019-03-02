const express = require ('express');
const noteCtrl = require ('../controllers/note.controller');

const router = express.Router ();

router.route ('/api/note').post (noteCtrl.create).get (noteCtrl.list);

module.exports = router;
