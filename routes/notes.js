const express = require('express');

const router = express.Router();

const notesController = require('../controllers/notes');
const isAuth = require('../middleware/is-auth');

router.get('/', isAuth, notesController.getIndex)

router.get('/add-note', isAuth, notesController.getAddNote)

router.post('/add-note', isAuth, notesController.postNotes);

router.get('/add-note/:noteId', isAuth, notesController.getEditNoteDetails);

router.get('/note/:noteId', isAuth, notesController.getNoteDetails);

router.post('/edit-note',isAuth, notesController.saveEditNote);

router.post('/delete-note', isAuth, notesController.deleteNote);

module.exports = router;