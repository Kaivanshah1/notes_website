const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

router.get('/manage-notes', isAuth, adminController.getManageNotes)

router.post('/approve', isAuth, adminController.approveNote)

module.exports = router;